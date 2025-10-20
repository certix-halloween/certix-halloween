import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Palette, Database, Brain } from "lucide-react";
import ai from "../assets/1.jpg";
import design from "../assets/2.jpg";
import ui from "../assets/3.jpg";
import qa from "../assets/4.jpg";
import { useEffect, useState } from "react";
import React from "react";

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

type Course = {
  icon: IconType;
  title: string;
  description: string;
  duration: string;
  image: string;
};

const CoursesSection: React.FC = () => {
  const courses: Course[] = [
    {
      icon: Code,
    title: "Certix Certified UI/UX Architect",
      description: "Master the dark arts of web development with React, Node.js, and more",
      duration: "6 months",
      image: ai,
    },
    {
      icon: Palette,
      title: "Certix Certified Quality Assurance Engineer",
      description: "Conjure stunning designs with UI/UX magic and modern tools",
      duration: "4 months",
      image: design,
    },
    {
      icon: Database,
      title: "Certix Certified Creative Designer",
      description: "Resurrect insights from data using AI and machine learning",
      duration: "8 months",
      image: ui,
    },
    {
      icon: Brain,
      title: "Certix Certified IOT & Robotics Engineer",
      description: "Harness the power of artificial intelligence and deep learning",
      duration: "10 months",
      image: qa,
    },
  ];

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="courses" className="py-20 bg-[#0b0b0b] text-slate-100">
      {/* Local helpers for custom animations/tilt */}
      <style>{`
        @keyframes floatSlow {
          0% { transform: translateY(0) }
          50% { transform: translateY(-6px) }
          100% { transform: translateY(0) }
        }
        @keyframes swaySlow {
          0% { transform: rotate(-1deg) }
          50% { transform: rotate(1deg) }
          100% { transform: rotate(-1deg) }
        }
        @keyframes pulseSlow {
          0%, 100% { opacity: 1 }
          50% { opacity: .7 }
        }
        .animate-float { animation: floatSlow 6s ease-in-out infinite; }
        .animate-sway { animation: swaySlow 7s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulseSlow 2.8s ease-in-out infinite; }
        .card-hover-tilt:hover {
          transform: translateY(-8px) rotate3d(0.2, -0.3, 0, 0.6deg);
        }
      `}</style>

      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white/90">Haunted </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-green-600">
              Courses
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Explore our spellbinding curriculum designed to transform you into a tech wizard
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <Card
                  key={index}
                  className="relative overflow-hidden p-6 border-2 border-green-600/30 bg-[#0e0e0e]/60 animate-pulse"
                >
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-green-900/30 rounded-lg"></div>
                    <div className="h-5 w-3/4 bg-white/20 rounded"></div>
                    <div className="h-4 w-full bg-white/10 rounded"></div>
                    <div className="h-4 w-5/6 bg-white/10 rounded"></div>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="h-4 w-20 bg-white/10 rounded"></span>
                      <span className="h-8 w-24 bg-green-500/20 rounded"></span>
                    </div>
                  </div>
                </Card>
              ))
            : courses.map((course, index) => (
                <Card
                  key={index}
                  className="relative overflow-hidden p-6 border-2 border-green-600/70 hover:border-green-400 transition-all duration-300 transform will-change-transform card-hover-tilt hover:shadow-[0_0_30px_rgba(16,185,129,0.18)] group cursor-pointer bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url(${course.image})`,
                  }}
                >
                  <div className="pointer-events-none absolute -top-12 -left-12 w-48 h-48 bg-green-500/10 blur-2xl rounded-full animate-sway"></div>
                  <div className="pointer-events-none absolute -bottom-16 -right-16 w-56 h-56 bg-green-400/10 blur-3xl rounded-full animate-float"></div>

                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-900/40 to-green-800/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform animate-float">
                      <course.icon className="w-8 h-8 text-green-400" />
                    </div>

                    <h3 className="text-xl font-bold text-white">{course.title}</h3>
                    <p className="text-slate-400">{course.description}</p>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="text-sm text-slate-400">⏱️ {course.duration}</span>
                      <Button variant="ghost" size="sm" className="text-green-400 hover:text-green-300 animate-pulse-slow">
                        Learn More →
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-gradient-to-r from-green-600 to-green-500 text-white hover:shadow-[0_0_30px_rgba(16,185,129,0.35)] transition-all duration-300"
          >
            👻 View All Courses
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
