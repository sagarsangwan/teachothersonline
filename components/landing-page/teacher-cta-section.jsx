import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import teacherImg from "../../public/teacher.svg";

export default function TeacherCTASection({ session }) {
  return (
    <section className="w-full py-24 bg-surface-container relative">
      <div className="container px-4 md:px-8 mx-auto">
        <div className="bg-surface rounded-3xl overflow-hidden shadow-2xl border border-border">
          <div className="flex flex-col lg:flex-row items-center">
            
            <div className="w-full lg:w-1/2 p-10 md:p-16 flex flex-col justify-center space-y-6">
              <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary w-fit">
                For Educators
              </div>
              
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface leading-tight">
                Teach when you want <br/> and <span className="text-primary">earn</span>.
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Hi <span className="font-bold text-foreground">{session?.user?.name || "Guest"}</span>, want some extra income by teaching? 
                Join our platform, set your subjects, and start accepting demo class requests from students globally.
              </p>
              
              <div className="pt-6">
                <Button size="lg" asChild className="text-md h-14 px-8 rounded-full shadow-lg hover:shadow-primary/25 transition-all w-full sm:w-auto">
                  <Link href="/teacher-application">
                    Apply to be a Teacher
                  </Link>
                </Button>
              </div>
            </div>

            <div className="w-full lg:w-1/2 bg-surface-container-high p-12 lg:p-20 flex justify-center items-center relative min-h-[450px]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"></div>
              <div className="relative w-full max-w-[450px] aspect-square transition-transform duration-700 hover:scale-105 hover:-translate-y-2">
                <Image 
                  src={teacherImg} 
                  alt="Teacher educating online" 
                  fill
                  className="object-contain drop-shadow-xl"
                />
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
