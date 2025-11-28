const { useState, useEffect } = React;


const firebaseConfig = {
  apiKey: "AIzaSyDdzadn645vHWipDBrP64-oeAqU-T7CfUg",
  authDomain: "formulario-de-registro-60449.firebaseapp.com",
  projectId: "formulario-de-registro-60449",
  storageBucket: "formulario-de-registro-60449.firebasestorage.app",
  messagingSenderId: "611251484860",
  appId: "1:611251484860:web:7551d611d586fb0381b8b9",
  measurementId: "G-ZK8E11EL1V"
};


try {
  firebase.initializeApp(firebaseConfig);
  console.log("Firebase inicializado correctamente");
} catch (error) {
  console.error("Error inicializando Firebase:", error);
}

const auth = firebase.auth();
const db = firebase.firestore();


const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    numeroCasa: "",
    password: "",
    confirmPassword: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validatePassword = (password) => {
    const errors = {};

    if (password.length < 8) {
      errors.length = "La contraseña debe tener al menos 8 caracteres";
    }

    if (!/[A-Z]/.test(password)) {
      errors.uppercase = "Debe contener al menos una letra mayúscula";
    }

    if (!/[0-9]/.test(password)) {
      errors.number = "Debe contener al menos un número";
    }

    if (!/[@$!%*?&]/.test(password)) {
      errors.special = "Debe contener al menos un carácter especial (@$!%*?&)";
    }

    return errors;
  };

  const validateConfirmPassword = (confirmPassword) => {
    const errors = {};

    if (confirmPassword !== formData.password) {
      errors.match = "Las contraseñas no coinciden";
    }

    return errors;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre) newErrors.nombre = "El nombre es requerido";
    if (!formData.correo) {
      newErrors.correo = "El correo es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.correo)) {
      newErrors.correo = "El formato del correo no es válido";
    }
    if (!formData.numeroCasa)
      newErrors.numeroCasa = "El número de casa es requerido";

    const passwordErrors = validatePassword(formData.password);
    if (Object.keys(passwordErrors).length > 0) {
      newErrors.password = passwordErrors;
    }

    const confirmErrors = validateConfirmPassword(formData.confirmPassword);
    if (Object.keys(confirmErrors).length > 0) {
      newErrors.confirmPassword = confirmErrors;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const mainLogoUrl = "./Los Robles residencial.jpg";
    const appLogoUrl = "./Robles connect.jpg";

    const mainLogo = new Image();
    mainLogo.src = mainLogoUrl;
    mainLogo.onload = () => {
      document.getElementById("main-logo").src = mainLogoUrl;
    };
    mainLogo.onerror = () => {
      console.log("No se pudo cargar el logo principal");
    };

    const appLogo = new Image();
    appLogo.src = appLogoUrl;
    appLogo.onload = () => {
      document.getElementById("app-logo").src = appLogoUrl;
    };
    appLogo.onerror = () => {
      console.log("No se pudo cargar el logo de la app");
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const simulateEmailVerification = (email) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Email de verificación enviado a: ${email}`);
        resolve(true);
      }, 2000);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await simulateEmailVerification(formData.correo);

      const userData = {
        nombre: formData.nombre,
        correo: formData.correo,
        numeroCasa: formData.numeroCasa,
        password: formData.password,
        verified: false,
      };

      localStorage.setItem(`user_${formData.correo}`, JSON.stringify(userData));

      setShowSuccess(true);

      setTimeout(() => {
        window.location.href = "login.html?message=verify_email";
      }, 3000);
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      setErrors({ submit: "Error al registrar. Intenta nuevamente." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const passwordRequirements = [
    {
      key: "length",
      text: "Al menos 8 caracteres",
      met: formData.password.length >= 8,
    },
    {
      key: "uppercase",
      text: "Al menos 1 mayúscula",
      met: /[A-Z]/.test(formData.password),
    },
    {
      key: "number",
      text: "Al menos 1 número",
      met: /[0-9]/.test(formData.password),
    },
    {
      key: "special",
      text: "Al menos 1 carácter especial (@$!%*?&)",
      met: /[@$!%*?&]/.test(formData.password),
    },
  ];

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre completo:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            placeholder="Ingrese su nombre completo"
          />
          {errors.nombre && (
            <div className="error-message">{errors.nombre}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="correo">Correo electrónico:</label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            required
            placeholder="tucorreo@ejemplo.com"
          />
          {errors.correo && (
            <div className="error-message">{errors.correo}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="numeroCasa">Número de casa:</label>
          <input
            type="text"
            id="numeroCasa"
            name="numeroCasa"
            value={formData.numeroCasa}
            onChange={handleChange}
            required
            placeholder="Ejemplo: 01, 20, 101, etc."
          />
          {errors.numeroCasa && (
            <div className="error-message">{errors.numeroCasa}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Ingresa tu contraseña"
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "👁️" : "👁️‍🗨️"}
          </button>

          <div className="password-requirements">
            {passwordRequirements.map((req) => (
              <div
                key={req.key}
                className={`requirement ${req.met ? "met" : "unmet"}`}
              >
                <span className="requirement-icon">{req.met ? "✓" : "✗"}</span>
                {req.text}
              </div>
            ))}
          </div>

          {errors.password && (
            <div className="error-message">
              {Object.values(errors.password).map((error, index) => (
                <div key={index}>{error}</div>
              ))}
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar contraseña:</label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            placeholder="Confirma tu contraseña"
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
          </button>

          {errors.confirmPassword && (
            <div className="error-message">
              {Object.values(errors.confirmPassword).map((error, index) => (
                <div key={index}>{error}</div>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="submit-btn"
          disabled={isSubmitting || Object.keys(errors).length > 0}
        >
          {isSubmitting ? "Enviando..." : "Registrarse"}
        </button>

        <button
          type="button"
          className="cancel-btn"
          onClick={() => {
            
            setFormData({
              nombre: "",
              correo: "",
              numeroCasa: "",
              password: "",
              confirmPassword: "",
            });
            setErrors({});
            
          }}
        >Cancelar
        </button>

          <div class="login-link">
            <p>¿Ya tienes cuenta? <a href="login.html">Inicia sesión</a></p>
          </div>

        {errors.submit && <div className="error-message">{errors.submit}</div>}
      </form>

      {showSuccess && (
        <div className="success-message">
          ¡Registro exitoso! Se ha enviado un correo electrónico de verificación
          a tu dirección. Serás redirigido a la página de inicio de sesión en
          unos momentos.
        </div>
      )}
    </div>
  );
};

ReactDOM.render(
  <RegistrationForm />,
  document.getElementById("registration-root")
);
