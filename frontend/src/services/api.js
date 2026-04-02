import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

// ─── Axios Instance ──────────────────────────────────────────────────────────
const api = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});

// ─── Profile API ─────────────────────────────────────────────────────────────
export const profileAPI = {
    /** Fetch profile data (About page, Home page) */
    get: () => api.get("/api/user/profile"),

    /** Update profile — pass FormData if uploading image */
    update: (data) => {
        const isFormData = data instanceof FormData;
        return api.post("/api/user/profile", data, {
            headers: isFormData
                ? { "Content-Type": "multipart/form-data" }
                : { "Content-Type": "application/json" },
        });
    },
};

// ─── Projects API ─────────────────────────────────────────────────────────────
export const projectsAPI = {
    /** Get all projects — optionally filter by category */
    getAll: (category = null) => {
        const params = category && category !== "All" ? { category } : {};
        return api.get("/api/projects", { params });
    },

    /** Create project — pass FormData (includes optional image file) */
    create: (data) =>
        api.post("/api/projects", data, {
            headers: { "Content-Type": "multipart/form-data" },
        }),

    /** Update project by ID — pass FormData (includes optional new image) */
    update: (id, data) =>
        api.put(`/api/projects/${id}`, data, {
            headers: { "Content-Type": "multipart/form-data" },
        }),

    /** Delete project by ID */
    delete: (id) => api.delete(`/api/projects/${id}`),
};

// ─── Experiences API ──────────────────────────────────────────────────────────
export const experiencesAPI = {
    /** Get all experiences — optionally filter by type (work | education) */
    getAll: (type = null) => {
        const params = type ? { type } : {};
        return api.get("/api/experiences", { params });
    },

    /** Create experience entry */
    create: (data) => api.post("/api/experiences", data),

    /** Update experience by ID */
    update: (id, data) => api.put(`/api/experiences/${id}`, data),

    /** Delete experience by ID */
    delete: (id) => api.delete(`/api/experiences/${id}`),
};

// ─── Skills API ───────────────────────────────────────────────────────────────
export const skillsAPI = {
    /**
     * Get all skills
     * Response includes:
     *   skills    — flat array
     *   categories — grouped array ready for Skills.jsx skillCategories
     */
    getAll: () => api.get("/api/skills"),

    /** Add a skill: { name, color, category, order? } */
    create: (data) => api.post("/api/skills", data),

    /** Update a skill by ID */
    update: (id, data) => api.put(`/api/skills/${id}`, data),

    /** Delete a skill by ID */
    delete: (id) => api.delete(`/api/skills/${id}`),
};

// ─── Contact API ──────────────────────────────────────────────────────────────
export const contactAPI = {
    /** Send contact form message: { name, email, subject, message } */
    send: (data) => api.post("/api/contact", data),
};

// ─── AI API ───────────────────────────────────────────────────────────────────
export const aiAPI = {
    /** Enhance text via Gemini: { text, contextType } */
    enhance: (data) => api.post("/api/ai/enhance", data),
};

export default api;
