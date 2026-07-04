import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";
import "../styles/Admin.css";


function Admin() {
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
  });

  const [file, setFile] = useState(null);
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


  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = async (id) => {
  try {
    await api.delete(`/models/${id}`);
    fetchModels();
  } catch (err) {
    console.error(err);
  }
};

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (editingId) {
      const res = await api.put(`/models/${editingId}`, formData);

      alert(res.data.message);
      setEditingId(null);
    } else {
      const data = new FormData();

      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("model", file);

      const res = await api.post("/models", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert(res.data.message);
    }

    fetchModels();

    setFormData({
      name: "",
      description: "",
      category: "",
    });

    setFile(null);
  } catch (err) {
    console.error(err);
    alert("Operation failed");
  }
};

  return (
    <>
      <Navbar />

      <div className="admin-container">
        <h1 className="admin-title">Admin Dashboard</h1>

        <form className="upload-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Model Name"
            value={formData.name}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
          />

          <input
            type="file"
            accept=".glb"
            onChange={handleFileChange}
          />

          <button type="submit">
  {editingId ? "Update Model" : "Upload Model"}
</button>
        </form>

        <h2>Uploaded Models</h2>

        <table className="models-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {models.length === 0 ? (
              <tr>
                <td colSpan="3">No models uploaded yet.</td>
              </tr>
            ) : (
              models.map((model) => (
                <tr key={model.id}>
                  <td>{model.name}</td>
                  <td>{model.category}</td>
                  <td>
                    <button
  className="action-btn"
  onClick={() => {
    setEditingId(model.id);

    setFormData({
      name: model.name,
      description: model.description,
      category: model.category,
    });
  }}
>
  Edit
</button>
                    <button className="action-btn" onClick={() => handleDelete(model.id)}>
  Delete
</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Admin;