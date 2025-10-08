import ProjectsSection from '@/components/modules/project/ProjectSection';
import Banner from '@/components/shared/Navbar/Banner';
import React from 'react';


const HomePage = () => {
    return (
        <div>
           <Banner/>
           <ProjectsSection />
        </div>
    );
};

export default HomePage;