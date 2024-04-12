import { useState } from "react";
import { Link } from "react-router-dom";
import backgroundImage from "../../assets/001.jpeg";

export default function LandingPage() {
  const [isHovered, setIsHovered] = useState(false);

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  };

  const contentStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
  };

  const buttonStyle = {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "18px",
    backgroundColor: "#808080",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  const buttonHoverStyle = {
    backgroundColor: "#ff0000",
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <h1>Are you ready to cook?</h1>
        <Link to="/home" style={{ textDecoration: "none" }}>
          <button
            style={
              isHovered ? { ...buttonStyle, ...buttonHoverStyle } : buttonStyle
            }
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Let's get cooking!
          </button>
        </Link>
      </div>
    </div>
  );
}
