function MetodoPago() {
  const [formData, setFormData] = React.useState({
    nombreTitular: "",
    numeroTarjeta: "",
    expiracion: "",
    cvv: "",
    calle: "",
    colonia: "",
    cp: "",
    telefono: "",
    referencias: "",
  });

  const [isCardFocused, setIsCardFocused] = React.useState(false);

  const handleChangeNumeroTarjeta = (e) => {
    let value = e.target.value.replace(/\D/g, ''); 
    if (value.length <= 16) {
      setFormData({ ...formData, numeroTarjeta: value });
    }
  };

  const getDisplayCardNumber = () => {
    if (isCardFocused) {

      return formData.numeroTarjeta.replace(/(.{4})/g, '$1 ').trim();
    } else if (formData.numeroTarjeta.length === 16) {

      return `**** **** **** ${formData.numeroTarjeta.slice(-4)}`;
    }
    return formData.numeroTarjeta;
  };

  const handleChangeExpiracion = (e) => {
    let value = e.target.value.replace(/\D/g, ''); 
    if (value.length > 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    if (value.length <= 5) {
      setFormData({ ...formData, expiracion: value });
    }
  };

  const handleChangeCVV = (e) => {
    const value = e.target.value.replace(/\D/g, ''); 
    if (value.length <= 3) {
      setFormData({ ...formData, cvv: value });
    }
  };

  const handleChangeTelefono = (e) => {
  const value = e.target.value.replace(/\D/g, ''); // Solo números
  setFormData({ ...formData, telefono: value });
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGuardar = () => {
    if (
      !formData.nombreTitular ||
      !formData.numeroTarjeta ||
      !formData.expiracion ||
      !formData.cvv
    ) {
      alert("Por favor completa todos los campos obligatorios del método de pago.");
      return;
    }


    if (formData.numeroTarjeta.length !== 16) {
      alert("El número de tarjeta debe tener 16 dígitos.");
      return;
    }

    if (formData.expiracion.length !== 5) {
      alert("Por favor ingresa una fecha de expiración válida (MM/AA).");
      return;
    }

    if (formData.cvv.length !== 3) {
      alert("El CVV debe tener 3 dígitos.");
      return;
    }

    const metodosExistentes = JSON.parse(localStorage.getItem("metodosPago")) || [];
    
    const nuevosMetodos = [...metodosExistentes, formData];
    
    localStorage.setItem("metodosPago", JSON.stringify(nuevosMetodos));
    localStorage.setItem("metodoPagoSeleccionado", JSON.stringify(formData));

    alert("Método de pago guardado exitosamente.");
    window.location.href = "pagos.html"; 
  };

  const handleCancelar = () => {
    if (confirm("¿Deseas cancelar y regresar a la página de pagos?")) {
      window.location.href = "pagos.htlm";
    }
  };

  return (
    <div>
      <h1>Portal de pagos en línea</h1>

      <section>
        <h2 className="section-title">Método de pago</h2>

        <label>Titular:</label>
        <input
          type="text"
          name="nombreTitular"
          placeholder="Nombre del titular"
          value={formData.nombreTitular}
          onChange={handleChange}
        />

        <label>Número de tarjeta:</label>
        <input
          type="text"
          name="numeroTarjeta"
          placeholder="**** **** **** ****"
          value={getDisplayCardNumber()}
          onChange={handleChangeNumeroTarjeta}
          onFocus={() => setIsCardFocused(true)}
          onBlur={() => setIsCardFocused(false)}
          maxLength={isCardFocused ? 19 : 22} 
        />

        <div className="row">
          <div>
            <label>Expiración:</label>
            <input
              type="text"
              name="expiracion"
              placeholder="MM/AA"
              value={formData.expiracion}
              onChange={handleChangeExpiracion}
              maxLength="5"
            />
          </div>

          <div>
            <label>Código de seguridad:</label>
            <input
              type="password"
              name="cvv"
              placeholder="***"
              value={formData.cvv}
              onChange={handleChangeCVV}
              maxLength="3"
            />
          </div>
        </div>

        <div className="card-icons">
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="payment-logo" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg" alt="MasterCard" className="payment-logo" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg" alt="Amex" className="payment-logo" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="payment-logo" />
        </div>
      </section>

      <section>
        <h2 className="section-title">Dirección de facturación</h2>

        <input
          type="text"
          name="calle"
          placeholder="Calle, número exterior, número interior"
          value={formData.calle}
          onChange={handleChange}
        />

        <input
          type="text"
          name="colonia"
          placeholder="Colonia"
          value={formData.colonia}
          onChange={handleChange}
        />

        <div className="row">
          <input
            type="text"
            name="cp"
            placeholder="C.P."
            value={formData.cp}
            onChange={handleChange}
            maxLength="5"
          />
          <input
            type="tel"
            name="telefono"
            placeholder="Teléfono"
            value={formData.telefono}
            onChange={handleChangeTelefono}
          />
        </div>

        <input
          type="text"
          name="referencias"
          placeholder="Referencias"
          value={formData.referencias}
          onChange={handleChange}
        />
      </section>

      <button className="btn-save" onClick={handleGuardar}>
        Guardar
      </button>
      <button className="btn-cancel" onClick={handleCancelar}>
        Cancelar
      </button>

      <style jsx>{`
        .card-icons {
          display: flex;
          gap: 15px;
          margin-top: 20px;
          align-items: center;
          flex-wrap: wrap;
        }
        
        .payment-logo {
          height: 30px;
          width: auto;
          max-width: 60px;
          object-fit: contain;
        }
        
        input {
          transition: all 0.3s ease;
        }
        
        input:focus {
          border-color: #007bff;
          box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
        }
      `}</style>
    </div>
  );
}

ReactDOM.render(<MetodoPago />, document.getElementById("payment-root"));

