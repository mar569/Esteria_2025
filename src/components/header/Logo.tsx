import React from 'react';
import { motion } from 'framer-motion';
import logo from '../../assets/logo.png';
import { commonVariants } from '../../utils/animations';


const Logo: React.FC = () => (
    <motion.div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        role="button"
        tabIndex={0}
        onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }}
        variants={commonVariants.fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
    >
        <div className="w-12 h-12 rounded-full flex items-center justify-center">
            <img src={logo} alt="Логотип" className='w-11 h-11 rounded-full' />
        </div>
        <h3 className='font-bold text-xl h2'>Esteria</h3>
    </motion.div>
);

export default Logo;
