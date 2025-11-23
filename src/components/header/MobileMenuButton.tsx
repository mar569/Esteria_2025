import React from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { commonVariants } from '../../utils/animations';


interface MobileMenuButtonProps {
    isMobileMenuOpen: boolean;
    setIsMobileMenuOpen: (open: boolean) => void;
    isScrolled: boolean;
}

const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({ isMobileMenuOpen, setIsMobileMenuOpen, isScrolled }) => (
    <motion.button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className={`lg:hidden p-2 transition-colors z-60 ${isMobileMenuOpen ? 'text-[#288360]' : isScrolled ? 'text-gray-700' : 'text-[#63eab6]'}`}
        aria-label={isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
        variants={commonVariants.fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.6 }}
    >
        {isMobileMenuOpen ? <X size={30} /> : <Menu size={30} />}
    </motion.button>
);

export default MobileMenuButton;