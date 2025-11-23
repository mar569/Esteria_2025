import React from 'react';
import { motion, AnimatePresence, easeInOut } from 'framer-motion';
import { Phone, X } from 'lucide-react';
import { navItems } from '../../constants/navItems';
import { scrollToSection } from '../../hooks/useSectionAnimations';
import { commonVariants } from '../../utils/animations';


interface MobileMenuProps {
    isMobileMenuOpen: boolean;
    setIsMobileMenuOpen: (open: boolean) => void;
    activeSection: string;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isMobileMenuOpen, setIsMobileMenuOpen, activeSection }) => {
    const menuVariants = {
        hidden: {
            x: "100%",
            opacity: 0,
        },
        visible: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.3, ease: easeInOut },
        },
        exit: {
            x: "100%",
            opacity: 0,
            transition: { duration: 0.3, ease: easeInOut },
        },
    };

    return (
        <AnimatePresence>
            {isMobileMenuOpen && (
                <motion.nav
                    key="mobile-menu"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={menuVariants}
                    className="fixed bg-[#1d1d1d] inset-0 p-4 overflow-auto max-h-[100vh] flex flex-col"
                    aria-label="Мобильное меню навигации"
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    <motion.button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="self-end mb-6  text-white hover:text-mint-300 transition-colors"
                        aria-label="Закрыть меню"
                    >
                        <X size={32} />
                    </motion.button>
                    <div className="flex flex-col space-y-6" onClick={e => e.stopPropagation()}>
                        {navItems.map((item, index) => {
                            const isActive = activeSection === item.href;
                            return (
                                <motion.a
                                    key={item.name}
                                    href={item.href}
                                    onClick={e => {
                                        e.preventDefault();
                                        setIsMobileMenuOpen(false);
                                        scrollToSection(item.href);
                                    }}
                                    className={`relative px-6 py-1 rounded-tr-2xl font-semibold text-xl transition-all duration-300 ${isActive
                                        ? 'text-mint-400 shadow-lg'
                                        : 'text-white hover:text-mint-300 hover:bg-white/5'
                                        }`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    {isActive && (
                                        <span className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full bg-mint-500 shadow-md" />
                                    )}
                                    {item.name}
                                </motion.a>
                            );
                        })}
                        <div className="pt-6 border-t border-white/20">
                            <motion.a
                                href="tel:+79657887750"
                                className="flex items-center space-x-3 text-mint-400 hover:text-mint-300 transition-colors font-semibold text-lg px-4 py-3 rounded-xl"
                                variants={commonVariants.fadeIn}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: navItems.length * 0.1 }}
                            >
                                <Phone size={20} />
                                <span>+7 (965) 788-77-50</span>
                            </motion.a>
                        </div>
                    </div>
                </motion.nav>
            )}
        </AnimatePresence>
    );
};

export default MobileMenu;