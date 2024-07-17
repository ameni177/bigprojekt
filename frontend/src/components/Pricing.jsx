import React from "react";
import Box from "./Box";
import "./Pricing.css";

const Pricing = () => {
  const featureBox1 = [
    "Max. 5 Teilnehmer",
    "KI-Support",
    "Basic Konferenzverwaltung",
  ];
  const featureBox2 = [
    "Max. 20 Teilnehmer",
    "KI- & Mailsupport",
    "Erweiterte Konferenzverwaltung",
  ];
  const featureBox3 = [
    "Max. 50 Teilnehmer",
    "Premium KI- & Mailsupport",
    "Premium Konferenzverwaltung",
  ];
  return (
  <div className="obercont">
    <div className="card-deck">
      <Box
        feature={featureBox1}
        price="0"
        title="Free"
        btnClass="btn-outline-primary"
        btnId="free"
      />
      <Box
        feature={featureBox2}
        price="4.99"
        title="Pro"
        btnClass="btn-primary"
        btnId="pro"
      />
      <Box
        feature={featureBox3}
        price="9.99"
        title="Premium"
        btnClass="btn-primary"
        btnId="premium"
      />
    </div>
  </div>
  );
};

export default Pricing;
