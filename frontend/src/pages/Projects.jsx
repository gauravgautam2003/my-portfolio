import React, { useState, useEffect, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight, FaImage } from "react-icons/fa";
import { PortfolioContext } from '../context/PortfolioContext';
import Astra from "../assets/Astra.png"
import photo1 from "../assets/photo1.JPG"
import img1 from "../assets/img1.JPG"
import m1 from "../assets/m1.PNG"
import w1 from "../assets/w1.PNG"
import img2 from "../assets/img2.JPG"

const FILTER_BUTTONS = ["All", "Frontend", "Backend", "Full Stack", "Mobile"]

// Fallback hardcoded projects (shown when DB is empty)
const DEFAULT_PROJECTS = [
    { _id: '1', title: "Astra", description: "A modern web application built with cutting-edge technologies featuring real-time data visualization and seamless user experience.", image: Astra, category: "Full Stack", techStack: ["React", "Node.js", "MongoDB", "Tailwind"], github: "https://github.com", liveDemo: "#" },
    { _id: '2', title: "Portfolio Website", description: "Personal portfolio showcasing skills, projects, and experience with smooth animations and responsive design.", image: photo1, category: "Frontend", techStack: ["React", "Framer Motion", "CSS3"], github: "https://github.com", liveDemo: "#" },
    { _id: '3', title: "E-commerce Platform", description: "Full-featured online store with shopping cart, payment integration, admin dashboard, and inventory management.", image: img1, category: "Full Stack", techStack: ["Next.js", "Stripe", "PostgreSQL", "Redux"], github: "https://github.com", liveDemo: "#" },
    { _id: '4', title: "Dashboard Analytics", description: "Admin dashboard with interactive charts, data visualization, user management, and real-time updates.", image: m1, category: "Frontend", techStack: ["React", "Chart.js", "Tailwind", "Firebase"], github: "https://github.com", liveDemo: "#" },
    { _id: '5', title: "Mobile Fitness App", description: "Cross-platform mobile application for tracking workouts, nutrition, and fitness goals with social features.", image: w1, category: "Mobile", techStack: ["React Native", "Expo", "Node.js"], github: "https://github.com", liveDemo: "#" },
    { _id: '6', title: "REST API Service", description: "Scalable backend API with authentication, database integration, caching, and comprehensive documentation.", image: img2, category: "Backend", techStack: ["Node.js", "Express", "MongoDB", "Redis"], github: "https://github.com", liveDemo: "#" },
]

const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0, scale: 0.85 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit:   (dir) => ({ x: dir < 0 ? 300 : -300, opacity: 0, scale: 0.85 }),
}

const Projects = () => {
    const { projects, loadingProjects } = useContext(PortfolioContext)
    const [activeFilter, setActiveFilter] = useState("All")
    const [currentIndex, setCurrentIndex] = useState(0)
    const [direction, setDirection] = useState(0)

    // Use API data if available, else fallback
    const allProjects = projects?.length ? projects : DEFAULT_PROJECTS

    const filteredProjects = activeFilter === "All"
        ? allProjects
        : allProjects.filter(p => p.category === activeFilter)

    useEffect(() => { setCurrentIndex(0); setDirection(0) }, [activeFilter])

    const goTo = (newIndex) => {
        setDirection(newIndex > currentIndex ? 1 : -1)
        setCurrentIndex(newIndex)
    }
    const prev = () => { if (filteredProjects.length > 1) goTo(currentIndex === 0 ? filteredProjects.length - 1 : currentIndex - 1) }
    const next = () => { if (filteredProjects.length > 1) goTo(currentIndex === filteredProjects.length - 1 ? 0 : currentIndex + 1) }

    const current = filteredProjects[currentIndex]

    return (
        <section id='projects' className='w-full min-h-screen bg-black relative overflow-hidden py-20'>
            <div className='absolute inset-0 pointer-events-none'>
                <div className='absolute top-40 -right-32 w-[50vw] h-[50vh] rounded-full bg-gradient-to-r from-[#4b3aff] via-[#00bf8f] to-[#1cd8d2] opacity-15 blur-[120px]' />
                <div className='absolute bottom-40 -left-32 w-[50vw] h-[50vh] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-20 blur-[120px]' />
            </div>

            <div className='relative z-10 max-w-6xl mx-auto px-4'>
                {/* Title */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }} viewport={{ once: true }} className='text-center mb-16'>
                    <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2'>My Projects</h2>
                    <div className='max-w-40 h-1 bg-gradient-to-r from-[#0b7def] to-[#00bf8f] mx-auto rounded-full' />
                    <p className='text-gray-400 mt-4 max-w-2xl mx-auto'>Showcasing my work and side projects</p>
                </motion.div>

                {/* Filter Buttons */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true }}
                    className='flex flex-wrap justify-center gap-4 mb-12'>
                    {FILTER_BUTTONS.map(cat => (
                        <motion.button key={cat} onClick={() => setActiveFilter(cat)}
                            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                            className={`px-5 py-2.5 rounded-full border transition-all duration-300 cursor-pointer ${activeFilter === cat
                                ? 'bg-gradient-to-r from-[#0b7def] to-[#00bf8f] border-transparent text-white'
                                : 'bg-white/5 border-white/10 text-gray-300 hover:border-white/30'}`}>
                            {cat}
                        </motion.button>
                    ))}
                </motion.div>

                {loadingProjects ? (
                    <div className='max-w-4xl mx-auto h-[500px] bg-white/5 rounded-2xl animate-pulse' />
                ) : filteredProjects.length === 0 ? (
                    <div className='text-center py-20 text-gray-500'>
                        <FaImage size={40} className='mx-auto mb-4 opacity-30' />
                        <p>No projects in this category yet.</p>
                    </div>
                ) : (
                    <div className='relative max-w-4xl mx-auto'>
                        {/* Arrows */}
                        <motion.button whileHover={{ scale: 1.1, x: -5 }} whileTap={{ scale: 0.9 }}
                            onClick={prev} disabled={filteredProjects.length <= 1}
                            className='absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 z-20 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-[#0b7def]/50 hover:border-[#0b7def] transition-all disabled:opacity-30 disabled:cursor-not-allowed'>
                            <FaChevronLeft size={20} />
                        </motion.button>
                        <motion.button whileHover={{ scale: 1.1, x: 5 }} whileTap={{ scale: 0.9 }}
                            onClick={next} disabled={filteredProjects.length <= 1}
                            className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 z-20 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-[#0b7def]/50 hover:border-[#0b7def] transition-all disabled:opacity-30 disabled:cursor-not-allowed'>
                            <FaChevronRight size={20} />
                        </motion.button>

                        {/* Card */}
                        <div className='relative h-[500px] overflow-hidden'>
                            <AnimatePresence mode='wait' custom={direction}>
                                {current && (
                                    <motion.div key={`${activeFilter}-${currentIndex}`}
                                        custom={direction} variants={slideVariants}
                                        initial="enter" animate="center" exit="exit"
                                        transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.3 } }}
                                        className='absolute inset-0'>
                                        {/* Glow orbs */}
                                        <div className='absolute inset-0 pointer-events-none'>
                                            <div className='absolute -top-20 -left-20 w-40 h-40 bg-[#0b7def] rounded-full blur-[80px] opacity-40' />
                                            <div className='absolute -bottom-20 -right-20 w-40 h-40 bg-[#00bf8f] rounded-full blur-[80px] opacity-40' />
                                        </div>

                                        <div className='relative h-full flex items-center justify-center p-4'>
                                            <motion.div whileHover={{ scale: 1.02 }}
                                                className='w-full max-w-2xl bg-black/90 border border-white/20 rounded-2xl overflow-hidden'>
                                                {/* Image */}
                                                <div className='relative h-56 overflow-hidden bg-white/5'>
                                                    {current.image
                                                        ? <motion.img src={current.image} alt={current.title}
                                                            className='w-full h-full object-cover' whileHover={{ scale: 1.1 }} transition={{ duration: 0.5 }} />
                                                        : <div className='w-full h-full flex items-center justify-center text-gray-600'><FaImage size={40} /></div>
                                                    }
                                                    <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent' />
                                                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.3 }} className='absolute top-4 right-4'>
                                                        <span className='px-3 py-1 text-xs font-medium bg-[#0b7def]/30 backdrop-blur-sm text-[#0b7def] rounded-full border border-[#0b7def]/50'>
                                                            {current.category}
                                                        </span>
                                                    </motion.div>
                                                </div>
                                                {/* Info */}
                                                <div className='p-6'>
                                                    <motion.h3 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                                                        className='text-2xl font-bold text-white mb-2'>{current.title}</motion.h3>
                                                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                                                        className='text-gray-400 mb-4 text-sm'>{current.description}</motion.p>
                                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                                                        className='flex flex-wrap gap-2 mb-4'>
                                                        {current.techStack?.map(tech => (
                                                            <span key={tech} className='px-3 py-1 text-xs bg-white/10 text-gray-300 rounded-md border border-white/10'>{tech}</span>
                                                        ))}
                                                    </motion.div>
                                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                                                        className='flex gap-3'>
                                                        <motion.a whileHover={{ scale: 1.1, y: -2 }}
                                                            href={current.github} target='_blank' rel='noopener noreferrer'
                                                            className='w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-[#0b7def]/30 hover:border-[#0b7def] transition-colors'>
                                                            <FaGithub />
                                                        </motion.a>
                                                        <motion.a whileHover={{ scale: 1.1, y: -2 }}
                                                            href={current.liveDemo} target='_blank' rel='noopener noreferrer'
                                                            className='w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-[#00bf8f]/30 hover:border-[#00bf8f] transition-colors'>
                                                            <FaExternalLinkAlt />
                                                        </motion.a>
                                                    </motion.div>
                                                </div>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Dots */}
                        <div className='flex justify-center gap-2 mt-6'>
                            {filteredProjects.map((_, i) => (
                                <motion.button key={i} onClick={() => goTo(i)} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                                    <div className={`w-3 h-3 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-gradient-to-r from-[#0b7def] to-[#00bf8f]' : 'bg-white/20 hover:bg-white/40'}`} />
                                </motion.button>
                            ))}
                        </div>
                        <div className='text-center mt-4'>
                            <span className='text-gray-500 text-sm'>{currentIndex + 1} / {filteredProjects.length}</span>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default Projects
