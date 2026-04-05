import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Skills from "../pages/Skills";
import Experience from "../pages/Experience";
import Projects from "../pages/Projects";
import Contact from "../pages/Contact";
import Admin from "../pages/Admin";
import Login from "../pages/Login";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

// ─── Protected Route Component ───────────────────────────────────────────────
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;

    return isAuthenticated ? children : <Navigate to="/login" />;
};

const AuthRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            {/* Admin panel — manage all portfolio content — Protected */}
            <Route path="/admin" element={
                <ProtectedRoute>
                    <Admin />
                </ProtectedRoute>
            } />
        </Routes>
    );
};

export default AuthRouter;