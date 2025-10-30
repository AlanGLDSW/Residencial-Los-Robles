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

    localStorage.setItem("metodoPago", JSON.stringify(formData));
    alert("Método de pago guardado exitosamente.");
    window.location.href = "homepage.html";
  };

  const handleCancelar = () => {
    if (confirm("¿Deseas cancelar y regresar a la página principal?")) {
      window.location.href = "homepage.html";
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
          placeholder="Ingresa el número de tarjeta"
          value={formData.numeroTarjeta}
          onChange={handleChange}
          maxLength="16"
        />

        <div className="row">
          <div>
            <label>Expiración:</label>
            <input
              type="text"
              name="expiracion"
              placeholder="MM/AA"
              value={formData.expiracion}
              onChange={handleChange}
              maxLength="5"
            />
          </div>

          <div>
            <label>Código de seguridad:</label>
            <input
              type="text"
              name="cvv"
              placeholder="CVV"
              value={formData.cvv}
              onChange={handleChange}
              maxLength="3"
            />
          </div>
        </div>

        <div className="card-icons">
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg" alt="MasterCard" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg" alt="Amex" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Mercado_Pago_logo.svg" alt="Mercado Pago" />
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
            type="text"
            name="telefono"
            placeholder="Teléfono"
            value={formData.telefono}
            onChange={handleChange}
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
    </div>
  );
}

ReactDOM.render(<MetodoPago />, document.getElementById("payment-root"));
