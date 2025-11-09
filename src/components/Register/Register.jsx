import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import './Register.css';

const Register = ({ isOpen, onClose, onSwitchToLogin, onSuccess }) => {
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    username: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Register data:', formData);

    onSuccess();
  };

  const isFormValid = formData.email && formData.password && formData.username;

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Inscribirse"
      onSubmit={handleSubmit}
    >
      <div className="register__field">
        <label className="register__label">Correo electrónico</label>
        <input
          type="email"
          name="email"
          className="register__input"
          placeholder="Introduce tu correo electrónico"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="register__field">
        <label className="register__label">Contraseña</label>
        <input
          type="password"
          name="password"
          className="register__input"
          placeholder="Introduce tu contraseña"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="register__field">
        <label className="register__label">Nombre de usuario</label>
        <input
          type="text"
          name="username"
          className="register__input"
          placeholder="Introduce tu nombre de usuario"
          value={formData.username}
          onChange={handleInputChange}
          required
        />
      </div>

      <button
        type="submit"
        className={`register__button ${!isFormValid ? 'register__button_disabled' : ''}`}
        disabled={!isFormValid}
      >
        <span className="register__button-text">Inscribirse</span>
      </button>

      <div className="register__switch">
        <span>O </span>
        <button
          type="button"
          className="register__switch-link"
          onClick={onSwitchToLogin}
        >
          Iniciar sesión
        </button>
      </div>
    </PopupWithForm>
  );
};

export default Register;