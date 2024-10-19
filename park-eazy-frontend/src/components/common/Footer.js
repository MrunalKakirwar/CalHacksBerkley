const Footer = () => {
  return (
    <footer
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "60px",
        backgroundColor: "#2D3748",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10, // Ensure it stays above content if needed
      }}
    >
      <p>© 2024 Park-Eazy. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
