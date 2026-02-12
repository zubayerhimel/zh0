import BooksSection from "@/components/BooksSection";
import ExperienceSection from "@/components/ExperienceSection";
import FooterSection from "@/components/FooterSection";
import HeroIntro from "@/components/HeroIntro";
import ISTClock from "@/components/ISTClock";
import ProjectsSection from "@/components/ProjectsSection";
import TechStackSection from "@/components/TechStackSection";
import { ThemeToggle } from "@/components/ThemeToggle";
import ThoughtsAndBlogsSection from "@/components/ThoughtsAndBlogsSection";

const Index = () => {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="fixed bottom-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <ISTClock />
      <HeroIntro />
      <ExperienceSection />
      <TechStackSection />
      <ProjectsSection />
      <BooksSection />
      <ThoughtsAndBlogsSection />
      <FooterSection />
    </div>
  );
};

export default Index;
