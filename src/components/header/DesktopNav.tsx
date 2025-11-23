import React from 'react';
import SparkleNavbar from '../lightswind/SparkleNavbar';
import { navItems } from '../../constants/navItems';
import { scrollToSection } from '../../hooks/useSectionAnimations';


interface DesktopNavProps {
    isScrolled: boolean;
}

const DesktopNav: React.FC<DesktopNavProps> = ({ isScrolled }) => (
    <div className="hidden lg:block sectbg">
        <SparkleNavbar
            items={navItems.map(item => item.name)}
            color={isScrolled ? '#4B5563' : '#2fc58c'}
            onItemClick={index => scrollToSection(navItems[index].href)}
        />
    </div>
);

export default DesktopNav;