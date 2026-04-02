import React, { useState, useContext, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt, FaEdit, FaTrash, FaPlus, FaTimes, FaImage } from 'react-icons/fa'
import { PortfolioContext } from '../context/PortfolioContext'

const CATEGORIES = ['Frontend', 'Backend', 'Full Stack', 'Mobile']

// Tag input — type tech name then press Enter or comma
const TagInput = ({ tags, setTags, placeholder = 'Type and press Enter...' }) => {
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
                <span key={t} className='flex items-center gap-1 px-2 py-0.5 bg-[#0b7def]/20 text-[#0b7def] rounded-md text-xs border border-[#0b7def]/30'>
                    {t}
                    <FaTimes size={8} className='cursor-pointer hover:text-red-400' onClick={() => setTags(tags.filter(x => x !== t))} />
                </span>
            ))}
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKey}
                placeholder={tags.length === 0 ? placeholder : ''}
                className='flex-1 min-w-[120px] bg-transparent text-white text-sm outline-none placeholder-gray-600' />
        </div>
    )
}

const emptyForm = { title: '', description: '', category: 'Full Stack', github: '', liveDemo: '' }

const ProjectForm = () => {
    const { projects, createProject, updateProject, deleteProject, loadingProjects } = useContext(PortfolioContext)
    const fileRef = useRef()

    const [form, setForm] = useState(emptyForm)
    const [techStack, setTechStack] = useState([])
    const [imageFile, setImageFile] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)
    const [editId, setEditId] = useState(null)
    const [saving, setSaving] = useState(false)
    const [deleting, setDeleting] = useState(null)

    const resetForm = () => {
        setForm(emptyForm)
        setTechStack([])
        setImageFile(null)
        setImagePreview(null)
        setEditId(null)
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (!file) return
        setImageFile(file)
        setImagePreview(URL.createObjectURL(file))
    }

    const handleEdit = (project) => {
        setEditId(project._id)
        setForm({
            title: project.title,
            description: project.description,
            category: project.category,
            github: project.github || '',
            liveDemo: project.liveDemo || '',
        })
        setTechStack(project.techStack || [])
        setImagePreview(project.image || null)
        setImageFile(null)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this project?')) return
        setDeleting(id)
        try { await deleteProject(id) }
        finally { setDeleting(null) }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!form.title || !form.description) return
        setSaving(true)
        try {
            const fd = new FormData()
            Object.entries(form).forEach(([k, v]) => fd.append(k, v))
            fd.append('techStack', JSON.stringify(techStack))
            if (imageFile) fd.append('image', imageFile)
            if (editId) await updateProject(editId, fd)
            else await createProject(fd)
            resetForm()
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className='space-y-8'>
            {/* ── Form ── */}
            <form onSubmit={handleSubmit} className='space-y-4'>
                <div className='flex items-center justify-between mb-2'>
                    <h3 className='text-white font-semibold'>{editId ? '✏️ Edit Project' : '➕ Add New Project'}</h3>
                    {editId && <button type='button' onClick={resetForm}
                        className='text-xs text-gray-400 hover:text-white flex items-center gap-1 transition-colors'>
                        <FaTimes size={10} /> Cancel Edit
                    </button>}
                </div>

                {/* Image Upload */}
                <div onClick={() => fileRef.current.click()}
                    className='cursor-pointer h-36 rounded-xl border-2 border-dashed border-white/20 hover:border-[#0b7def]/50 flex items-center justify-center overflow-hidden transition-colors'>
                    {imagePreview
                        ? <img src={imagePreview} alt='preview' className='w-full h-full object-cover' />
                        : <div className='flex flex-col items-center gap-2 text-gray-500'>
                            <FaImage size={28} />
                            <span className='text-xs'>Click to upload project image</span>
                        </div>
                    }
                </div>
                <input ref={fileRef} type='file' accept='image/*' className='hidden' onChange={handleImageChange} />

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                        <label className='block text-gray-400 text-sm mb-1'>Title *</label>
                        <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} required
                            placeholder='Project Title'
                            className='w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:border-[#0b7def]/50 focus:outline-none text-sm' />
                    </div>
                    <div>
                        <label className='block text-gray-400 text-sm mb-1'>Category *</label>
                        <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                            className='w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:border-[#0b7def]/50 focus:outline-none text-sm'>
                            {CATEGORIES.map(c => <option key={c} value={c} className='bg-gray-900'>{c}</option>)}
                        </select>
                    </div>
                </div>

                <div>
                    <label className='block text-gray-400 text-sm mb-1'>Description *</label>
                    <textarea rows={3} value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} required
                        placeholder='Describe what this project does...'
                        className='w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:border-[#0b7def]/50 focus:outline-none resize-none text-sm' />
                </div>

                <div>
                    <label className='block text-gray-400 text-sm mb-1'>Tech Stack</label>
                    <TagInput tags={techStack} setTags={setTechStack} placeholder='React, Node.js... (Enter to add)' />
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                        <label className='block text-gray-400 text-sm mb-1'><FaGithub className='inline mr-1' />GitHub URL</label>
                        <input value={form.github} onChange={e => setForm(p => ({ ...p, github: e.target.value }))}
                            placeholder='https://github.com/...'
                            className='w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:border-[#0b7def]/50 focus:outline-none text-sm' />
                    </div>
                    <div>
                        <label className='block text-gray-400 text-sm mb-1'><FaExternalLinkAlt className='inline mr-1' />Live Demo URL</label>
                        <input value={form.liveDemo} onChange={e => setForm(p => ({ ...p, liveDemo: e.target.value }))}
                            placeholder='https://yoursite.com'
                            className='w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:border-[#0b7def]/50 focus:outline-none text-sm' />
                    </div>
                </div>

                <motion.button type='submit' disabled={saving}
                    whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                    className='w-full py-3 bg-gradient-to-r from-[#0b7def] to-[#00bf8f] text-white font-semibold rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 transition-all'>
                    {saving
                        ? <><motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                            className='w-4 h-4 border-2 border-white border-t-transparent rounded-full' />Saving...</>
                        : <><FaPlus size={12} />{editId ? 'Update Project' : 'Add Project'}</>}
                </motion.button>
            </form>

            {/* ── Project List ── */}
            <div>
                <h3 className='text-white font-semibold mb-4 flex items-center gap-2'>
                    📋 All Projects <span className='text-gray-500 text-sm font-normal'>({projects.length})</span>
                </h3>
                {loadingProjects
                    ? <p className='text-gray-500 text-center py-6'>Loading...</p>
                    : projects.length === 0
                        ? <p className='text-gray-500 text-center py-6'>No projects yet. Add your first project above!</p>
                        : (
                            <div className='space-y-3'>
                                <AnimatePresence>
                                    {projects.map(p => (
                                        <motion.div key={p._id}
                                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                                            className='flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 transition-colors'>
                                            <div className='w-14 h-10 rounded-lg overflow-hidden bg-white/5 shrink-0'>
                                                {p.image
                                                    ? <img src={p.image} alt={p.title} className='w-full h-full object-cover' />
                                                    : <div className='w-full h-full flex items-center justify-center text-gray-600'><FaImage size={14} /></div>
                                                }
                                            </div>
                                            <div className='flex-1 min-w-0'>
                                                <p className='text-white font-medium text-sm truncate'>{p.title}</p>
                                                <p className='text-gray-500 text-xs'>{p.category}</p>
                                            </div>
                                            <div className='flex gap-2 shrink-0'>
                                                <button onClick={() => handleEdit(p)}
                                                    className='w-8 h-8 rounded-lg bg-[#0b7def]/10 border border-[#0b7def]/20 text-[#0b7def] flex items-center justify-center hover:bg-[#0b7def]/20 transition-colors'>
                                                    <FaEdit size={12} />
                                                </button>
                                                <button onClick={() => handleDelete(p._id)} disabled={deleting === p._id}
                                                    className='w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center hover:bg-red-500/20 transition-colors disabled:opacity-40'>
                                                    {deleting === p._id
                                                        ? <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8 }}
                                                            className='w-3 h-3 border border-red-400 border-t-transparent rounded-full' />
                                                        : <FaTrash size={12} />}
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        )
                }
            </div>
        </div>
    )
}

export default ProjectForm