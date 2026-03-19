import { createContext } from "react";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const PortfolioContext = createContext();

const PortfolioProvider = ({ children }) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    
    const contactFormHandler = async () => {
        try {
            const result = await axios.post(`${BACKEND_URL}/api/contact`, {
                name,
                email,
                subject,
                message
            })
            toast.success(result.data.message || "Email sent successfully");
            console.log(result);
        } catch (error) {
            toast.error(error.message || "Failed to send email");
            console.log(error);
        }
    }
    const value = {
        name, email, subject, message, setName, setEmail, setSubject, setMessage, contactFormHandler
    }
    return (
        <PortfolioContext.Provider value={value}>
            {children}
        </PortfolioContext.Provider>
    )
}

export { PortfolioContext };
export default PortfolioProvider