import { Link } from "react-router-dom";

function ModelCard({ model }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "20px",
        width: "250px",
        textAlign: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <div style={{ fontSize: "50px" }}>📦</div>

      <h3>{model.name}</h3>

      <p>{model.description}</p>

      <Link to={`/viewer/${model.id}`}>
        <button
          style={{
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          View Model
        </button>
      </Link>
    </div>
  );
}

export default ModelCard;