import { createContext, useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { profileAPI, projectsAPI, experiencesAPI, skillsAPI, contactAPI } from "../services/api.js";

const PortfolioContext = createContext();

const PortfolioProvider = ({ children }) => {

    // ── Contact Form State ───────────────────────────────────────────────
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    // ── Data State ───────────────────────────────────────────────────────
    const [profile, setProfile] = useState(null);
    const [projects, setProjects] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [work, setWork] = useState([]);
    const [education, setEducation] = useState([]);
    const [skills, setSkills] = useState([]);
    const [skillCategories, setSkillCategories] = useState([]);

    // ── Loading State ────────────────────────────────────────────────────
    const [loadingProfile, setLoadingProfile] = useState(false);
    const [loadingProjects, setLoadingProjects] = useState(false);
    const [loadingExperiences, setLoadingExperiences] = useState(false);
    const [loadingSkills, setLoadingSkills] = useState(false);

    // ════════════════════════════════════════════════════════════════════
    // PROFILE
    // ════════════════════════════════════════════════════════════════════
    const fetchProfile = useCallback(async () => {
        setLoadingProfile(true);
        try {
            const res = await profileAPI.get();
            setProfile(res.data.profile);
        } catch (err) {
            console.error("fetchProfile:", err.message);
        } finally {
            setLoadingProfile(false);
        }
    }, []);

    const updateProfile = async (formData) => {
        try {
            const res = await profileAPI.update(formData);
            setProfile(res.data.profile);
            toast.success("Profile updated successfully! ✅");
            return res.data;
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to update profile");
            throw err;
        }
    };

    // ════════════════════════════════════════════════════════════════════
    // PROJECTS
    // ════════════════════════════════════════════════════════════════════
    const fetchProjects = useCallback(async (category = null) => {
        setLoadingProjects(true);
        try {
            const res = await projectsAPI.getAll(category);
            setProjects(res.data.projects);
        } catch (err) {
            console.error("fetchProjects:", err.message);
        } finally {
            setLoadingProjects(false);
        }
    }, []);

    const createProject = async (formData) => {
        try {
            const res = await projectsAPI.create(formData);
            setProjects(prev => [res.data.project, ...prev]);
            toast.success("Project added successfully! 🚀");
            return res.data;
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to create project");
            throw err;
        }
    };

    const updateProject = async (id, formData) => {
        try {
            const res = await projectsAPI.update(id, formData);
            setProjects(prev => prev.map(p => p._id === id ? res.data.project : p));
            toast.success("Project updated! ✅");
            return res.data;
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to update project");
            throw err;
        }
    };

    const deleteProject = async (id) => {
        try {
            await projectsAPI.delete(id);
            setProjects(prev => prev.filter(p => p._id !== id));
            toast.success("Project deleted! 🗑️");
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to delete project");
            throw err;
        }
    };

    // ════════════════════════════════════════════════════════════════════
    // EXPERIENCES
    // ════════════════════════════════════════════════════════════════════
    const fetchExperiences = useCallback(async () => {
        setLoadingExperiences(true);
        try {
            const res = await experiencesAPI.getAll();
            setExperiences(res.data.experiences);
            setWork(res.data.work);
            setEducation(res.data.education);
        } catch (err) {
            console.error("fetchExperiences:", err.message);
        } finally {
            setLoadingExperiences(false);
        }
    }, []);

    const createExperience = async (data) => {
        try {
            const res = await experiencesAPI.create(data);
            const exp = res.data.experience;
            setExperiences(prev => [exp, ...prev]);
            if (exp.type === "work") setWork(prev => [exp, ...prev]);
            else setEducation(prev => [exp, ...prev]);
            toast.success("Experience added! ✅");
            return res.data;
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to create experience");
            throw err;
        }
    };

    const updateExperience = async (id, data) => {
        try {
            const res = await experiencesAPI.update(id, data);
            const updated = res.data.experience;
            setExperiences(prev => prev.map(e => e._id === id ? updated : e));
            setWork(prev => prev.map(e => e._id === id ? updated : e).filter(e => e.type === "work"));
            setEducation(prev => prev.map(e => e._id === id ? updated : e).filter(e => e.type === "education"));
            toast.success("Experience updated! ✅");
            return res.data;
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to update experience");
            throw err;
        }
    };

    const deleteExperience = async (id) => {
        try {
            await experiencesAPI.delete(id);
            setExperiences(prev => prev.filter(e => e._id !== id));
            setWork(prev => prev.filter(e => e._id !== id));
            setEducation(prev => prev.filter(e => e._id !== id));
            toast.success("Entry deleted! 🗑️");
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to delete experience");
            throw err;
        }
    };

    // ════════════════════════════════════════════════════════════════════
    // SKILLS
    // ════════════════════════════════════════════════════════════════════
    const fetchSkills = useCallback(async () => {
        setLoadingSkills(true);
        try {
            const res = await skillsAPI.getAll();
            setSkills(res.data.skills);
            setSkillCategories(res.data.categories);
        } catch (err) {
            console.error("fetchSkills:", err.message);
        } finally {
            setLoadingSkills(false);
        }
    }, []);

    const createSkill = async (data) => {
        try {
            const res = await skillsAPI.create(data);
            setSkills(prev => [...prev, res.data.skill]);
            // Re-fetch to get updated grouped categories
            await fetchSkills();
            toast.success("Skill added! ✅");
            return res.data;
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to add skill");
            throw err;
        }
    };

    const deleteSkill = async (id) => {
        try {
            await skillsAPI.delete(id);
            setSkills(prev => prev.filter(s => s._id !== id));
            await fetchSkills();
            toast.success("Skill removed! 🗑️");
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to delete skill");
            throw err;
        }
    };

    // ════════════════════════════════════════════════════════════════════
    // CONTACT
    // ════════════════════════════════════════════════════════════════════
    const contactFormHandler = async () => {
        try {
            const res = await contactAPI.send({ name, email, subject, message });
            toast.success(res.data.message || "Message sent successfully! 📨");
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to send message");
            throw err;
        }
    };

    // ── Auto-fetch all data on mount ─────────────────────────────────────
    useEffect(() => {
        fetchProfile();
        fetchProjects();
        fetchExperiences();
        fetchSkills();
    }, [fetchProfile, fetchProjects, fetchExperiences, fetchSkills]);

    const value = {
        // Contact form
        name, setName, email, setEmail, subject, setSubject, message, setMessage,
        contactFormHandler,

        // Profile
        profile, loadingProfile, fetchProfile, updateProfile,

        // Projects
        projects, loadingProjects, fetchProjects, createProject, updateProject, deleteProject,

        // Experiences
        experiences, work, education, loadingExperiences,
        fetchExperiences, createExperience, updateExperience, deleteExperience,

        // Skills
        skills, skillCategories, loadingSkills, fetchSkills, createSkill, deleteSkill,
    };

    return (
        <PortfolioContext.Provider value={value}>
            {children}
        </PortfolioContext.Provider>
    );
};

export { PortfolioContext };
export default PortfolioProvider;