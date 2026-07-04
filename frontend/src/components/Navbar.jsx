import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        backgroundColor: "#1f2937",
      }}
    >
      <h2 style={{ color: "white" }}>3D Model Viewer</h2>

      <div>
        <Link
          to="/"
          style={{
            color: "white",
            marginRight: "20px",
            textDecoration: "none",
          }}
        >
          Home
        </Link>

        <Link
  to="/admin"
  style={{
    color: "white",
    textDecoration: "none",
  }}
>
  Admin
</Link>
      </div>
    </nav>
  );
}

export default Navbar;