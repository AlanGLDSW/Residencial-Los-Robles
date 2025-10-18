const { useState, useEffect } = React;

function RecuperarContrasena() {
  const [email, setEmail] = useState("");
  const [placeholderVisible, setPlaceholderVisible] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showResetScreen, setShowResetScreen] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

 
  useEffect(() => {
    const mainLogoUrl = "./Los Robles residencial.jpg";
    const appLogoUrl = "./Robles connect.jpg";

    const mainLogo = new Image();
    mainLogo.src = mainLogoUrl;
    mainLogo.onload = () => {
      const logoElement = document.getElementById("main-logo");
      if (logoElement) logoElement.src = mainLogoUrl;
    };
    mainLogo.onerror = () => {
      console.log("No se pudo cargar el logo principal");
    };

    const appLogo = new Image();
    appLogo.src = appLogoUrl;
    appLogo.onload = () => {
      const logoElement = document.getElementById("app-logo");
      if (logoElement) logoElement.src = appLogoUrl;
    };
    appLogo.onerror = () => {
      console.log("No se pudo cargar el logo de la app");
    };
  }, []);


  const validarCorreo = () => {
    const correosRegistrados = ["usuario@ejemplo.com", "residente@robles.mx", "alan.gonzalez8538@alumnos.udg.mx"];
    if (!correosRegistrados.includes(email)) {
      setError("No existe una cuenta asociada a este correo");
    } else {
      setError("");
      setSuccess("Se ha enviado un enlace de recuperación a tu correo.");
      setTimeout(() => {
        setShowResetScreen(true);
        setSuccess("");
      }, 2000); 
    }
  };


  const validarNuevaContrasena = () => {
    const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
    if (!regex.test(password)) {
      setError(
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial."
      );
      return;
    }
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    setError("");
    setSuccess("Tu contraseña ha sido restablecida.");
    setTimeout(() => {
      window.location.href = "login.html"; 
    }, 2000);
  };


  if (!showResetScreen) {
    return (
      <div className="recover-container">
        <label htmlFor="email">Correo electrónico:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setPlaceholderVisible(e.target.value === "");
          }}
          placeholder={placeholderVisible ? "tucorreo@ejemplo.com" : ""}
          onFocus={() => setPlaceholderVisible(false)}
          onBlur={() => setPlaceholderVisible(email === "")}
        />
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <button onClick={validarCorreo}>Continuar</button>
      </div>
    );
  }

  
  return (
    <div className="reset-container">
      <label htmlFor="password">Nueva contraseña:</label>
      <input
        id="password"
        type="password"
        placeholder="Introduce tu nueva contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <label htmlFor="confirmPassword">Confirmar contraseña:</label>
      <input
        id="confirmPassword"
        type="password"
        placeholder="Confirma tu nueva contraseña"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <button onClick={validarNuevaContrasena}>Restablecer contraseña</button>
    </div>
  );
}


ReactDOM.createRoot(document.getElementById("olvide-root")).render(
  <RecuperarContrasena />
);
