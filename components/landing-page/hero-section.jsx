import Image from "next/image";
import DemoClassStudent from "../student/demo-class-form";
import studentlearn from "../../public/studentlearn.svg";

export default function HeroSection() {
  return (
    <section className="w-full py-20 lg:py-32 bg-gradient-to-b from-surface-container to-surface relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-secondary/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" style={{ animationDelay: "2s" }}></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-accent/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" style={{ animationDelay: "4s" }}></div>

      <div className="container px-4 md:px-8 mx-auto relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-8">
          
          <div className="w-full lg:w-1/2 flex flex-col space-y-8">
            <div className="space-y-6">
              <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm border border-primary/20 mb-2">
                🚀 The future of online learning
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-on-surface leading-tight">
                Master any subject <br/> with <span className="text-primary underline decoration-wavy decoration-accent underline-offset-8">expert</span> tutors.
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-[600px] leading-relaxed">
                Request a demo, connect with a verified teacher, and start learning instantly in our interactive virtual classrooms designed for 1-on-1 focus.
              </p>
            </div>

            <div className="w-full sm:w-[400px] bg-card rounded-3xl p-8 shadow-2xl border border-border relative">
              <div className="absolute -top-4 -right-4 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full shadow-sm transform rotate-12">
                Free Demo
              </div>
              <h3 className="text-2xl font-bold mb-6 text-card-foreground">Book your first class</h3>
              <DemoClassStudent />
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-full filter blur-3xl transform scale-75"></div>
            <div className="relative w-full max-w-[550px] aspect-square transition-transform duration-700 hover:scale-105 hover:-rotate-1">
              <Image 
                src={studentlearn} 
                alt="Student learning online" 
                fill
                priority
                className="object-contain drop-shadow-2xl"
              />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
