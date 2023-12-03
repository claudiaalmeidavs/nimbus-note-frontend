import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import ProjectListPage from "./pages/ProjectListPage/ProjectListPage";
import CreateNewProject from "./pages/CreateNewProject/CreateNewProject";
import EditProject from "./pages/EditProject/EditProject.jsx"


function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<ProjectListPage />}/>
        <Route path="/new" element={<CreateNewProject />}/>
        <Route path="/edit/:id" element={<EditProject />} />
      </Routes>
    </div>
  );
}

export default App;
