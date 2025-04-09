// Cria a div do círculo
const circulo = document.createElement("div");

// Aplica os estilos
Object.assign(circulo.style, {
  width: "100px",
  height: "100px",
  backgroundColor: "#4CAF50",
  borderRadius: "50%",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
  zIndex: 9999
});

// Adiciona ao body
document.body.appendChild(circulo);
