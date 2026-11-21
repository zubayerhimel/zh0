import ExperienceSection from "@/components/ExperienceSection";
import FooterSection from "@/components/FooterSection";
import HeroIntro from "@/components/HeroIntro";
import ProjectsSection from "@/components/ProjectsSection";
import Seo from "@/components/Seo";
import TechStackSection from "@/components/TechStackSection";
import WritingSection from "@/components/WritingSection";

const Index = () => {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Seo
        path="/"
        description="Zubayer Alam is a product engineer in Dhaka and co-founder of Devfik, building fast, accessible web apps with React, Next.js and TypeScript."
      />
      <HeroIntro />
      <ExperienceSection />
      <TechStackSection />
      <ProjectsSection />
      <WritingSection />
      <FooterSection />
    </div>
  );
};

export default Index;
