import React from 'react';
import './SuccessPopup.css';

const SuccessPopup = ({ isOpen, onClose, onSwitchToLogin }) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, onClose]);

  return (
    <div
      className={`success-popup ${isOpen ? 'success-popup_opened' : ''}`}
      onClick={handleOverlayClick}
    >
      <div className="success-popup__container">
        <button
          type="button"
          className="success-popup__close-button"
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          ✕
        </button>

        <h2 className="success-popup__title">
          ¡El registro se ha completado con éxito!
        </h2>

        <button
          type="button"
          className="success-popup__login-link"
          onClick={onSwitchToLogin}
        >
          Iniciar sesión
        </button>
      </div>
    </div>
  );
};

export default SuccessPopup;