import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Skills from "../pages/Skills";
import Experience from "../pages/Experience";
import Projects from "../pages/Projects";
import Contact from "../pages/Contact";
import Admin from "../pages/Admin";

const AuthRouter = () => {
    return (
        <Routes>
            <Route path="/"           element={<Home />} />
            <Route path="/about"      element={<About />} />
            <Route path="/skills"     element={<Skills />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/projects"   element={<Projects />} />
            <Route path="/projects/:id" element={<Projects />} />
            <Route path="/contact"    element={<Contact />} />
            {/* Admin panel — manage all portfolio content */}
            <Route path="/admin"      element={<Admin />} />
        </Routes>
    );
};

export default AuthRouter;