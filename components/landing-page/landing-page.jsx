import HeroSection from "./hero-section";
import FeaturesSection from "./features-section";
import TeacherCTASection from "./teacher-cta-section";

export default function LandingPage({ session }) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <TeacherCTASection session={session} />
      </main>
      
      <footer className="bg-surface border-t border-border py-8">
        <div className="container mx-auto px-space-md text-center text-muted-foreground text-sm">
          <p>© {new Date().getFullYear()} TeachOthersOnline. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
