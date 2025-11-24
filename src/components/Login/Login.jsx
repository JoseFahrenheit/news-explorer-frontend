import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import './Login.css';

const Login = ({ isOpen, onClose, onSwitchToRegister, onLogin, authError }) => {
  const [formData, setFormData] = React.useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        if (!value) return 'El correo electrónico es obligatorio';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Formato de correo electrónico inválido';
        return '';
      case 'password':
        if (!value) return 'La contraseña es obligatoria';
        return '';
      default:
        return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    const success = await onLogin(formData);
    if (success) {
      setFormData({ email: '', password: '' });
      setErrors({});
    }
    setIsSubmitting(false);
  };

  const isFormValid = formData.email && formData.password &&
                     !errors.email && !errors.password;

  React.useEffect(() => {
    if (isOpen) {
      setFormData({ email: '', password: '' });
      setErrors({});
    }
  }, [isOpen]);

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
          className={`login__input ${errors.email ? 'login__input_error' : ''}`}
          placeholder="Introduce tu correo electrónico"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        {errors.email && <span className="login__error">{errors.email}</span>}
      </div>

      <div className="login__field">
        <label className="login__label">Contraseña</label>
        <input
          type="password"
          name="password"
          className={`login__input ${errors.password ? 'login__input_error' : ''}`}
          placeholder="Introduce tu contraseña"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        {errors.password && <span className="login__error">{errors.password}</span>}
      </div>

      {authError && <div className="login__auth-error">{authError}</div>}

      <button
        type="submit"
        className={`login__button ${!isFormValid || isSubmitting ? 'login__button_disabled' : ''}`}
        disabled={!isFormValid || isSubmitting}
      >
        <span className="login__button-text">
          {isSubmitting ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </span>
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