import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaUserPlus } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { PortfolioContext } from '../context/PortfolioContext';

const glowVariants = {
    initial: { scale: 1, y: 0, filter: "drop-shadow(0 0 0 rgba(0,0,0,0))" },
    hover: {
        scale: 1.02, y: -3,
        filter: "drop-shadow(0 0 8px rgba(13,88,204,0.9)) drop-shadow(0 0 18px rgba(16,185,129,0.8))",
        transition: { type: "spring", stiffness: 300, damping: 15 }
    },
}

const About = () => {
    const { profile, loadingProfile } = useContext(PortfolioContext);

    // Dynamic data mapping right from the DB context
    const info = {
        name:         profile?.name         || "",
        location:     profile?.location     || "",
        email:        profile?.email        || "",
        availability: profile?.availability || "",
        about:        profile?.about        || "",
        professionalTitle: profile?.professionalTitle || "",
        profileImage: profile?.profileImage || null,
        github:    profile?.github    || "",
        linkedin:  profile?.linkedin  || "",
        whatsapp:  profile?.whatsapp  || "",
    }

    const personalInfo = [
        { label: "Name",         value: info.name },
        { label: "Location",     value: info.location },
        { label: "Email",        value: info.email },
        { label: "Availability", value: info.availability },
    ].filter(item => item.value !== "");

    const educationList = profile?.education || [];
    
    // Check if we actually have enough data to render the full profile
    const hasData = profile && profile.name;

    return (
        <section id='about' className='w-full min-h-screen bg-black relative overflow-hidden py-20 flex flex-col justify-center'>
            <div className='absolute inset-0 pointer-events-none'>
                <div className='absolute top-20 -left-32 w-[60vw] h-[60vh] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-20 blur-[120px]' />
                <div className='absolute bottom-20 -right-32 w-[60vw] h-[60vh] rounded-full bg-gradient-to-r from-[#4b3aff] via-[#00bf8f] to-[#1cd8d2] opacity-15 blur-[120px]' />
            </div>

            <div className='relative z-10 max-w-6xl mx-auto px-4 w-full'>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }} viewport={{ once: true }} className='text-center mb-16'>
                    <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4'>
                        About <span className='bg-clip-text'>Me</span>
                    </h2>
                </motion.div>

                {loadingProfile ? (
                     <div className='w-full max-w-4xl mx-auto h-[400px] bg-white/5 rounded-3xl animate-pulse border border-white/5' />
                ) : !hasData ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='text-center py-20 text-gray-500 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 max-w-2xl mx-auto'>
                        <FaUserPlus size={50} className='mx-auto mb-6 opacity-30 text-[#0b7def]' />
                        <p className='text-xl font-medium text-white mb-2'>Profile Not Configured</p>
                        <p className='text-gray-400'>Upload your credentials via the Admin Dashboard to activate this section.</p>
                    </motion.div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-start'>
                        {/* Left — Image & Info */}
                        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }}
                            className='flex flex-col items-center md:items-start'>
                            
                            {info.profileImage && (
                                <div className='relative mb-8'>
                                    <div className='w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden border-4 border-[#0b7def]/30 shadow-2xl transition-all duration-300'>
                                        <img src={info.profileImage} alt={info.name} className='w-full h-full object-cover' />
                                    </div>
                                    <div className='absolute inset-0 rounded-full bg-gradient-to-tr from-[#0b7def]/20 to-[#00bf8f]/20' />
                                </div>
                            )}

                            {personalInfo.length > 0 && (
                                <div className='grid grid-cols-2 gap-4 w-full max-w-md mb-8'>
                                    {personalInfo.map((item, i) => (
                                        <motion.div key={item.label}
                                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }} viewport={{ once: true }}
                                            className='bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4'>
                                            <p className='text-gray-400 text-sm mb-1'>{item.label}</p>
                                            <p className='text-white wrap-anywhere font-medium text-xs sm:text-sm'>{item.value}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            )}

                            {/* Social Links */}
                            <div className='flex flex-wrap gap-4'>
                                {[
                                    { href: info.github,   Icon: FaGithub,       color: "#ffffff" },
                                    { href: info.linkedin, Icon: FaLinkedin,     color: "#0077B5" },
                                    { href: info.whatsapp, Icon: IoLogoWhatsapp, color: "#25D366" },
                                    { href: info.email ? `mailto:${info.email}` : "", Icon: MdEmail, color: "#4285f4" },
                                ].filter(s => s.href).map(({ href, Icon, color }) => (
                                    <motion.a key={href} href={href} target='_blank' rel='noopener noreferrer'
                                        variants={glowVariants} initial='initial' whileHover='hover'
                                        className='border p-3 border-gray-300 bg-gray-900 rounded-full transition-colors'>
                                        <Icon style={{ color }} />
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>

                        {/* Right — Content */}
                        <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }} viewport={{ once: true }}
                            className='space-y-8'>
                            
                            {(info.professionalTitle || info.about) && (
                                <div className='bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8'>
                                    {info.professionalTitle && <h3 className='text-xl md:text-2xl font-bold text-white mb-4'>{info.professionalTitle}</h3>}
                                    {info.about && <p className='text-sm md:text-base text-gray-300 leading-relaxed'>{info.about}</p>}
                                </div>
                            )}

                            {educationList.length > 0 && (
                                <div className='bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8'>
                                    <h3 className='text-xl font-bold text-white mb-4'>Education</h3>
                                    <div className='space-y-4'>
                                        {educationList.map((edu, i) => (
                                            <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.4, delay: i * 0.1 }} viewport={{ once: true }}
                                                className='flex gap-4'>
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
                            )}
                        </motion.div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default About
