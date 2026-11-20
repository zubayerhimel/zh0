import ExperienceSection from "@/components/ExperienceSection";
import FooterSection from "@/components/FooterSection";
import HeroIntro from "@/components/HeroIntro";
import ProjectsSection from "@/components/ProjectsSection";
import TechStackSection from "@/components/TechStackSection";
import ThoughtsAndBlogsSection from "@/components/ThoughtsAndBlogsSection";

const Index = () => {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <HeroIntro />
      <ExperienceSection />
      <TechStackSection />
      <ProjectsSection />
      <ThoughtsAndBlogsSection />
      <FooterSection />
    </div>
  );
};

export default Index;
