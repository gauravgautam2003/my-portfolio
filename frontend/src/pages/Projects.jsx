import React, { useState, useEffect, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt, FaImage, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { PortfolioContext } from '../context/PortfolioContext';
import Astra from "../assets/Astra.png"
import photo1 from "../assets/photo1.JPG"
import img1 from "../assets/img1.JPG"
import m1 from "../assets/m1.PNG"
import w1 from "../assets/w1.PNG"
import img2 from "../assets/img2.JPG"

const FILTER_BUTTONS = ["All", "Frontend", "Backend", "Full Stack", "Mobile"]

const slideVariants = {
    enter: (direction) => ({
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
        scale: 0.8,
        rotateY: direction > 0 ? -45 : 45
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
        scale: 1,
        rotateY: 0
    },
    exit: (direction) => ({
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
        scale: 0.8,
        rotateY: direction < 0 ? -45 : 45
    })
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
};

const Projects = () => {
    const { projects, loadingProjects } = useContext(PortfolioContext)
    const [activeFilter, setActiveFilter] = useState("All")
    const [[page, direction], setPage] = useState([0, 0]);

    const allProjects = projects || [];
    const filteredProjects = activeFilter === "All" ? allProjects : allProjects.filter(p => p.category === activeFilter);

    useEffect(() => { setPage([0, 0]) }, [activeFilter])

    const imageIndex = Math.abs(page % filteredProjects.length);
    const currentProject = filteredProjects[imageIndex];

    const paginate = (newDirection) => {
        setPage([page + newDirection, newDirection]);
    };

    return (
        <section id='projects' className='w-full min-h-screen bg-[#050505] relative overflow-hidden py-24 flex flex-col justify-center perspective-[1000px]'>
            {/* Background Ambient Glows */}
            <div className='absolute inset-0 pointer-events-none'>
                <div className='absolute top-20 -right-40 w-[60vw] h-[60vh] rounded-full bg-[#0b7def] opacity-[0.08] blur-[150px]' />
                <div className='absolute bottom-20 -left-40 w-[60vw] h-[60vh] rounded-full bg-[#00bf8f] opacity-[0.08] blur-[150px]' />
            </div>

            <div className='relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full'>

                {/* Filters (Text removed as requested) */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                    className='flex flex-wrap justify-center gap-3 mb-12'>
                    {FILTER_BUTTONS.map(cat => (
                        <button key={cat} onClick={() => setActiveFilter(cat)}
                            className={`px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 ${
                                activeFilter === cat
                                    ? 'bg-gradient-to-r from-[#0b7def] to-[#00bf8f] text-white shadow-[0_0_20px_rgba(11,125,239,0.3)] scale-105'
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white hover:scale-105 border border-white/5'
                            }`}>
                            {cat}
                        </button>
                    ))}
                </motion.div>

                {/* Premium Slider */}
                {loadingProjects ? (
                    <div className='w-full max-w-4xl mx-auto h-[600px] bg-white/5 rounded-3xl animate-pulse border border-white/5' />
                ) : filteredProjects.length === 0 ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='text-center py-32 text-gray-500'>
                        <FaImage size={60} className='mx-auto mb-6 opacity-20' />
                        <p className='text-xl'>No projects found in this category.</p>
                    </motion.div>
                ) : (
                    <div className='relative w-full max-w-5xl mx-auto h-[650px] md:h-[600px] flex items-center justify-center perspective-[2000px] pt-4 md:pt-0'>
                        
                        <AnimatePresence initial={false} custom={direction}>
                            {currentProject && (
                                <motion.div
                                    key={page}
                                    custom={direction}
                                    variants={slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 }, rotateY: { duration: 0.4 } }}
                                    drag="x"
                                    dragConstraints={{ left: 0, right: 0 }}
                                    dragElastic={1}
                                    onDragEnd={(e, { offset, velocity }) => {
                                        const swipe = swipePower(offset.x, velocity.x);
                                        if (swipe < -swipeConfidenceThreshold) paginate(1);
                                        else if (swipe > swipeConfidenceThreshold) paginate(-1);
                                    }}
                                    className='absolute w-full max-w-4xl h-[600px] md:h-[550px] bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-grab active:cursor-grabbing'
                                >
                                    {/* Image Section */}
                                    <div className='w-full md:w-1/2 h-52 md:h-full shrink-0 relative overflow-hidden bg-black/40'>
                                        {currentProject.image ? (
                                            <img src={currentProject.image} alt={currentProject.title} className='w-full h-full object-cover pointer-events-none' />
                                        ) : (
                                            <div className='w-full h-full flex items-center justify-center text-gray-700 pointer-events-none'>
                                                <FaImage size={60} />
                                            </div>
                                        )}
                                        <div className='absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#050505]/90 via-transparent to-transparent opacity-80' />
                                    </div>

                                    {/* Content Section */}
                                    <div className='w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative'>
                                        <div className='absolute top-6 right-6 md:top-8 md:right-8'>
                                            <span className='px-3 md:px-4 py-1.5 text-[10px] md:text-xs font-bold tracking-widest uppercase bg-black/50 backdrop-blur-md text-[#00bf8f] border border-[#00bf8f]/30 rounded-full'>
                                                {currentProject.category}
                                            </span>
                                        </div>

                                        <h3 className='text-3xl md:text-4xl font-black text-white mb-4 mt-4 md:mt-0'>
                                            {currentProject.title}
                                        </h3>
                                        
                                        <p className='text-gray-400 text-base md:text-lg mb-8 leading-relaxed line-clamp-4'>
                                            {currentProject.description}
                                        </p>
                                        
                                        <div className='flex flex-wrap gap-2 mb-10'>
                                            {currentProject.techStack?.map(tech => (
                                                <span key={tech} className='px-3 py-1.5 text-xs font-medium bg-white/5 text-gray-300 rounded border border-white/10'>
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>

                                        <div className='flex items-center gap-4 mt-auto'>
                                            {currentProject.github && currentProject.github !== '#' && (
                                                <a href={currentProject.github} target='_blank' rel='noopener noreferrer' 
                                                   className='w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors z-20'>
                                                    <FaGithub size={20} />
                                                </a>
                                            )}
                                            {currentProject.liveDemo && (
                                                <a href={currentProject.liveDemo} target='_blank' rel='noopener noreferrer'
                                                   className='flex-1 h-12 rounded-full bg-gradient-to-r from-[#0b7def] to-[#00bf8f] flex items-center justify-center gap-2 text-white font-semibold hover:shadow-[0_0_20px_rgba(11,125,239,0.4)] transition-all z-20'>
                                                    View Live Demo
                                                    <FaExternalLinkAlt size={14} />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Navigation Arrows */}
                        {filteredProjects.length > 1 && (
                            <>
                                <button className="hidden md:flex absolute left-0 md:-left-12 z-20 w-14 h-14 rounded-full bg-black/50 border border-white/10 items-center justify-center text-white backdrop-blur-md hover:bg-white/10 hover:scale-110 transition-all focus:outline-none"
                                        onClick={() => paginate(-1)}>
                                    <FaChevronLeft size={24} className="-ml-1" />
                                </button>
                                <button className="hidden md:flex absolute right-0 md:-right-12 z-20 w-14 h-14 rounded-full bg-black/50 border border-white/10 items-center justify-center text-white backdrop-blur-md hover:bg-white/10 hover:scale-110 transition-all focus:outline-none"
                                        onClick={() => paginate(1)}>
                                    <FaChevronRight size={24} className="-mr-1" />
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </section>
    )
}

export default Projects
