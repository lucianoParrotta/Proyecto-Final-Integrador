import { useState, useEffect } from "react";
import "../styles/ExportModal.styles.css";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (formats: { pdf: boolean; xls: boolean }) => void;
}

export default function ExportModal({ isOpen, onClose, onExport }: ExportModalProps) {
  const [selectedPDF, setSelectedPDF] = useState(false);
  const [selectedXLS, setSelectedXLS] = useState(false);

  //  Resetear los checkboxes cada vez que el modal se abre
  useEffect(() => {
    if (isOpen) {
      setSelectedPDF(false);
      setSelectedXLS(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    onExport({ pdf: selectedPDF, xls: selectedXLS });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Exportar Categorías</h2>

        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={selectedPDF}
              onChange={() => setSelectedPDF(!selectedPDF)}
            />
            PDF
          </label>

          <label>
            <input
              type="checkbox"
              checked={selectedXLS}
              onChange={() => setSelectedXLS(!selectedXLS)}
            />
            XLS
          </label>
        </div>

        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>
            Cancelar
          </button>

          <button
            className="btn-primary"
            disabled={!selectedPDF && !selectedXLS}
            onClick={handleSubmit}
          >
            Exportar
          </button>
        </div>
      </div>
    </div>
  );
}
