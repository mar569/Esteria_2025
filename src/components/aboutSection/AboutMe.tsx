import React, { forwardRef } from "react";
import CertificatesSection from "./CertificatesSection";
import ProfileCard from "./ProfileCard";
import StatsSection from "./StatsSection";
import { motion } from "framer-motion";

type AboutProps = {
    stats: { index: string; value: string; label: string }[];
    onConsultationClick: () => void;
};

const AboutMe: React.FC<AboutProps> = forwardRef<HTMLElement, AboutProps>((_, ref) => {
    return (
        <section
            id="about"
            className="relative background-wrapper-about py-20"
            ref={ref}
            style={{ position: 'relative' }}
        >
            <div className="container mx-auto px-4 ">
                <div className="grid lg:grid-cols-2 gap-4 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-20 items-center">

                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        viewport={{ once: true, margin: '-10%' }}
                    >
                        <h3 className="animate-child text-3xl lg:text-4xl font-bold text-gray-200 mb-6">
                            Обо мне
                        </h3>
                        <p className="animate-child text-lg text-gray-300 mb-4 leading-relaxed">
                            <span className="font-bold italic text-[#7ebaa2]"> Я </span> — сертифицированный косметолог с медицинским образованием и более чем 10-летним опытом работы в сфере здравоохранения.{" "}
                            <span className="font-bold italic text-[#7ebaa2]"> Моя страсть </span> — красота и забота о каждом клиенте, а моя цель — помочь вам подчеркнуть естественную привлекательность и чувствовать себя уверенно каждый день.
                        </p>
                        <p className="animate-child text-lg text-gray-300 mb-8 leading-relaxed">
                            Использую только проверенные препараты и современное оборудование, чтобы обеспечить безопасность и лучшие результаты.
                        </p>
                        <div className="relative">
                            <div className="absolute top-40 right-20 w-24 h-24 rounded-full bg-mint-200/40 animate-bounce delay-1000"></div>
                            <div className="absolute bottom-20 right-1 w-16 h-16 rounded-full bg-lime-200/40 animate-bounce delay-500"></div>
                        </div>
                        <blockquote className="animate-child border-l-4 border-mint-400 pl-4 italic text-white/60 mb-8">
                            "Красота — это уверенность, и я здесь, чтобы помочь вам её обрести."
                        </blockquote>
                        <StatsSection />
                    </motion.div>


                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                        viewport={{ once: true, margin: '-10%' }}
                    >
                        <ProfileCard />
                    </motion.div>
                </div>
            </div>


            <motion.div
                className="container mx-auto px-4 mt-24"
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
                viewport={{ once: true, margin: '-10%' }}
            >
                <h2 className="animate-child text-3xl lg:text-4xl font-bold text-gray-200 mb-8">
                    Сертификаты и удостоверения
                </h2>
                <CertificatesSection />
            </motion.div>

        </section>
    );
});

AboutMe.displayName = 'AboutMe';
export default AboutMe;