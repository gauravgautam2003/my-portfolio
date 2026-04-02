import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import { FaBriefcase, FaGraduationCap, FaCalendarAlt, FaMapMarkerAlt, FaBuilding, FaRegFolderOpen } from "react-icons/fa"
import { PortfolioContext } from '../context/PortfolioContext'

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } }
const cardVariants = {
    hidden: { opacity: 0, x: -30, filter: "blur(10px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 80, damping: 15 } }
}

const TimelineCard = ({ item, isLast, accentColor, glowColor }) => (
    <motion.div variants={cardVariants} className='relative flex flex-col md:flex-row gap-6 md:gap-12 group'>
        
        {/* Desktop Date/Company Column (Left) */}
        <div className='hidden md:flex flex-col items-end w-1/3 pt-6 text-right z-10'>
            <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold tracking-wide backdrop-blur-md mb-2 transition-colors duration-300'
                style={{ backgroundColor: `${accentColor}10`, borderColor: `${accentColor}40`, color: accentColor, boxShadow: `0 0 20px ${accentColor}15` }}>
                <FaCalendarAlt size={12} /> {item.period}
            </div>
            <h4 className='text-base font-semibold text-white group-hover:text-gray-200 transition-colors'>{item.company}</h4>
            <span className='text-xs text-gray-500 mt-1 flex items-center justify-end gap-1.5'>
                {item.location} <FaMapMarkerAlt size={12} className="opacity-70" />
            </span>
        </div>

        {/* Center Timeline Line & Node */}
        <div className='relative hidden md:flex flex-col items-center'>
            <div className='w-12 h-12 rounded-full border-4 border-[#050505] flex items-center justify-center z-20 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12 shadow-2xl mt-4'
                style={{ background: `linear-gradient(135deg, ${accentColor}, ${glowColor})`, boxShadow: `0 0 30px ${accentColor}60` }}>
                {item.type === 'work' ? <FaBriefcase size={16} className='text-white' /> : <FaGraduationCap size={16} className='text-white' />}
            </div>
            {!isLast && (
                <div className='absolute top-16 bottom-[-3rem] w-1 bg-gradient-to-b opacity-20 group-hover:opacity-60 transition-opacity duration-300'
                    style={{ backgroundImage: `linear-gradient(to bottom, ${accentColor}, transparent)` }} />
            )}
        </div>

        {/* Mobile period & node (hidden on desktop) */}
        <div className='md:hidden flex items-center gap-4 z-10'>
            <div className='w-10 h-10 shrink-0 rounded-full flex items-center justify-center border-2 border-[#050505] shadow-lg'
                style={{ background: `linear-gradient(135deg, ${accentColor}, ${glowColor})`, boxShadow: `0 0 20px ${accentColor}50` }}>
                {item.type === 'work' ? <FaBriefcase size={14} className='text-white' /> : <FaGraduationCap size={14} className='text-white' />}
            </div>
            <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold tracking-wider'
                style={{ backgroundColor: `${accentColor}10`, borderColor: `${accentColor}40`, color: accentColor }}>
                <FaCalendarAlt size={10} /> {item.period}
            </div>
        </div>

        {/* Content Card (Right) */}
        <div className='md:w-2/3 pb-12 z-10'>
            <div className='bg-white/[0.02] backdrop-blur-2xl border border-white/5 rounded-3xl p-6 md:p-8 transition-all duration-500 hover:border-white/20 hover:-translate-y-1 relative overflow-hidden group-hover:shadow-2xl'
                 style={{ '--hover-glow': `${accentColor}20` }}>
                 
                {/* Subtle internal glow on hover */}
                <div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none'
                     style={{ background: `radial-gradient(circle at top right, var(--hover-glow), transparent 70%)` }} />

                <div className='relative z-10'>
                    <h3 className='text-xl md:text-2xl font-bold text-white mb-2 tracking-tight'>{item.title}</h3>
                    
                    {/* Mobile Company/Location (hidden on desktop) */}
                    <div className='md:hidden mb-4 space-y-1'>
                        <p className='text-sm font-semibold' style={{ color: accentColor }}>{item.company}</p>
                        <p className='text-xs text-gray-500 flex items-center gap-1'><FaMapMarkerAlt size={12} /> {item.location}</p>
                    </div>

                    <p className='text-gray-400 text-sm leading-relaxed mb-6'>
                        {item.description}
                    </p>
                    
                    {/* Tech Stack */}
                    {item.technologies && item.technologies.length > 0 && (
                        <div className='flex flex-wrap gap-2 pt-2'>
                            {item.technologies.map(tech => (
                                <span key={tech} className='px-3 py-1 text-xs font-medium bg-white/5 text-gray-300 rounded-lg border border-white/10 group-hover:border-white/20 transition-colors'>
                                    {tech}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    </motion.div>
)

const Experience = () => {
    const { work, education, loadingExperiences } = useContext(PortfolioContext)

    // Fallbacks removed — directly mapping from database variables
    const displayWork = work || []
    const displayEdu  = education || []
    
    const isEmpty = displayWork.length === 0 && displayEdu.length === 0;

    return (
        <section id='experience' className='w-full min-h-screen bg-[#050505] relative py-24 flex flex-col justify-center'>
            {/* Ambient Background */}
            <div className='fixed inset-0 pointer-events-none overflow-hidden'>
                <div className='absolute -top-[20%] -right-[10%] w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] rounded-full bg-[#0b7def] opacity-[0.05] blur-[150px]' />
                <div className='absolute top-[40%] -left-[10%] w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full bg-[#1cd8d2] opacity-[0.05] blur-[120px]' />
            </div>

            <div className='relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full'>
                
                {/* Header Section */}
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: true, margin: "-100px" }} 
                    className='text-center mb-16'>
                    <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 mb-4'>
                        Experience
                    </h2>
                    <p className='text-gray-400 text-base max-w-2xl mx-auto'>
                        A timeline of my academic background and professional journey in the tech industry.
                    </p>
                </motion.div>

                {loadingExperiences ? (
                    <div className='max-w-4xl mx-auto space-y-8'>
                        {[1, 2, 3].map(i => <div key={i} className='h-64 bg-white/5 rounded-3xl animate-pulse border border-white/5' />)}
                    </div>
                ) : isEmpty ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='text-center py-24 text-gray-500 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 max-w-3xl mx-auto'>
                        <FaRegFolderOpen size={60} className='mx-auto mb-6 opacity-30 text-[#0b7def]' />
                        <p className='text-xl font-medium text-white mb-2'>No Experience Listed Yet</p>
                        <p className='text-gray-400'>Please add your work history or education credentials within the Admin Panel.</p>
                    </motion.div>
                ) : (
                    <div className='max-w-5xl mx-auto relative'>
                        
                        {/* Work Experience Section */}
                        {displayWork.length > 0 && (
                            <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className='mb-20'>
                                <div className='flex items-center justify-center md:justify-start gap-4 mb-12'>
                                    <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-[#0b7def] to-[#00bf8f] flex items-center justify-center shadow-[0_0_30px_rgba(11,125,239,0.3)]'>
                                        <FaBuilding className='text-white' size={20} />
                                    </div>
                                    <h3 className='text-2xl md:text-3xl font-bold text-white tracking-tight'>Work Experience</h3>
                                </div>
                                
                                <div className="relative">
                                    {displayWork.map((exp, i) => (
                                        <TimelineCard key={exp._id} item={{...exp, type: 'work'}} isLast={i === displayWork.length - 1} accentColor='#0b7def' glowColor='#00bf8f' />
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Education Section */}
                        {displayEdu.length > 0 && (
                            <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
                                <div className='flex items-center justify-center md:justify-start gap-4 mb-12'>
                                    <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-[#1cd8d2] to-[#00bf8f] flex items-center justify-center shadow-[0_0_30px_rgba(28,216,210,0.3)]'>
                                        <FaGraduationCap className='text-white' size={20} />
                                    </div>
                                    <h3 className='text-2xl md:text-3xl font-bold text-white tracking-tight'>Education</h3>
                                </div>
                                
                                <div className="relative">
                                    {displayEdu.map((edu, i) => (
                                        <TimelineCard key={edu._id} item={{...edu, type: 'education'}} isLast={i === displayEdu.length - 1} accentColor='#1cd8d2' glowColor='#00bf8f' />
                                    ))}
                                </div>
                            </motion.div>
                        )}
                        
                    </div>
                )}
            </div>
        </section>
    )
}

export default Experience
