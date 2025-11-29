export default function ProveedorForm() {
  return (
    <div className="p-4 border rounded-lg shadow bg-white">
      <h2 className="font-semibold text-xl mb-3">Nuevo Proveedor (Prototipo)</h2>

      <form className="grid grid-cols-1 gap-3">
        <input className="input" placeholder="Nombre" />
        <input className="input" placeholder="CUIT" />
        <input className="input" placeholder="Email" />
        <input className="input" placeholder="Teléfono" />
        <input className="input" placeholder="Dirección" />

        <button className="bg-blue-500 "> 
          Guardar (prototipo)
        </button>
      </form>
    </div>
  );
}
