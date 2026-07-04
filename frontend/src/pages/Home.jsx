import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ModelCard from "../components/ModelCard";
import api from "../services/api";

function Home() {
  const [models, setModels] = useState([]);

  const fetchModels = async () => {
    try {
      const res = await api.get("/models");
      setModels(res.data);
    } catch (err) {
      console.error("Error fetching models:", err);
    }
  };

  useEffect(() => {
    fetchModels();
  }, []);

  return (
    <>
      <Navbar />

      <div style={{ padding: "30px" }}>
        <h1>Available 3D Models</h1>

        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            marginTop: "20px",
          }}
        >
          {models.length === 0 ? (
            <p>No models available.</p>
          ) : (
            models.map((model) => (
              <ModelCard key={model.id} model={model} />
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Home;