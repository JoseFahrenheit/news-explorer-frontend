import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import './Register.css';

const Register = ({ isOpen, onClose, onSwitchToLogin, onRegister, onSuccess, authError }) => {
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    username: ''
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
        if (value.length < 6) return 'La contraseña debe tener al menos 6 caracteres';
        return '';
      case 'username':
        if (!value) return 'El nombre de usuario es obligatorio';
        if (value.length < 2) return 'El nombre debe tener al menos 2 caracteres';
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
    const success = await onRegister(formData);
    if (success) {
      onSuccess();
      setFormData({ email: '', password: '', username: '' });
      setErrors({});
    }
    setIsSubmitting(false);
  };

  const isFormValid = formData.email && formData.password && formData.username &&
                     !errors.email && !errors.password && !errors.username;

  React.useEffect(() => {
    if (isOpen) {
      setFormData({ email: '', password: '', username: '' });
      setErrors({});
    }
  }, [isOpen]);

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
          className={`register__input ${errors.email ? 'register__input_error' : ''}`}
          placeholder="Introduce tu correo electrónico"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        {errors.email && <span className="register__error">{errors.email}</span>}
      </div>

      <div className="register__field">
        <label className="register__label">Contraseña</label>
        <input
          type="password"
          name="password"
          className={`register__input ${errors.password ? 'register__input_error' : ''}`}
          placeholder="Introduce tu contraseña"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        {errors.password && <span className="register__error">{errors.password}</span>}
      </div>

      <div className="register__field">
        <label className="register__label">Nombre de usuario</label>
        <input
          type="text"
          name="username"
          className={`register__input ${errors.username ? 'register__input_error' : ''}`}
          placeholder="Introduce tu nombre de usuario"
          value={formData.username}
          onChange={handleInputChange}
          required
        />
        {errors.username && <span className="register__error">{errors.username}</span>}
      </div>

      {authError && <div className="register__auth-error">{authError}</div>}

      <button
        type="submit"
        className={`register__button ${!isFormValid || isSubmitting ? 'register__button_disabled' : ''}`}
        disabled={!isFormValid || isSubmitting}
      >
        <span className="register__button-text">
          {isSubmitting ? 'Registrando...' : 'Inscribirse'}
        </span>
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