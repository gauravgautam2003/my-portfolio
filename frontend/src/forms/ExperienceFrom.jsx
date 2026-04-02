import React, { useState, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBriefcase, FaGraduationCap, FaEdit, FaTrash, FaPlus, FaTimes } from 'react-icons/fa'
import { PortfolioContext } from '../context/PortfolioContext'

// Reusable tag input
const TagInput = ({ tags, setTags, placeholder }) => {
    const [input, setInput] = useState('')
    const handleKey = (e) => {
        if ((e.key === 'Enter' || e.key === ',') && input.trim()) {
            e.preventDefault()
            if (!tags.includes(input.trim())) setTags([...tags, input.trim()])
            setInput('')
        }
    }
    return (
        <div className='flex flex-wrap gap-2 p-2.5 bg-white/5 border border-white/10 rounded-xl min-h-[44px] focus-within:border-[#0b7def]/50'>
            {tags.map(t => (
                <span key={t} className='flex items-center gap-1 px-2 py-0.5 bg-[#00bf8f]/20 text-[#00bf8f] rounded-md text-xs border border-[#00bf8f]/30'>
                    {t} <FaTimes size={8} className='cursor-pointer hover:text-red-400' onClick={() => setTags(tags.filter(x => x !== t))} />
                </span>
            ))}
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKey}
                placeholder={tags.length === 0 ? placeholder : ''}
                className='flex-1 min-w-[120px] bg-transparent text-white text-sm outline-none placeholder-gray-600' />
        </div>
    )
}

const emptyForm = { type: 'work', title: '', company: '', location: 'India', period: '', description: '' }

const ExperienceForm = () => {
    const { experiences, createExperience, updateExperience, deleteExperience, loadingExperiences } = useContext(PortfolioContext)

    const [form, setForm] = useState(emptyForm)
    const [technologies, setTechnologies] = useState([])
    const [editId, setEditId] = useState(null)
    const [saving, setSaving] = useState(false)
    const [deleting, setDeleting] = useState(null)

    const resetForm = () => { setForm(emptyForm); setTechnologies([]); setEditId(null) }

    const handleEdit = (exp) => {
        setEditId(exp._id)
        setForm({ type: exp.type, title: exp.title, company: exp.company, location: exp.location || '', period: exp.period, description: exp.description })
        setTechnologies(exp.technologies || [])
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this entry?')) return
        setDeleting(id)
        try { await deleteExperience(id) }
        finally { setDeleting(null) }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!form.title || !form.company || !form.period || !form.description) return
        setSaving(true)
        try {
            const payload = { ...form, technologies: JSON.stringify(technologies) }
            if (editId) await updateExperience(editId, payload)
            else await createExperience(payload)
            resetForm()
        } finally { setSaving(false) }
    }

    const work = experiences.filter(e => e.type === 'work')
    const edu = experiences.filter(e => e.type === 'education')

    return (
        <div className='space-y-8'>
            {/* ── Form ── */}
            <form onSubmit={handleSubmit} className='space-y-4'>
                <div className='flex items-center justify-between mb-2'>
                    <h3 className='text-white font-semibold'>{editId ? '✏️ Edit Entry' : '➕ Add Experience / Education'}</h3>
                    {editId && <button type='button' onClick={resetForm}
                        className='text-xs text-gray-400 hover:text-white flex items-center gap-1 transition-colors'>
                        <FaTimes size={10} /> Cancel
                    </button>}
                </div>

                {/* Type Toggle */}
                <div className='flex gap-3'>
                    {[
                        { val: 'work', label: 'Work Experience', Icon: FaBriefcase, color: '#0b7def' },
                        { val: 'education', label: 'Education', Icon: FaGraduationCap, color: '#00bf8f' },
                    ].map(({ val, label, Icon, color }) => (
                        <button key={val} type='button' onClick={() => setForm(p => ({ ...p, type: val }))}
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-medium transition-all ${form.type === val ? 'border-transparent text-white' : 'border-white/10 text-gray-400 bg-white/5 hover:border-white/20'}`}
                            style={form.type === val ? { background: `${color}25`, borderColor: `${color}60`, color } : {}}>
                            <Icon size={14} /> {label}
                        </button>
                    ))}
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {[
                        { key: 'title', label: 'Title *', placeholder: form.type === 'work' ? 'Full Stack Developer' : 'Bachelor of Technology' },
                        { key: 'company', label: form.type === 'work' ? 'Company *' : 'Institution *', placeholder: form.type === 'work' ? 'Company Name' : 'University / Institute' },
                        { key: 'location', label: 'Location', placeholder: 'Remote / India' },
                        { key: 'period', label: 'Period *', placeholder: '2023 - 2027 (Expected)' },
                    ].map(({ key, label, placeholder }) => (
                        <div key={key}>
                            <label className='block text-gray-400 text-sm mb-1'>{label}</label>
                            <input value={form[key]} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                                placeholder={placeholder} required={['title', 'company', 'period'].includes(key)}
                                className='w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:border-[#0b7def]/50 focus:outline-none text-sm' />
                        </div>
                    ))}
                </div>

                <div>
                    <label className='block text-gray-400 text-sm mb-1'>Description *</label>
                    <textarea rows={3} value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} required
                        placeholder='Describe your role, achievements, coursework...'
                        className='w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:border-[#0b7def]/50 focus:outline-none resize-none text-sm' />
                </div>

                <div>
                    <label className='block text-gray-400 text-sm mb-1'>Technologies / Skills</label>
                    <TagInput tags={technologies} setTags={setTechnologies} placeholder='React, Node.js... (Enter to add)' />
                </div>

                <motion.button type='submit' disabled={saving}
                    whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                    className='w-full py-3 bg-gradient-to-r from-[#0b7def] to-[#00bf8f] text-white font-semibold rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 transition-all'>
                    {saving
                        ? <><motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                            className='w-4 h-4 border-2 border-white border-t-transparent rounded-full' />Saving...</>
                        : <><FaPlus size={12} />{editId ? 'Update Entry' : 'Add Entry'}</>}
                </motion.button>
            </form>

            {/* ── Lists ── */}
            {[
                { label: '💼 Work Experience', items: work, color: '#0b7def' },
                { label: '🎓 Education', items: edu, color: '#00bf8f' },
            ].map(({ label, items, color }) => (
                <div key={label}>
                    <h3 className='text-white font-semibold mb-3'>{label}
                        <span className='text-gray-500 text-sm font-normal ml-2'>({items.length})</span>
                    </h3>
                    {loadingExperiences
                        ? <p className='text-gray-500 text-sm py-3'>Loading...</p>
                        : items.length === 0
                            ? <p className='text-gray-600 text-sm py-3'>No entries yet.</p>
                            : (
                                <div className='space-y-2'>
                                    <AnimatePresence>
                                        {items.map(exp => (
                                            <motion.div key={exp._id}
                                                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                                                className='flex items-start gap-3 p-4 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 transition-colors'>
                                                <div className='w-1 h-full min-h-[40px] rounded-full shrink-0' style={{ backgroundColor: color }} />
                                                <div className='flex-1 min-w-0'>
                                                    <p className='text-white font-medium text-sm'>{exp.title}</p>
                                                    <p className='text-sm mt-0.5' style={{ color }}>{exp.company}</p>
                                                    <p className='text-gray-500 text-xs'>{exp.period} · {exp.location}</p>
                                                </div>
                                                <div className='flex gap-2 shrink-0'>
                                                    <button onClick={() => handleEdit(exp)}
                                                        className='w-7 h-7 rounded-lg bg-[#0b7def]/10 border border-[#0b7def]/20 text-[#0b7def] flex items-center justify-center hover:bg-[#0b7def]/20 transition-colors'>
                                                        <FaEdit size={11} />
                                                    </button>
                                                    <button onClick={() => handleDelete(exp._id)} disabled={deleting === exp._id}
                                                        className='w-7 h-7 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center hover:bg-red-500/20 transition-colors disabled:opacity-40'>
                                                        {deleting === exp._id
                                                            ? <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8 }}
                                                                className='w-2.5 h-2.5 border border-red-400 border-t-transparent rounded-full' />
                                                            : <FaTrash size={11} />}
                                                    </button>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            )
                    }
                </div>
            ))}
        </div>
    )
}

export default ExperienceForm