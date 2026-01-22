// backend/src/seed/seed.js

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const { sequelize, Categoria, Proveedor, Producto, MovimientoStock } = require("../models");

function money(n) {
  return Number(n).toFixed(2); // DECIMAL como string
}

function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

// RNG determinista (seed reproducible)
function mulberry32(seed) {
  let t = seed >>> 0;
  return function () {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

async function upsertCategoria(data) {
  const [row] = await Categoria.findOrCreate({
    where: { nombre: data.nombre },
    defaults: data,
  });

  // Si existe y cambió descripción, actualizamos (idempotente)
  await row.update({
    descripcion: data.descripcion ?? row.descripcion,
  });

  return row;
}

async function upsertProveedor(data) {
  const [row] = await Proveedor.findOrCreate({
    where: { cuit: data.cuit },
    defaults: data,
  });

  // Mantenerlo estable / actualizable si cambian campos
  await row.update({
    nombre: data.nombre,
    telefono: data.telefono,
    email: data.email ?? null,
    direccion: data.direccion ?? null,
  });

  return row;
}

async function upsertProducto(data) {
  // upsert usa la constraint unique (codigo) para decidir insert/update
  await Producto.upsert(data);
  return Producto.findOne({ where: { codigo: data.codigo } });
}

async function resetAllHard() {
  // Modo agresivo: reconstruye todo
  await sequelize.sync({ force: true });
}

async function ensureSchemaSafe() {
  // Asegura tablas sin borrar
  await sequelize.sync();
}

async function deleteAllMovimientos() {
  // Seed idempotente: siempre reconstruimos movimientos
  await MovimientoStock.destroy({ where: {} });
}

async function recalcStockFromMovements(productos) {
  // Stock = sum(ENTRADA) - sum(SALIDA)
  const movs = await MovimientoStock.findAll({
    attributes: ["productoId", "tipo", "cantidad"],
  });

  const stockByProductId = new Map();
  for (const m of movs) {
    const pid = m.productoId;
    const qty = Number(m.cantidad);
    const sign = m.tipo === "ENTRADA" ? 1 : -1;
    stockByProductId.set(pid, (stockByProductId.get(pid) || 0) + sign * qty);
  }

  // Si algún stock queda negativo por error/aleatoriedad, corregimos con una entrada mínima
  const corrections = [];
  for (const p of productos) {
    const calculated = stockByProductId.get(p.id) ?? 0;
    if (calculated < 0) {
      const corr = Math.abs(calculated) + 1;
      corrections.push({
        productoId: p.id,
        tipo: "ENTRADA",
        cantidad: money(corr),
        fecha: new Date(),
        descripcion: "Corrección automática seed (evitar stock negativo)",
        usuario: "seed",
      });
      stockByProductId.set(p.id, 1);
    }
  }

  if (corrections.length) {
    await MovimientoStock.bulkCreate(corrections);
  }

  // Actualizar Producto.stock (INTEGER) -> usamos floor
  await Promise.all(
    productos.map((p) => {
      const calculated = stockByProductId.get(p.id) ?? 0;
      const stockInt = Math.max(0, Math.floor(calculated));
      return Producto.update({ stock: stockInt }, { where: { id: p.id } });
    })
  );
}

async function seed() {
  const mode = (process.env.SEED_MODE || "demo").toLowerCase(); // demo | reset
  const rng = mulberry32(12345);

  try {
    await sequelize.authenticate();
    console.log("✅ DB conectada");
    console.log(`ℹ️ SEED_MODE=${mode}`);

    if (mode === "reset") {
      console.log("⚠️ reset: recreando schema completo");
      await resetAllHard();
    } else {
      console.log("✅ demo: asegurando schema (sin borrar tablas)");
      await ensureSchemaSafe();
    }

    // =========================
    // 1) Upsert: Categorías
    // =========================
    const catIlum = await upsertCategoria({
      nombre: "Iluminación",
      descripcion: "Lámparas, velas, luces decorativas",
    });

    const catDeco = await upsertCategoria({
      nombre: "Decoración",
      descripcion: "Objetos decorativos para el hogar",
    });

    const catBazar = await upsertCategoria({
      nombre: "Bazar",
      descripcion: "Artículos de cocina y mesa",
    });

    // =========================
    // 2) Upsert: Proveedores (por CUIT)
    // =========================
    const provNorte = await upsertProveedor({
      nombre: "Proveedor Norte",
      cuit: "30-12345678-9",
      telefono: "1111-1111",
      email: "norte@demo.com",
      direccion: "Av. Norte 123",
    });

    const provSur = await upsertProveedor({
      nombre: "Proveedor Sur",
      cuit: "30-87654321-0",
      telefono: "2222-2222",
      email: "sur@demo.com",
      direccion: "Calle Sur 456",
    });

    // =========================
    // 3) Upsert: Productos (por CÓDIGO)
    // Nota: dejamos stock en 0 y lo recalculamos luego
    // =========================
    const productos = [];
    productos.push(
      await upsertProducto({
        codigo: "ILU-001",
        nombre: "Lámpara de mesa",
        descripcion: "Lámpara LED cálida para dormitorio",
        precio: money(12000),
        stock: 0,
        stockMinimo: 5,
        estado: "Activo",
        categoriaId: catIlum.id,
        proveedorId: provNorte.id,
      })
    );

    productos.push(
      await upsertProducto({
        codigo: "DEC-010",
        nombre: "Vela aromática",
        descripcion: "Vela perfumada (vainilla)",
        precio: money(4500),
        stock: 0,
        stockMinimo: 10,
        estado: "Activo",
        categoriaId: catDeco.id,
        proveedorId: provSur.id,
      })
    );

    productos.push(
      await upsertProducto({
        codigo: "BAZ-100",
        nombre: "Set de tazas",
        descripcion: "Set x6 tazas cerámica",
        precio: money(9800),
        stock: 0,
        stockMinimo: 6,
        estado: "Activo",
        categoriaId: catBazar.id,
        proveedorId: provNorte.id,
      })
    );

    // Queremos que este quede bajo stock para que el dashboard lo muestre
    productos.push(
      await upsertProducto({
        codigo: "ILU-002",
        nombre: "Guirnalda LED",
        descripcion: "Guirnalda 5m, luz cálida",
        precio: money(6500),
        stock: 0,
        stockMinimo: 5,
        estado: "Activo",
        categoriaId: catIlum.id,
        proveedorId: provSur.id,
      })
    );

    productos.push(
      await upsertProducto({
        codigo: "DEC-020",
        nombre: "Cuadro decorativo",
        descripcion: "Cuadro 40x60, estilo minimalista",
        precio: money(15000),
        stock: 0,
        stockMinimo: 4,
        estado: "Activo",
        categoriaId: catDeco.id,
        proveedorId: provNorte.id,
      })
    );

    const byCode = new Map(productos.map((p) => [p.codigo, p]));

    // =========================
    // 4) Movimientos: idempotencia
    // Borro todos y recreo siempre
    // =========================
    await deleteAllMovimientos();

    const movimientos = [];

    function pushMov({ codigo, tipo, cantidad, descripcion, usuario, days_back }) {
      const prod = byCode.get(codigo);
      if (!prod) throw new Error(`Producto no encontrado para código: ${codigo}`);

      movimientos.push({
        productoId: prod.id,
        tipo,
        cantidad: money(cantidad),
        fecha: daysAgo(days_back),
        descripcion,
        usuario,
      });
    }

    // Entradas iniciales (hace 28-31 días)
    const initialEntries = [
      { codigo: "ILU-001", qty: 25 },
      { codigo: "DEC-010", qty: 60 },
      { codigo: "BAZ-100", qty: 20 },
      { codigo: "ILU-002", qty: 10 },
      { codigo: "DEC-020", qty: 20 },
    ];

    for (const e of initialEntries) {
      pushMov({
        codigo: e.codigo,
        tipo: "ENTRADA",
        cantidad: e.qty,
        descripcion: "Compra inicial demo",
        usuario: "admin",
        days_back: 28 + Math.floor(rng() * 4),
      });
    }

    // Movimientos operativos: ~35 para que stats se vea real
    const codigos = ["ILU-001", "DEC-010", "BAZ-100", "ILU-002", "DEC-020"];
    const opsCount = 35;

    for (let i = 0; i < opsCount; i++) {
      const codigo = codigos[Math.floor(rng() * codigos.length)];
      const isSale = rng() < 0.7; // 70% ventas
      const days_back = 1 + Math.floor(rng() * 25);

      if (isSale) {
        pushMov({
          codigo,
          tipo: "SALIDA",
          cantidad: 1 + Math.floor(rng() * 5),
          descripcion: "Venta demo",
          usuario: "admin",
          days_back,
        });
      } else {
        pushMov({
          codigo,
          tipo: "ENTRADA",
          cantidad: 5 + Math.floor(rng() * 16), // 5-20
          descripcion: "Reposición demo",
          usuario: "admin",
          days_back,
        });
      }
    }

    // Ajuste dirigido: forzar ILU-002 a quedar bajo stock
    // Hacemos algunas salidas extra recientes
    for (let i = 0; i < 6; i++) {
      pushMov({
        codigo: "ILU-002",
        tipo: "SALIDA",
        cantidad: 1,
        descripcion: "Venta demo (bajo stock)",
        usuario: "admin",
        days_back: 1 + i,
      });
    }

    await MovimientoStock.bulkCreate(movimientos);

    // =========================
    // 5) Recalcular stock según movimientos
    // =========================
    await recalcStockFromMovements(productos);

    console.log("✅ Seed idempotente completado");
    console.log(`ℹ️ Movimientos recreados: ${movimientos.length}`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Error en seed:", err);
    process.exit(1);
  }
}

seed();