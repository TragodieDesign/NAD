import React from "react";

const WifiSignal = ({ status, width = "30", height = "30" }) => {
  // Substitua as URLs abaixo pelas URLs reais das suas imagens externas
  const imageSources = {
    "good-connection": "good-connection.svg",
    "fair-connection": "fair-connection.svg",
    "poor-connection": "poor-connection.svg",
    "error": "no-connection.svg",
  };

  const imageUrl = imageSources[status];

  return (
    <img
      className={`wifi-image ${status}`}
      src={imageUrl}
      alt={`WiFi Status: ${status}`}
      width={width}
      height={height}
    />
  );
};

export default WifiSignal;