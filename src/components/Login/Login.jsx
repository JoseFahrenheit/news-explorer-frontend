import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import './Login.css';

const Login = ({ isOpen, onClose, onSwitchToRegister }) => {
  const [formData, setFormData] = React.useState({
    email: '',
    password: ''
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
    console.log('Login data:', formData);
  };

  const isFormValid = formData.email && formData.password;

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Iniciar Sesión"
      onSubmit={handleSubmit}
    >
      <div className="login__field">
        <label className="login__label">Correo electrónico</label>
        <input
          type="email"
          name="email"
          className="login__input"
          placeholder="Introduce tu correo electrónico"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="login__field">
        <label className="login__label">Contraseña</label>
        <input
          type="password"
          name="password"
          className="login__input"
          placeholder="Introduce tu contraseña"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
      </div>

      <button
        type="submit"
        className={`login__button ${!isFormValid ? 'login__button_disabled' : ''}`}
        disabled={!isFormValid}
      >
        <span className="login__button-text">Iniciar sesión</span>
      </button>

      <div className="login__switch">
        <span>O </span>
        <button
          type="button"
          className="login__switch-link"
          onClick={onSwitchToRegister}
        >
          inscribirse
        </button>
      </div>
    </PopupWithForm>
  );
};

export default Login;