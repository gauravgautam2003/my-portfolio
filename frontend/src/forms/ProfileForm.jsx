import React, { useState, useContext, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaWhatsapp, FaPlus, FaTrash, FaCamera } from 'react-icons/fa'
import { PortfolioContext } from '../context/PortfolioContext'

const InputField = ({ label, icon: Icon, type = 'text', value, onChange, placeholder }) => (
    <div>
        <label className='block text-gray-400 text-sm mb-1'>{label}</label>
        <div className='relative'>
            {Icon && <Icon className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm' />}
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full ${Icon ? 'pl-9' : 'pl-4'} pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:border-[#0b7def]/50 focus:outline-none focus:ring-1 focus:ring-[#0b7def]/30 transition-all text-sm`}
            />
        </div>
    </div>
)

const ProfileForm = () => {
    const { profile, updateProfile } = useContext(PortfolioContext)
    const fileRef = useRef()

    const [form, setForm] = useState({
        name: '', professionalTitle: '', location: '', email: '',
        phone: '', availability: '', about: '', github: '', linkedin: '', whatsapp: '',
    })
    const [education, setEducation] = useState([])
    const [imageFile, setImageFile] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)
    const [saving, setSaving] = useState(false)

    // Populate form when profile loads
    useEffect(() => {
        if (profile) {
            setForm({
                name: profile.name || '',
                professionalTitle: profile.professionalTitle || '',
                location: profile.location || '',
                email: profile.email || '',
                phone: profile.phone || '',
                availability: profile.availability || '',
                about: profile.about || '',
                github: profile.github || '',
                linkedin: profile.linkedin || '',
                whatsapp: profile.whatsapp || '',
            })
            setEducation(profile.education?.length ? profile.education : [
                { degree: '', field: '', year: '', institution: '' }
            ])
            if (profile.profileImage) setImagePreview(profile.profileImage)
        }
    }, [profile])

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (!file) return
        setImageFile(file)
        setImagePreview(URL.createObjectURL(file))
    }

    const handleEduChange = (idx, field, val) => {
        setEducation(prev => prev.map((e, i) => i === idx ? { ...e, [field]: val } : e))
    }

    const addEducation = () =>
        setEducation(prev => [...prev, { degree: '', field: '', year: '', institution: '' }])

    const removeEducation = (idx) =>
        setEducation(prev => prev.filter((_, i) => i !== idx))

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)
        try {
            const fd = new FormData()
            Object.entries(form).forEach(([k, v]) => fd.append(k, v))
            fd.append('education', JSON.stringify(education))
            if (imageFile) fd.append('profileImage', imageFile)
            await updateProfile(fd)
        } finally {
            setSaving(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Profile Image */}
            <div className='flex flex-col items-center gap-3'>
                <div className='relative group cursor-pointer' onClick={() => fileRef.current.click()}>
                    <div className='w-24 h-24 rounded-full overflow-hidden border-2 border-[#0b7def]/40 bg-white/5'>
                        {imagePreview
                            ? <img src={imagePreview} alt='profile' className='w-full h-full object-cover' />
                            : <div className='w-full h-full flex items-center justify-center text-gray-500'><FaUser size={32} /></div>
                        }
                    </div>
                    <div className='absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
                        <FaCamera className='text-white' />
                    </div>
                </div>
                <input ref={fileRef} type='file' accept='image/*' className='hidden' onChange={handleImageChange} />
                <p className='text-gray-500 text-xs'>Click to change photo</p>
            </div>

            {/* Basic Info */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <InputField label='Full Name' icon={FaUser} value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder='Gaurav Gautam' />
                <InputField label='Professional Title' value={form.professionalTitle} onChange={e => setForm(p => ({ ...p, professionalTitle: e.target.value }))} placeholder='Full Stack Developer' />
                <InputField label='Email' icon={FaEnvelope} type='email' value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder='you@example.com' />
                <InputField label='Phone' icon={FaPhone} value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} placeholder='+91 9876543210' />
                <InputField label='Location' icon={FaMapMarkerAlt} value={form.location} onChange={e => setForm(p => ({ ...p, location: e.target.value }))} placeholder='India' />
                <div>
                    <label className='block text-gray-400 text-sm mb-1'>Availability</label>
                    <select value={form.availability} onChange={e => setForm(p => ({ ...p, availability: e.target.value }))}
                        className='w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:border-[#0b7def]/50 focus:outline-none text-sm'>
                        <option value='Open to Work' className='bg-gray-900'>Open to Work</option>
                        <option value='Employed' className='bg-gray-900'>Employed</option>
                        <option value='Freelancing' className='bg-gray-900'>Freelancing</option>
                        <option value='Not Available' className='bg-gray-900'>Not Available</option>
                    </select>
                </div>
            </div>

            {/* About */}
            <div>
                <label className='block text-gray-400 text-sm mb-1'>About Me</label>
                <textarea rows={4} value={form.about} onChange={e => setForm(p => ({ ...p, about: e.target.value }))}
                    placeholder='Write something about yourself...'
                    className='w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:border-[#0b7def]/50 focus:outline-none resize-none text-sm' />
            </div>

            {/* Social Links */}
            <div className='space-y-3'>
                <p className='text-gray-300 font-medium text-sm'>Social Links</p>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <InputField label='GitHub' icon={FaGithub} value={form.github} onChange={e => setForm(p => ({ ...p, github: e.target.value }))} placeholder='https://github.com/...' />
                    <InputField label='LinkedIn' icon={FaLinkedin} value={form.linkedin} onChange={e => setForm(p => ({ ...p, linkedin: e.target.value }))} placeholder='https://linkedin.com/in/...' />
                    <InputField label='WhatsApp' icon={FaWhatsapp} value={form.whatsapp} onChange={e => setForm(p => ({ ...p, whatsapp: e.target.value }))} placeholder='https://whatsapp.com/...' />
                </div>
            </div>

            {/* Education */}
            <div className='space-y-3'>
                <div className='flex items-center justify-between'>
                    <p className='text-gray-300 font-medium text-sm'>Education</p>
                    <button type='button' onClick={addEducation}
                        className='flex items-center gap-1 text-xs text-[#0b7def] hover:text-[#00bf8f] transition-colors'>
                        <FaPlus size={10} /> Add More
                    </button>
                </div>
                {education.map((edu, idx) => (
                    <div key={idx} className='bg-white/5 border border-white/10 rounded-xl p-4 space-y-3'>
                        <div className='flex justify-between items-center'>
                            <span className='text-gray-400 text-xs'>Entry #{idx + 1}</span>
                            {education.length > 1 &&
                                <button type='button' onClick={() => removeEducation(idx)}
                                    className='text-red-400 hover:text-red-300 transition-colors text-xs flex items-center gap-1'>
                                    <FaTrash size={10} /> Remove
                                </button>
                            }
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                            {[
                                { key: 'degree', placeholder: 'Bachelor of Technology' },
                                { key: 'field', placeholder: 'Computer Science & Engineering' },
                                { key: 'institution', placeholder: 'Institute of Technology' },
                                { key: 'year', placeholder: '2023 - 2027' },
                            ].map(({ key, placeholder }) => (
                                <div key={key}>
                                    <label className='block text-gray-500 text-xs mb-1 capitalize'>{key}</label>
                                    <input value={edu[key]} onChange={e => handleEduChange(idx, key, e.target.value)}
                                        placeholder={placeholder}
                                        className='w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:border-[#0b7def]/50 focus:outline-none text-sm' />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <motion.button type='submit' disabled={saving}
                whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                className='w-full py-3 bg-gradient-to-r from-[#0b7def] to-[#00bf8f] text-white font-semibold rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-lg hover:shadow-[#0b7def]/20'>
                {saving
                    ? <><motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                        className='w-4 h-4 border-2 border-white border-t-transparent rounded-full inline-block' /> Saving...</>
                    : 'Save Profile'}
            </motion.button>
        </form>
    )
}

export default ProfileForm