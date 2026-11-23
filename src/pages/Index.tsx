import ActivitySection from "@/components/ActivitySection";
import ExperienceSection from "@/components/ExperienceSection";
import FooterSection from "@/components/FooterSection";
import HeroIntro from "@/components/HeroIntro";
import ProjectsSection from "@/components/ProjectsSection";
import Seo from "@/components/Seo";
import StatsStrip from "@/components/StatsStrip";
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
      <StatsStrip />
      <ProjectsSection />
      <ExperienceSection />
      <TechStackSection />
      <ActivitySection />
      <WritingSection />
      <FooterSection />
    </div>
  );
};

export default Index;
