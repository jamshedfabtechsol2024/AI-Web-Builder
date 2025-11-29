import { SEOMeta } from "@/components/seo/seo-meta";
import AboutUsSection from "./about-us-section";
import DevelopersSection from "./developers-section";
import FAQsSection from "./faqs-section";
import FeaturesSection from "./features-section";
import HeroSection from "./hero-section";
import HowToSection from "./how-to-section";
import PartnerSection from "./partner-section";
import PlansSection from "./plans-section";
import TestimonialSection from "./testimonial-section";

function HomePage() {
  return (
    <>
      <SEOMeta
        description="Welcome to the Staron AI home page. Discover how to create stunning websites effortlessly."
        imagePath=""
        keywords="home, welcome, introduction"
        path="/"
        title="Home Page - Staron AI"
      />

      <main>
        <HeroSection />
        <PartnerSection />
        <AboutUsSection />
        <HowToSection />
        <FeaturesSection />
        <DevelopersSection />
        <PlansSection />
        <FAQsSection />
        <TestimonialSection />
      </main>
    </>
  );
}

export default HomePage;
