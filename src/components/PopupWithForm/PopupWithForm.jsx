import React from 'react';
import './PopupWithForm.css';

const PopupWithForm = ({ isOpen, onClose, title, children, onSubmit }) => {
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
      className={`popup ${isOpen ? 'popup_opened' : ''}`}
      onClick={handleOverlayClick}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          ✕
        </button>

        <h2 className="popup__title">{title}</h2>

        <form className="popup__form" onSubmit={onSubmit}>
          {children}
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;