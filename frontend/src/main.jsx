import './index.css'
import App from './App.jsx'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import PortfolioProvider from "./context/PortfolioContext";



createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <PortfolioProvider>
            <App />
        </PortfolioProvider>
    </BrowserRouter>
)
