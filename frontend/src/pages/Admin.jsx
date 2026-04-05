import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaUser, FaProjectDiagram, FaBriefcase, FaCode, FaChevronRight } from 'react-icons/fa'
import { ToastContainer } from 'react-toastify'
import { Link } from 'react-router-dom'
import ProfileForm from '../forms/ProfileForm'
import ProjectForm from '../forms/ProjectForm'
import ExperienceFrom from '../forms/ExperienceFrom'
import SkillsForm from '../forms/SkillsForm'

const TABS = [
    { id: 'profile',    label: 'Profile',    Icon: FaUser,           color: '#0b7def' },
    { id: 'projects',   label: 'Projects',   Icon: FaProjectDiagram, color: '#00bf8f' },
    { id: 'experience', label: 'Experience', Icon: FaBriefcase,      color: '#f08409' },
    { id: 'skills',     label: 'Skills',     Icon: FaCode,           color: '#a855f7' },
]

const Admin = () => {
    const [activeTab, setActiveTab] = useState('profile')

    const current = TABS.find(t => t.id === activeTab)

    return (
        <div className='min-h-screen bg-black relative overflow-hidden'>
            <ToastContainer position='top-right' autoClose={3000} theme='dark' />

            {/* Background blobs */}
            <div className='absolute inset-0 pointer-events-none'>
                <div className='absolute -top-40 -left-40 w-[50vw] h-[50vh] rounded-full bg-gradient-to-r from-[#0b7def]/20 to-[#00bf8f]/10 blur-[120px]' />
                <div className='absolute -bottom-40 -right-40 w-[50vw] h-[50vh] rounded-full bg-gradient-to-r from-[#a855f7]/15 to-[#f08409]/10 blur-[120px]' />
            </div>

            <div className='relative z-10 max-w-5xl mx-auto px-4 py-16'>

                {/* Header */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
                    className='mb-10'>
                    <div className='flex items-center gap-2 text-gray-500 text-sm mb-2'>
                        <span>Dashboard</span>
                        <FaChevronRight size={10} />
                        <span style={{ color: current.color }}>{current.label}</span>
                    </div>
                    <h1 className='text-3xl md:text-4xl font-bold text-white'>
                        Portfolio <span className='bg-clip-text text-transparent bg-gradient-to-r from-[#0b7def] to-[#00bf8f]'>Admin</span>
                    </h1>
                    <p className='text-gray-500 mt-1 text-sm'>Manage your portfolio content from here</p>
                </motion.div>

                <div className='flex flex-col lg:flex-row gap-6 items-start'>

                    {/* ── Sidebar ── */}
                    <motion.aside initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                        className='w-full lg:w-56 shrink-0'>
                        <div className='bg-white/3 backdrop-blur-sm border border-white/10 rounded-2xl p-2 space-y-1'>
                            {TABS.map(({ id, label, Icon, color }) => (
                                <button key={id} onClick={() => setActiveTab(id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${activeTab === id ? 'text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                                    style={activeTab === id ? { backgroundColor: `${color}18`, color } : {}}>
                                    <Icon size={15} style={{ color: activeTab === id ? color : undefined }} />
                                    {label}
                                    {activeTab === id && (
                                        <motion.div layoutId='activeTab'
                                            className='ml-auto w-1 h-4 rounded-full'
                                            style={{ backgroundColor: color }} />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Quick Nav */}
                        <div className='mt-4 bg-white/3 border border-white/10 rounded-2xl p-4'>
                            <p className='text-gray-500 text-xs font-semibold mb-3 uppercase tracking-widest px-1'>Quick Links</p>
                            <div className='space-y-1'>
                                {['/', '/about', '/projects', '/skills', '/experience', '/contact'].map(path => (
                                    <Link key={path} to={path}
                                        className='group flex items-center justify-between px-2 py-2 rounded-lg text-gray-400 hover:text-[#0b7def] hover:bg-white/5 text-sm transition-all duration-300'>
                                        <span className='flex items-center gap-2 relative'>
                                            <span className='w-1 h-1 rounded-full bg-gray-600 group-hover:bg-[#0b7def] transition-colors'></span>
                                            {path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </motion.aside>

                    {/* ── Main Panel ── */}
                    <div className='flex-1 min-w-0'>
                        <AnimatePresence mode='wait'>
                            <motion.div key={activeTab}
                                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
                                transition={{ duration: 0.25 }}
                                className='bg-white/3 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8'>

                                {/* Tab Header */}
                                <div className='flex items-center gap-3 mb-8 pb-5 border-b border-white/10'>
                                    <div className='w-10 h-10 rounded-xl flex items-center justify-center'
                                        style={{ backgroundColor: `${current.color}20` }}>
                                        <current.Icon size={18} style={{ color: current.color }} />
                                    </div>
                                    <div>
                                        <h2 className='text-white font-bold text-lg'>{current.label}</h2>
                                        <p className='text-gray-500 text-xs'>
                                            {activeTab === 'profile'    && 'Update your personal info & photo'}
                                            {activeTab === 'projects'   && 'Add, edit or remove your projects'}
                                            {activeTab === 'experience' && 'Manage work & education timeline'}
                                            {activeTab === 'skills'     && 'Add or remove your tech skills'}
                                        </p>
                                    </div>
                                </div>

                                {/* Form Content */}
                                {activeTab === 'profile'    && <ProfileForm />}
                                {activeTab === 'projects'   && <ProjectForm />}
                                {activeTab === 'experience' && <ExperienceFrom />}
                                {activeTab === 'skills'     && <SkillsForm />}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin
