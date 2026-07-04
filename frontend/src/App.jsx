import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Viewer from "./pages/Viewer";
import Admin from "./pages/Admin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/viewer/:id" element={<Viewer />} />
        <Route path="/admin" element={<Admin />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
