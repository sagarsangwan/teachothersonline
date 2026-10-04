import { Video, CalendarCheck, ShieldCheck, Zap } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: <Video className="w-8 h-8 text-primary" />,
      title: "Interactive Video Classrooms",
      description: "Learn in high-quality 1-on-1 virtual rooms powered by cutting-edge WebRTC technology."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
      title: "Verified Tutors",
      description: "Every teacher on our platform goes through a strict manual verification process."
    },
    {
      icon: <CalendarCheck className="w-8 h-8 text-primary" />,
      title: "Flexible Scheduling",
      description: "Request a demo class that fits your schedule, and let our teachers accommodate you."
    },
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: "Instant Connection",
      description: "Match with a teacher quickly and start your learning journey without any friction."
    }
  ];

  return (
    <section className="w-full py-24 bg-surface">
      <div className="container px-4 md:px-8 mx-auto">
        <div className="text-center mb-20 space-y-4">
          <div className="inline-block px-4 py-1.5 rounded-full bg-secondary/30 text-secondary-foreground font-medium text-sm border border-secondary/20 mb-2">
            Why choose us?
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface">
            Designed for <span className="text-primary">personal growth</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto pt-4 leading-relaxed">
            We provide a premium educational experience built from the ground up to focus entirely on your success. No distractions, just learning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="relative p-8 rounded-3xl bg-surface-container-high border border-border/40 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group overflow-hidden z-10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm border border-primary/20">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-on-surface">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
