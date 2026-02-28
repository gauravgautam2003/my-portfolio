import React from 'react'
import { motion } from 'framer-motion'
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import avator from "../assets/avator.png"

const About = () => {
    const personalInfo = [
        { label: "Name", value: "Gaurav Gautam" },
        { label: "Location", value: "India" },
        { label: "Email", value: "gauravgautam9865@gmail.com" },
        { label: "Availability", value: "Open to Work" },
    ]
    const glowVariants = {
        initial: {
            scale: 1, y: 0,
            filter: "drop-shadow(0 0 0 rgba(0, 0, 0, 0))"
        },
        hover: {
            scale: 1.02, y: -3,
            filter: "drop-shadow(0 0 8px rgba(13, 88, 204, 0.9)) drop-shadow(0 0 18px rgba(16, 185, 129, 0.8))",
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 15
            }
        },
        tap: {
            scale: 95,
            y: 0,
            transition: {
                duration: 0.08
            }
        }
    }


    const education = [
        {
            degree: "Bachelor of Technology",
            field: "Computer Science & Engineering",
            year: "2023 - 2027",
            institution: "Institute of Technology"
        },
    ]

    return (
        <section id='about' className='w-full min-h-screen bg-black relative overflow-hidden py-20'>
            {/* Background Effects */}
            <div className='absolute inset-0 pointer-events-none'>
                <div className='absolute top-20 -left-32 w-[60vw] h-[60vh] rounded-full bg-linear-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-20 blur-[120px]' />
                <div className='absolute bottom-20 -right-32 w-[60vw] h-[60vh] rounded-full bg-linear-to-r from-[#4b3aff] via-[#00bf8f] to-[#1cd8d2] opacity-15 blur-[120px]' />
            </div>

            <div className='relative z-10 max-w-6xl mx-auto px-4'>
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className='text-center mb-16'
                >
                    <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2'>
                        About <span className='bg-clip-text '>Me</span>
                    </h2>
                    <div className='max-w-40 h-1 bg-gradient-to-r from-[#0b7def] to-[#00bf8f] mx-auto rounded-full' />
                </motion.div>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-start'>
                    {/* Left Column - Profile Image & Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className='flex flex-col items-center lg:items-start'
                    >
                        <div className='relative mb-8'>
                            <div className='w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden border-4 border-[#0b7def]/30 shadow-2xl'>
                                <img
                                    src={avator}
                                    alt="Gaurav Gautam"
                                    className='w-full h-full object-cover'
                                />
                            </div>
                            <div className='absolute inset-0 rounded-full bg-linear-to-tr from-[#0b7def]/20 to-[#00bf8f]/20' />
                        </div>

                        {/* Personal Info Cards */}
                        <div className='grid grid-cols-2 gap-4 w-full max-w-md mb-8'>
                            {personalInfo.map((info, index) => (
                                <motion.div
                                    key={info.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                                    viewport={{ once: true }}
                                    className='bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4'
                                >
                                    <p className='text-gray-400 text-sm mb-1'>{info.label}</p>
                                    <p className='text-white wrap-anywhere font-medium'>{info.value}</p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Social Links */}
                        <div className='flex gap-4'>
                            <motion.a
                                variants={glowVariants}
                                initial="initial"
                                whileHover="hover"
                                whileTap="tab"
                                href="https://github.com/gauravgautam2003"
                                target='_blank'
                                rel="noopener noreferrer"
                                className=' border p-3 border-gray-300 bg-gray-900 rounded-full transition-colors'
                            >
                                <FaGithub style={{ color: "#ffffff" }} />

                            </motion.a>
                            <motion.a
                                variants={glowVariants}
                                initial="initial"
                                whileHover="hover"
                                whileTap="tab"
                                href="https://www.linkedin.com/in/gaurav-gautam-a850362a4/"
                                target='_blank'
                                rel="noopener noreferrer"
                                className=' border p-3 border-gray-300 bg-gray-900 rounded-full transition-colors'
                            >
                                <FaLinkedin style={{ color: "#0077B5" }} />
                            </motion.a>
                            <motion.a
                            
                                variants={glowVariants}
                                initial="initial"
                                whileHover="hover"
                                whileTap="tab"
                                href="https://whatsapp.com/channel/0029VbBj5b5GehEPNFo3nT2d"
                                target='_blank'
                                rel="noopener noreferrer"
                                className=' border p-3 border-gray-300 bg-gray-900 rounded-full transition-colors'
                            >
                                <IoLogoWhatsapp style={{ color: "#25D366" }} />
                            </motion.a>
                            <motion.a
                                variants={glowVariants}
                                initial="initial"
                                whileHover="hover"
                                whileTap="tab"
                                href="mailto:gauravgautam9865@gmail.com"
                                className=' border p-3 border-gray-300 bg-gray-900 rounded-full transition-colors'                      >
                                <MdEmail style={{ color: "4285f4" }} />
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* Right Column - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                        className='space-y-8'
                    >
                        {/* About Text */}
                        <div className='bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8'>
                            <h3 className='text-2xl font-bold text-white mb-4'>
                                Full Stack Developer
                            </h3>
                            <p className='text-gray-300 leading-relaxed mb-4'>
                                I'm a passionate Full Stack Developer with expertise in building modern, scalable, and lightning-fast web applications. I specialize in the MERN stack and love turning complex ideas into seamless, high-impact digital experiences.
                            </p>
                            <p className='text-gray-300 leading-relaxed'>
                                With a strong foundation in both frontend and backend development, I create responsive user interfaces and robust server-side applications. I'm constantly learning new technologies and staying updated with the latest industry trends.
                            </p>
                        </div>

                        {/* Education */}
                        <div className='bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8'>
                            <h3 className='text-xl font-bold text-white mb-4'>Education</h3>
                            <div className='space-y-4'>
                                {education.map((edu, index) => (
                                    <motion.div
                                        key={edu.degree}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className='flex gap-4'
                                    >
                                        <div className='w-3 h-3 rounded-full bg-[#0b7def] mt-2 shrink-0' />
                                        <div>
                                            <h4 className='text-white font-semibold'>{edu.degree}</h4>
                                            <p className='text-gray-400 text-sm'>{edu.field}</p>
                                            <p className='text-[#00bf8f] text-sm'>{edu.institution} • {edu.year}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default About
