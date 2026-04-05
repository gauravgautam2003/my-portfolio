import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import { FaReact, FaNodeJs, FaGitAlt, FaGithub, FaJs, FaHtml5, FaCss3Alt, FaFigma, FaCode, FaLaptopCode, FaPython, FaJava, FaRobot, FaBolt, FaTerminal } from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiMongodb, SiExpress, SiFramer, SiVercel, SiMongoose, SiRedux, SiCplusplus, SiC, SiOpenai, SiGithubcopilot, SiGoogle } from "react-icons/si";
import { PortfolioContext } from '../context/PortfolioContext';

// Map skill name → react-icon component (for known icons)
const ICON_MAP = {
    "React": <FaReact className="text-4xl" />,
    "Next": <SiNextdotjs className="text-4xl" />,
    "JavaScript": <FaJs className="text-4xl" />,
    "TypeScript": <SiTypescript className="text-4xl" />,
    "Tailwind CSS": <SiTailwindcss className="text-4xl" />,
    "Framer Motion": <SiFramer className="text-4xl" />,
    "HTML": <FaHtml5 className="text-4xl" />,
    "CSS": <FaCss3Alt className="text-4xl" />,
    "Node": <FaNodeJs className="text-4xl" />,
    "Express": <SiExpress className="text-4xl" />,
    "MongoDB": <SiMongodb className="text-4xl" />,
    "REST APIs": <SiVercel className="text-4xl" />,
    "Git": <FaGitAlt className="text-4xl" />,
    "GitHub": <FaGithub className="text-4xl" />,
    "Figma": <FaFigma className="text-4xl" />,
    "VS Code": <SiVercel className="text-4xl" />,
    "Python": <FaPython className="text-4xl" />,
    "Mongoose": <SiMongoose className="text-4xl" />,
    "Redux": <SiRedux className="text-4xl" />,
    "ChatGPT": <SiOpenai className="text-4xl" />,
    "Copilot": <SiGithubcopilot className="text-4xl" />,
    "Antigravity": <FaBolt className="text-4xl text-[#0b7def]" />,
    "Codex": <FaCode className="text-4xl text-[#00bf8f]" />,
    "Grok": <FaCode className="text-4xl" />,
    "Gemini": <SiGoogle className="text-4xl" />,
    "Claude": <FaRobot className="text-4xl" />,
    "Java": <FaJava className="text-4xl" />,
    "C++": <SiCplusplus className="text-4xl" />,
    "C": <SiC className="text-4xl" />,
    "Blackbox AI": <FaTerminal className="text-4xl" />,
    "Cursor": <FaTerminalCursor className="text-4xl" />,
};

const CATEGORY_ICONS = {
    "Languages": <FaCode className="text-3xl text-[#F7DF1E]" />,
    "Frontend Development": <FaReact className="text-3xl text-[#61DAFB]" />,
    "Backend Development": <FaNodeJs className="text-3xl text-[#339933]" />,
    "Tools & Technologies": <FaGitAlt className="text-3xl text-[#F05032]" />,
};

const Skills = () => {
    const { skillCategories, loadingSkills } = useContext(PortfolioContext);

    // Map strictly from API data, appending matching React Icons dynamically 
    const categories = (skillCategories || []).map(cat => ({
        ...cat,
        icon: CATEGORY_ICONS[cat.title] || <FaCode className="text-3xl text-gray-300" />,
    }));

    const isEmpty = categories.length === 0 || categories.every(cat => cat.skills.length === 0);

    return (
        <>
            <section id='skills' className='w-full min-h-screen bg-black relative overflow-hidden py-20 flex flex-col justify-center text-center md:text-left'>
                <div className='absolute inset-0 pointer-events-none'>
                    <div className='absolute top-40 -right-32 w-[50vw] h-[50vh] rounded-full bg-gradient-to-r from-[#4b3aff] via-[#00bf8f] to-[#1cd8d2] opacity-15 blur-[120px]' />
                    <div className='absolute bottom-40 -left-32 w-[50vw] h-[50vh] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-20 blur-[120px]' />
                </div>

                <div className='relative z-10 max-w-6xl mx-auto px-4 w-full'>
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }} viewport={{ once: true }} className='text-center mb-16'>
                        <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4'>
                            My <span className='bg-clip-text text-white'>Skills</span>
                        </h2>
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
                    ) : isEmpty ? (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='text-center py-20 text-gray-500 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 max-w-2xl mx-auto'>
                            <FaLaptopCode size={60} className='mx-auto mb-6 opacity-30 text-[#0b7def]' />
                            <p className='text-xl font-medium text-white mb-2'>No Skills Added</p>
                            <p className='text-gray-400'>Please configure your technical skillset via the Admin Dashboard.</p>
                        </motion.div>
                    ) : (
                        <div className='space-y-12'>
                            {categories.map((category, catIndex) => {
                                if (category.skills.length === 0) return null;
                                return (
                                    <motion.div key={category.title}
                                        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: catIndex * 0.1 }} viewport={{ once: true }}>
                                        <div className='flex justify-center md:justify-start items-center gap-3 mb-6'>
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
                                                                {skill.name?.charAt(0)?.toUpperCase() || '?'}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <span className='text-white font-medium text-center text-sm'>{skill.name}</span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}

export default Skills
