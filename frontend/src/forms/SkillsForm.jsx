import React, { useState, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaPlus, FaTrash } from 'react-icons/fa'
import { PortfolioContext } from '../context/PortfolioContext'

const SKILL_CATEGORIES = ['Frontend Development', 'Backend Development', 'Tools & Technologies']

const QUICK_COLORS = [
    '#61DAFB', '#F7DF1E', '#3178C6', '#06B6D4', '#0055FF', '#E34F26',
    '#1572B6', '#339933', '#ffffff', '#47A248', '#F05032', '#F24E1E',
    '#007ACC', '#0b7def', '#00bf8f', '#f08409',
]

const SkillsForm = () => {
    const { skills, skillCategories, createSkill, deleteSkill, loadingSkills } = useContext(PortfolioContext)

    const [form, setForm] = useState({ name: '', color: '#61DAFB', category: 'Frontend Development' })
    const [saving, setSaving] = useState(false)
    const [deleting, setDeleting] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!form.name) return
        setSaving(true)
        try {
            await createSkill(form)
            setForm(p => ({ ...p, name: '' }))
        } finally { setSaving(false) }
    }

    const handleDelete = async (id) => {
        setDeleting(id)
        try { await deleteSkill(id) }
        finally { setDeleting(null) }
    }

    return (
        <div className='space-y-8'>
            {/* ── Add Skill Form ── */}
            <form onSubmit={handleSubmit} className='space-y-4'>
                <h3 className='text-white font-semibold'>➕ Add New Skill</h3>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                        <label className='block text-gray-400 text-sm mb-1'>Skill Name *</label>
                        <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required
                            placeholder='e.g. React.js'
                            className='w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:border-[#0b7def]/50 focus:outline-none text-sm' />
                    </div>
                    <div>
                        <label className='block text-gray-400 text-sm mb-1'>Category *</label>
                        <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                            className='w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:border-[#0b7def]/50 focus:outline-none text-sm'>
                            {SKILL_CATEGORIES.map(c => <option key={c} value={c} className='bg-gray-900'>{c}</option>)}
                        </select>
                    </div>
                </div>

                {/* Color Picker */}
                <div>
                    <label className='block text-gray-400 text-sm mb-2'>Icon Color</label>
                    <div className='flex items-center gap-3 flex-wrap'>
                        {QUICK_COLORS.map(c => (
                            <button key={c} type='button' onClick={() => setForm(p => ({ ...p, color: c }))}
                                className={`w-7 h-7 rounded-full border-2 transition-transform hover:scale-110 ${form.color === c ? 'border-white scale-110' : 'border-transparent'}`}
                                style={{ backgroundColor: c }} />
                        ))}
                        {/* Custom color input */}
                        <div className='flex items-center gap-2 ml-2'>
                            <input type='color' value={form.color} onChange={e => setForm(p => ({ ...p, color: e.target.value }))}
                                className='w-7 h-7 rounded-full border-0 cursor-pointer bg-transparent' />
                            <span className='text-gray-500 text-xs font-mono'>{form.color}</span>
                        </div>
                    </div>
                    {/* Preview */}
                    <div className='mt-3 inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl'>
                        <div className='w-5 h-5 rounded-full' style={{ backgroundColor: form.color }} />
                        <span className='text-sm' style={{ color: form.color }}>{form.name || 'Skill Preview'}</span>
                    </div>
                </div>

                <motion.button type='submit' disabled={saving}
                    whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                    className='w-full py-3 bg-gradient-to-r from-[#0b7def] to-[#00bf8f] text-white font-semibold rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 transition-all'>
                    {saving
                        ? <><motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                            className='w-4 h-4 border-2 border-white border-t-transparent rounded-full' />Adding...</>
                        : <><FaPlus size={12} />Add Skill</>}
                </motion.button>
            </form>

            {/* ── Skills List by Category ── */}
            <div className='space-y-6'>
                <h3 className='text-white font-semibold'>
                    📋 All Skills <span className='text-gray-500 text-sm font-normal'>({skills.length})</span>
                </h3>

                {loadingSkills
                    ? <p className='text-gray-500 text-center py-6'>Loading...</p>
                    : skillCategories.length === 0 || skillCategories.every(c => c.skills.length === 0)
                        ? <p className='text-gray-600 text-center py-6'>No skills yet. Add your first skill above!</p>
                        : skillCategories.map(cat => (
                            cat.skills.length > 0 && (
                                <div key={cat.title}>
                                    <p className='text-gray-400 text-sm font-medium mb-3 flex items-center gap-2'>
                                        <span className='w-2 h-2 rounded-full bg-[#0b7def]' />{cat.title}
                                    </p>
                                    <div className='flex flex-wrap gap-2'>
                                        <AnimatePresence>
                                            {cat.skills.map(skill => (
                                                <motion.div key={skill._id}
                                                    initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                                                    className='flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 transition-colors group'>
                                                    <div className='w-3 h-3 rounded-full shrink-0' style={{ backgroundColor: skill.color }} />
                                                    <span className='text-sm font-medium' style={{ color: skill.color }}>{skill.name}</span>
                                                    <button onClick={() => handleDelete(skill._id)} disabled={deleting === skill._id}
                                                        className='w-5 h-5 rounded flex items-center justify-center text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all disabled:opacity-30'>
                                                        {deleting === skill._id
                                                            ? <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8 }}
                                                                className='w-2.5 h-2.5 border border-red-400 border-t-transparent rounded-full' />
                                                            : <FaTrash size={10} />}
                                                    </button>
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            )
                        ))
                }
            </div>
        </div>
    )
}

export default SkillsForm