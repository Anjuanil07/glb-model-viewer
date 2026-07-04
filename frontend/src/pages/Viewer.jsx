import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import ModelViewer from "../components/ModelViewer";
import api from "../services/api";

function Viewer() {
  const { id } = useParams();
  const [model, setModel] = useState(null);

  useEffect(() => {
    const fetchModel = async () => {
      try {
        const res = await api.get("/models");

        const selectedModel = res.data.find(
          (item) => String(item.id) === String(id)
        );

        setModel(selectedModel);
      } catch (err) {
        console.error("Error fetching model:", err);
      }
    };

    fetchModel();
  }, [id]);

  return (
    <>
      <Navbar />

      <div style={{ padding: "30px" }}>
        <h1>3D Model Viewer</h1>

        {model ? (
          <>
            <h2>{model.name}</h2>
            <p>{model.description}</p>

            <ModelViewer
              key={model.model_url}
              url={model.model_url}
            />
          </>
        ) : (
          <p>Loading model...</p>
        )}
      </div>
    </>
  );
}

export default Viewer;