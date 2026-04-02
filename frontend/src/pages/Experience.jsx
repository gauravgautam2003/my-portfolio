import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import { FaBriefcase, FaGraduationCap, FaCalendarAlt } from "react-icons/fa"
import { PortfolioContext } from '../context/PortfolioContext'

// Fallback data
const DEFAULT_WORK = [{
    _id: 'w1', type: 'work',
    title: "Full Stack Developer (MERN Stack)", company: "Self-Employed",
    location: "Remote", period: "2025 - 2026",
    description: "Built custom web applications for small businesses. Created e-commerce platforms, portfolio websites, and CMS solutions using modern technologies.",
    technologies: ["React", "Node.js", "MongoDB", "JavaScript", "HTML", "CSS", "Git", "REST APIs", "Express.js"]
}]
const DEFAULT_EDUCATION = [{
    _id: 'e1', type: 'education',
    title: "Bachelor of Technology in Computer Science", company: "Dr. A.P.J. Abdul Kalam Technical University, Lucknow",
    location: "India", period: "2023 - 2027 (Expected)",
    description: "Pursuing B.Tech with focus on Software Engineering and Web Technologies.",
    technologies: ["Computer Science", "Data Structures", "Algorithms", "Database Systems", "Operating Systems"]
}]

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } }
const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 12 } },
    hover: { scale: 1.02, transition: { duration: 0.3 } }
}

const TimelineCard = ({ item, index, accentColor }) => (
    <motion.div variants={cardVariants} whileHover="hover"
        className={`relative flex flex-col md:flex-row gap-6 mb-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
        {/* Dot */}
        <div className='absolute left-4 md:left-1/2 w-4 h-4 rounded-full -translate-x-1/2 mt-2 z-10'
            style={{ background: `linear-gradient(135deg, ${accentColor}, #1cd8d2)` }}>
            <div className='absolute inset-0 rounded-full animate-ping opacity-30'
                style={{ backgroundColor: accentColor }} />
        </div>
        {/* Card */}
        <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
            <div className='bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition-colors hover:border-opacity-30'
                style={{ '--accent': accentColor }}>
                <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 border text-sm font-medium'
                    style={{ backgroundColor: `${accentColor}15`, borderColor: `${accentColor}30`, color: accentColor }}>
                    <FaCalendarAlt size={11} /> {item.period}
                </div>
                <h4 className='text-xl font-bold text-white mb-1'>{item.title}</h4>
                <p className='font-medium mb-1' style={{ color: accentColor }}>{item.company}</p>
                <p className='text-gray-400 text-sm mb-3'>{item.location}</p>
                <p className='text-gray-400 mb-4 leading-relaxed text-sm'>{item.description}</p>
                <div className='flex flex-wrap gap-2'>
                    {item.technologies?.map(tech => (
                        <span key={tech} className='px-2.5 py-0.5 text-xs bg-white/10 text-gray-300 rounded-full border border-white/10'>
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </div>
        <div className='hidden md:block md:w-1/2' />
    </motion.div>
)

const Experience = () => {
    const { work, education, loadingExperiences } = useContext(PortfolioContext)

    const displayWork = work?.length ? work : DEFAULT_WORK
    const displayEdu  = education?.length ? education : DEFAULT_EDUCATION

    return (
        <section id='experience' className='w-full min-h-screen bg-black relative overflow-hidden'>
            <div className='absolute inset-0'>
                <div className='absolute -top-32 -left-32 w-[70vw] md:w-[40vw] h-[70vh] md:h-[40vh] max-w-[500px] max-h-[500px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-20 blur-[150px] animate-pulse' />
                <div className='absolute bottom-0 right-0 w-[70vw] md:w-[40vw] h-[70vh] md:h-[40vh] max-w-[500px] max-h-[500px] rounded-full bg-gradient-to-r from-[#4b3aff] via-[#00bf8f] to-[#1cd8d2] opacity-20 blur-[150px] animate-pulse delay-500' />
            </div>

            <div className='relative z-10 max-w-5xl mx-auto px-4 py-20'>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }} viewport={{ once: true }} className='text-center mb-16'>
                    <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2'>My Experience</h2>
                    <div className='max-w-50 h-1 bg-gradient-to-r from-[#0b7def] to-[#00bf8f] mx-auto rounded-full' />
                    <p className='text-gray-400 mt-4 max-w-2xl mx-auto'>My professional journey and educational background</p>
                </motion.div>

                {loadingExperiences ? (
                    <div className='space-y-6'>
                        {[1, 2].map(i => <div key={i} className='h-48 bg-white/5 rounded-2xl animate-pulse' />)}
                    </div>
                ) : (
                    <div className='relative'>
                        {/* Timeline line */}
                        <div className='absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#0b7def] via-[#00bf8f] to-[#1cd8d2] opacity-30' />

                        {/* Work Experience */}
                        <motion.div variants={containerVariants} initial="hidden"
                            whileInView="visible" viewport={{ once: true, margin: "-100px" }} className='mb-12'>
                            <motion.div variants={cardVariants} className='flex items-center gap-3 mb-8'>
                                <div className='w-10 h-10 rounded-full bg-gradient-to-r from-[#0b7def] to-[#00bf8f] flex items-center justify-center'>
                                    <FaBriefcase className='text-white' size={18} />
                                </div>
                                <h3 className='text-2xl font-bold text-white'>Work Experience</h3>
                            </motion.div>
                            {displayWork.map((exp, i) => (
                                <TimelineCard key={exp._id} item={exp} index={i} accentColor='#0b7def' />
                            ))}
                        </motion.div>

                        {/* Education */}
                        <motion.div variants={containerVariants} initial="hidden"
                            whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
                            <motion.div variants={cardVariants} className='flex items-center gap-3 mb-8'>
                                <div className='w-10 h-10 rounded-full bg-gradient-to-r from-[#00bf8f] to-[#1cd8d2] flex items-center justify-center'>
                                    <FaGraduationCap className='text-white' size={18} />
                                </div>
                                <h3 className='text-2xl font-bold text-white'>Education</h3>
                            </motion.div>
                            {displayEdu.map((edu, i) => (
                                <TimelineCard key={edu._id} item={edu} index={i} accentColor='#00bf8f' />
                            ))}
                        </motion.div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default Experience
