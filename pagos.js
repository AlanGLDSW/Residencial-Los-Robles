
import React, { useState, useEffect } from "react";
import "./Pagos.css";

const Pagos = ({ userId }) => {
  const [saldoPendiente, setSaldoPendiente] = useState(1250.75);
  const [cuotas, setCuotas] = useState([
    { id: 1, periodo: "Octubre 2025", monto: 650.0 },
    { id: 2, periodo: "Noviembre 2025", monto: 600.75 },
  ]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [cuotaSeleccionada, setCuotaSeleccionada] = useState(null);
  const [metodoPago, setMetodoPago] = useState("Mercado Pago");

  const manejarPago = (cuota) => {
    setCuotaSeleccionada(cuota);
    setMostrarFormulario(true);
  };

  const manejarConfirmarPago = (e) => {
    e.preventDefault();

    switch(metodoPago) {
      case "Mercado Pago":
        window.location.href = "/procesar-pago-mercado-pago";
        break;
      case "PayPal":
        window.location.href = "/procesar-pago-paypal";
        break;
      case "Tarjeta de crédito":
        window.location.href = "/procesar-pago-tarjeta-credito";
        break;
      case "Tarjeta de débito":
        window.location.href = "/procesar-pago-tarjeta-debito";
        break;  
      default:
        window.location.href = "/metodo-pago-no-disponible";  
    }
  };

  return (
    <div className="pagos-container">
      <h1 className="titulo-principal">Pago de Cuotas de Mantenimiento</h1>

      <div className="saldo-card">
        <h2>Saldo pendiente</h2>
        <p className="saldo-cantidad">${saldoPendiente.toFixed(2)}</p>
      </div>

      <div className="cuotas-card">
        <h2>Cuotas pendientes</h2>
        {cuotas.length === 0 ? (
          <p>No tienes cuotas pendientes.</p>
        ) : (
          <ul className="lista-cuotas">
            {cuotas.map((cuota) => (
              <li key={cuota.id} className="cuota-item">
                <div>
                  <p>
                    <strong>Periodo:</strong> {cuota.periodo}
                  </p>
                  <p>
                    <strong>Monto:</strong> ${cuota.monto.toFixed(2)}
                  </p>
                </div>
                <button
                  className="btn-pagar"
                  onClick={() => manejarPago(cuota)}
                >
                  Pagar ahora
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {mostrarFormulario && cuotaSeleccionada && (
        <div className="formulario-pago">
          <h2>Formulario de pago</h2>
          <p>
            Estás por pagar la cuota de <b>{cuotaSeleccionada.periodo}</b> por un
            monto de <b>${cuotaSeleccionada.monto.toFixed(2)}</b>
          </p>
          <form onSubmit={manejarConfirmarPago}>
            <label>Método de pago:</label>
            <select 
              value={metodoPago} 
              onChange={(e) => setMetodoPago(e.target.value)}
            >
              <option>Mercado Pago</option>
              <option>PayPal</option>
              <option>Tarjeta de crédito</option>
              <option>Tarjeta de débito</option>
            </select>
            <button type="submit" className="btn-confirmar">
              Confirmar pago
            </button>
          </form>
          <button
            className="btn-cancelar"
            onClick={() => setMostrarFormulario(false)}
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
};

export default Pagos;
