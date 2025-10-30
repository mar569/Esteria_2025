import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaMinus } from "react-icons/fa";

const faqData = [
    {
        question: "Как долго длится процедура?",
        answer: "Время зависит от типа процедуры, но обычно от 30 минут до 2 часов. Я всегда обсуждаю детали заранее.",
    },
    {
        question: "А какие препараты используете?",
        answer: "Только натуральные и проверенные бренды, такие как Mesomatrix, Mesopharm, Nithya, Botulax, Neuramis и др. Всё безопасно и качественно.",
    },
    {
        question: "Есть ли противопоказания?",
        answer: "Да, есть. Мы обсудим вашу медицинскую историю перед началом процедуры.",
    },
    {
        question: "Как подготовиться к процедуре?",
        answer: "Рекомендуется избегать солнца, алкоголя за 24–48 часов до процедуры. Я дам подробные инструкции.",
    },
    {
        question: "Больно ли будет?",
        answer: "Большинство процедур проходят безболезненно. При необходимости использую анестезию для вашего комфорта.",
    },

];

const FaqAccordion: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true, margin: "-10%" }}
        >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-200 mb-8 text-center">
                Часто задаваемые <span className="text-mint-400 italic">вопросы!</span>
            </h2>
            <div className="space-y-4 max-w-4xl mx-auto">
                {faqData.map((faq, index) => (
                    <motion.div
                        key={index}
                        className="bg-gradient-to-b from-gray-200 to-white/90 rounded-xl shadow-lg border border-mint-500/20 hover:border-mint-400/50 transition-all duration-300 overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <button
                            onClick={() => toggleAccordion(index)}
                            className="w-full p-6 text-left flex items-center focus:outline-none focus:ring-2 focus:ring-mint-400 rounded-xl"
                        >

                            <motion.div
                                className="flex-shrink-0 mr-4"
                                animate={{ rotate: activeIndex === index ? 180 : 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                {activeIndex === index ? (
                                    <FaMinus className="text-black/80 text-xl" />
                                ) : (
                                    <FaPlus className="text-black/80 text-xl" />
                                )}
                            </motion.div>

                            <div className="flex items-center flex-1">
                                <h3 className="text-lg md:text-xl font-semibold text-black/70">{faq.question}</h3>
                            </div>
                        </button>
                        <AnimatePresence>
                            {activeIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-6 pb-6 mt-2 ">
                                        <p className="text-black/70 leading-relaxed">{faq.answer}</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default FaqAccordion;
