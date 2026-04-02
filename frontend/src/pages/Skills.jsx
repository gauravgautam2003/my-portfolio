import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import { FaReact, FaNodeJs, FaGitAlt, FaGithub, FaJs, FaHtml5, FaCss3Alt, FaFigma, FaCode } from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiMongodb, SiExpress, SiFramer, SiVercel } from "react-icons/si";
import { PortfolioContext } from '../context/PortfolioContext';

// Map skill name → react-icon component (for known icons)
const ICON_MAP = {
    "React.js": <FaReact className="text-4xl" />,
    "Next.js": <SiNextdotjs className="text-4xl" />,
    "JavaScript": <FaJs className="text-4xl" />,
    "TypeScript": <SiTypescript className="text-4xl" />,
    "Tailwind CSS": <SiTailwindcss className="text-4xl" />,
    "Framer Motion": <SiFramer className="text-4xl" />,
    "HTML": <FaHtml5 className="text-4xl" />,
    "CSS": <FaCss3Alt className="text-4xl" />,
    "Node.js": <FaNodeJs className="text-4xl" />,
    "Express.js": <SiExpress className="text-4xl" />,
    "MongoDB": <SiMongodb className="text-4xl" />,
    "REST APIs": <SiVercel className="text-4xl" />,
    "Git": <FaGitAlt className="text-4xl" />,
    "GitHub": <FaGithub className="text-4xl" />,
    "Figma": <FaFigma className="text-4xl" />,
    "VS Code": <SiVercel className="text-4xl" />,
};

// Default fallback categories (matches original hardcoded data)
const DEFAULT_CATEGORIES = [
    {
        title: "Frontend Development",
        icon: <FaReact className="text-3xl text-[#61DAFB]" />,
        skills: [
            { name: "React.js", color: "#61DAFB" }, { name: "Next.js", color: "#ffffff" },
            { name: "JavaScript", color: "#F7DF1E" }, { name: "TypeScript", color: "#3178C6" },
            { name: "Tailwind CSS", color: "#06B6D4" }, { name: "Framer Motion", color: "#0055FF" },
            { name: "HTML", color: "#E34F26" }, { name: "CSS", color: "#1572B6" },
        ]
    },
    {
        title: "Backend Development",
        icon: <FaNodeJs className="text-3xl text-[#339933]" />,
        skills: [
            { name: "Node.js", color: "#339933" }, { name: "Express.js", color: "#ffffff" },
            { name: "MongoDB", color: "#47A248" }, { name: "REST APIs", color: "#ffffff" },
        ]
    },
    {
        title: "Tools & Technologies",
        icon: <FaGitAlt className="text-3xl text-[#F05032]" />,
        skills: [
            { name: "Git", color: "#F05032" }, { name: "GitHub", color: "#ffffff" },
            { name: "Figma", color: "#F24E1E" }, { name: "VS Code", color: "#007ACC" },
        ]
    }
];

const CATEGORY_ICONS = {
    "Frontend Development": <FaReact className="text-3xl text-[#61DAFB]" />,
    "Backend Development": <FaNodeJs className="text-3xl text-[#339933]" />,
    "Tools & Technologies": <FaGitAlt className="text-3xl text-[#F05032]" />,
};

const Skills = () => {
    const { skillCategories, loadingSkills } = useContext(PortfolioContext);

    // Use API data if available, else fall back to hardcoded
    const categories = (skillCategories && skillCategories.some(c => c.skills.length > 0))
        ? skillCategories.map(cat => ({
            ...cat,
            icon: CATEGORY_ICONS[cat.title] || <FaCode className="text-3xl" />,
        }))
        : DEFAULT_CATEGORIES;

    return (
        <>
            <section id='skills' className='w-full min-h-screen bg-black relative overflow-hidden py-20'>
                <div className='absolute inset-0 pointer-events-none'>
                    <div className='absolute top-40 -right-32 w-[50vw] h-[50vh] rounded-full bg-gradient-to-r from-[#4b3aff] via-[#00bf8f] to-[#1cd8d2] opacity-15 blur-[120px]' />
                    <div className='absolute bottom-40 -left-32 w-[50vw] h-[50vh] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-20 blur-[120px]' />
                </div>

                <div className='relative z-10 max-w-6xl mx-auto px-4'>
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }} viewport={{ once: true }} className='text-center mb-16'>
                        <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2'>
                            My <span className='bg-clip-text text-white'>Skills</span>
                        </h2>
                        <div className='max-w-36 h-1 bg-gradient-to-r from-[#0b7def] to-[#00bf8f] mx-auto rounded-full' />
                        <p className='text-gray-400 mt-4 max-w-2xl mx-auto'>
                            Technologies and tools I work with to build modern, scalable applications
                        </p>
                    </motion.div>

                    {loadingSkills ? (
                        <div className='space-y-10'>
                            {[1, 2, 3].map(i => (
                                <div key={i}>
                                    <div className='h-6 w-48 bg-white/5 rounded-lg animate-pulse mb-5' />
                                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                                        {Array(4).fill(0).map((_, j) => (
                                            <div key={j} className='h-24 bg-white/5 rounded-xl animate-pulse' />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className='space-y-12'>
                            {categories.map((category, catIndex) => (
                                <motion.div key={category.title}
                                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: catIndex * 0.1 }} viewport={{ once: true }}>
                                    <div className='flex items-center gap-3 mb-6'>
                                        {category.icon}
                                        <h3 className='text-2xl font-bold text-white'>{category.title}</h3>
                                    </div>
                                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                                        {category.skills.map((skill, skillIndex) => (
                                            <motion.div key={skill.name || skill._id}
                                                initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.3, delay: skillIndex * 0.05 }} viewport={{ once: true }}
                                                whileHover={{ scale: 1.05, y: -3 }}
                                                className='bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 flex flex-col items-center cursor-default'>
                                                <div style={{ color: skill.color }} className='mb-3'>
                                                    {ICON_MAP[skill.name] || (
                                                        <div className='w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold border-2'
                                                            style={{ borderColor: skill.color, color: skill.color }}>
                                                            {skill.name?.charAt(0)?.toUpperCase()}
                                                        </div>
                                                    )}
                                                </div>
                                                <span className='text-white font-medium text-center text-sm'>{skill.name}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {/* Stats */}
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }} viewport={{ once: true }}
                        className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-16'>
                        {[
                            { number: "2+", label: "Years Experience", color: "#0b7def" },
                            { number: "20+", label: "Projects Completed", color: "#00bf8f" },
                            { number: "10+", label: "Happy Clients", color: "#f08409" }
                        ].map((stat, i) => (
                            <div key={stat.label}
                                className='bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center'>
                                <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }}
                                    className='text-4xl font-bold mb-2' style={{ color: stat.color }}>
                                    {stat.number}
                                </motion.div>
                                <p className='text-gray-400'>{stat.label}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </>
    )
}

export default Skills
