import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HeroSection     from '../components/HeroSection';
import AboutSection    from '../components/AboutSection';
import SkillSection    from '../components/SkillSection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection  from '../components/ContactSection';

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    const id = location.state?.scrollTo;
    if (!id) return;
    // 렌더링 완료 후 스크롤
    const t = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    return () => clearTimeout(t);
  }, [location.state]);

  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillSection />
      <ProjectsSection />
      <ContactSection />
    </>
  );
}
