import RotatingVideo from "@/components/auth/rotating-video";
import CentralHeading from "@/components/landing/central-heading";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { useGetSystemFeedbacks } from "@/hooks/use-thread";
import { TESTIMONIALS } from "@/data/testimonidal-data";

function TestimonialSection() {
  const { data, isLoading } = useGetSystemFeedbacks();

  const TESTIMONIALS_Data = data?.map((item) => ({
    quote: item?.comment,
    img: item?.reviewer_profile_picture,
    name: item?.reviewed_by_name,
    username: item?.reviewed_by_name.toLowerCase().replace(/\s+/g, "_"),
    rating: item?.rating,
  }));

  const ALL_TESTIMONIALS = [...TESTIMONIALS, ...(TESTIMONIALS_Data || [])];

  return (
    <section className="h-full w-full bg-[var(--background)]" id="testimonial">
      <CentralHeading title="Loved by thousands of product creators" />
      {/* Background Video */}
      <div className="relative h-screen w-full overflow-hidden">
        <RotatingVideo src="/videos/globe-video.mp4" />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/20" />

        <div className="flex h-full w-full flex-col items-center justify-center gap-6">
          <InfiniteMovingCards
            direction="left"
            items={ALL_TESTIMONIALS || []}
            speed="slow"
          />

          <InfiniteMovingCards
            direction="right"
            items={ALL_TESTIMONIALS || []}
            speed="slow"
          />
        </div>
      </div>
    </section>
  );
}

export default TestimonialSection;
