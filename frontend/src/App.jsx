import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AuthRouter from "./routes/user.routes"
import CustomCursor from './components/CustomCursor'
import IntroAnimation from './components/IntroAnimation'


const App = () => {
    const [introDone, setIntroDone] = useState(false);

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