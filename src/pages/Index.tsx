import ISTClock from "@/components/ISTClock";
import HeroIntro from "@/components/HeroIntro";
import ExperienceSection from "@/components/ExperienceSection";
import TechStackSection from "@/components/TechStackSection";
import EducationSection from "@/components/EducationSection";
import ProjectsSection from "@/components/ProjectsSection";
import GitHubSection from "@/components/GitHubSection";
import BooksSection from "@/components/BooksSection";
import ThoughtsAndBlogsSection from "@/components/ThoughtsAndBlogsSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <ISTClock />
      <HeroIntro />
      <ExperienceSection />
      <TechStackSection />
      <EducationSection />
      <ProjectsSection />
      <GitHubSection />
      <BooksSection />
      <ThoughtsAndBlogsSection />
      <FooterSection />
    </div>
  );
};

export default Index;
