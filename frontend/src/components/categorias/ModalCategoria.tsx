import React, { useEffect, useState } from "react";
import type { Categoria } from "../../pages/CategoriasPages";
import "../../styles/ModalCategoria.css";

interface Props {
  show: boolean;
  onClose: () => void;
  onSaved: (cat: Omit<Categoria, "id">, editId: number | null) => void;
  editData: Categoria | null;
}

const capitalizar = (texto: string) => {
  if (!texto) return "";
  return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
};

const ModalCategoria: React.FC<Props> = ({ show, onClose, onSaved, editData }) => {
  const [nombre, setNombre] = useState<string>("");
  const [descripcion, setDescripcion] = useState<string>("");

  useEffect(() => {
    if (editData) {
      setNombre(editData.nombre);
      setDescripcion(editData.descripcion ?? "");
    } else {
      setNombre("");
      setDescripcion("");
    }
  }, [editData]);

  useEffect(() => {
    if (!show) {
      setNombre("");
      setDescripcion("");
    }
  }, [show]);

  const handleSubmit = async () => {
    const payload = {
      nombre: capitalizar(nombre),
      descripcion: capitalizar(descripcion),
    };

    

    onSaved(payload, editData ? editData.id : null);
    onClose();
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">

        {/* HEADER */}
        <div className="modal-header">
          <h2>{editData ? "Editar Categoría" : "Nueva Categoría"}</h2>

          <button className="modal-close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        {/* BODY */}
        <div className="modal-body">
          <label>Nombre</label>
          <input
            className="modal-input"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <label>Descripción</label>
          <textarea
            className="modal-input"
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          ></textarea>
        </div>

        {/* FOOTER */}
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cancelar
          </button>

          <button className="btn-primary" onClick={handleSubmit}>
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalCategoria;
