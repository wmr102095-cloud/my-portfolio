import HeroSection     from '../components/HeroSection';
import AboutSection    from '../components/AboutSection';
import SkillSection    from '../components/SkillSection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection  from '../components/ContactSection';

export default function Home() {
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
