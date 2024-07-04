import React, { useEffect } from "react";
import Signin from './Signin';


const Box = (props) => {
  const { title, btnClass, btnTitle, price, feature, btnId } = props;

  useEffect(() => {
    if (title !== "Free") {
      const paypalContainer = document.getElementById(`paypal-button-container-${btnId}`);
      if (paypalContainer) {
        paypalContainer.innerHTML = '';
      }

      if (window.paypal) {
        window.paypal.Buttons({
          createOrder: function(data, actions) {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: price
                }
              }]
            });
          },
          onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
              alert('Transaktion abgeschlossen von ' + details.payer.name.given_name);
            });
          }
        }).render(`#paypal-button-container-${btnId}`);
      }
    }
  }, [price, btnId, title]);

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-header">
        <h4 className="my-0 font-weight-normal">{title}</h4>
      </div>
      <div className="card-body">
        <h1 className="card-title pricing-card-title">
          €{price} <small className="text-muted">/ mo</small>
        </h1>
        <ul className="list-unstyled mt-3 mb-4">
          {feature &&
            feature.map((data, index) => {
              return <li key={index}>{data}</li>;
            })}
        </ul>
        <div className="btn-container">
          {title === "Free" ? (
            <button type="button" className={`btn btn-lg btn-block ${btnClass}`}>
              Sign-in for free
            </button>
          ) : (
            <div id={`paypal-button-container-${btnId}`}></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Box;
