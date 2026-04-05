import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AuthRouter from "./routes/user.routes"
import CustomCursor from './components/CustomCursor'
import IntroAnimation from './components/IntroAnimation'


const App = () => {
    const [introDone, setIntroDone] = useState(false);
    
    useEffect(() => {
        const activateBackend = async () => {
            try {
                await fetch(`${import.meta.env.VITE_BACKEND_URL}`);
            } catch (error) {
                console.error("Error activating backend:", error);
            }
        };
        activateBackend();
    }, []);

    return (
        <>
            {!introDone && <IntroAnimation onFinish={() => setIntroDone(true)} />}
            {introDone && (
                <div className='relative gradient text-white'>
                    <CustomCursor />
                    <Navbar />
                    <AuthRouter />
                    <Footer />
                </div>
            )}
        </>
    )
}

export default App