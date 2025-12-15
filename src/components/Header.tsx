import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

import { navItems } from '../constants/navItems';
import { usePreventScroll } from '../hooks/usePreventScroll';
import { useActiveSection } from '../hooks/useActiveSection';
import Logo from './header/Logo';
import DesktopNav from './header/DesktopNav';
import PhoneLink from './header/PhoneLink';
import MobileMenuButton from './header/MobileMenuButton';
import MobileMenu from './header/MobileMenu';


const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const activeSection = useActiveSection(navItems);

  usePreventScroll(isMobileMenuOpen);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <motion.header

      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-600`}
    >
      <div className="container mx-auto md:px-2 px-4 mt-4 flex items-center justify-between">
        <Logo />
        <DesktopNav isScrolled={isScrolled} />
        <PhoneLink isScrolled={isScrolled} />
        <MobileMenuButton isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} isScrolled={isScrolled} />
      </div>
      <MobileMenu isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} activeSection={activeSection} />
    </motion.header>
  );
};

export default Header;