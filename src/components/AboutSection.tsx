import { Card } from "@/components/ui/card";
import { BookOpen, Users, Trophy } from "lucide-react";
import bgimage from "../assets/images/CERTIX_Halloween_Horror_Luminous.png";

const AboutSection = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Mystical Learning",
      description:
        "Dive into enchanted knowledge with cutting-edge curriculum",
    },
    {
      icon: Users,
      title: "Haunted Community",
      description: "Join a spellbinding community of future innovators",
    },
    {
      icon: Trophy,
      title: "Dark Excellence",
      description: "Achieve supernatural success in your career path",
    },
  ];

  return (
    <section
      id="about"
      className="relative min-h-screen py-16 lg:py-24 text-[#E7F0E8] flex items-center overflow-hidden"
    >
      {/* 🧛‍♂️ Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgimage})`,
        }}
      ></div>

      {/* 👻 Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative container mx-auto px-6 lg:px-8 max-w-7xl w-full">
        {/* 🪞 Transparent backdrop for the grid */}
        <div
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center 
          bg-white/5 backdrop-blur-[10px] rounded-2xl p-8 lg:p-12 
          border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.2)] 
          transition-all duration-500 hover:bg-white/10 hover:backdrop-blur-md"
        >
          {/* ----- Left Text ----- */}
          <div className="space-y-8 lg:space-y-10">
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
              <span className="text-[#E7F0E8]">Our Story, </span>
              <span className="text-[#9AD79E]">Your Future</span>
            </h2>

            <div className="space-y-6 text-base lg:text-lg">
              <p className="text-[#C9D3C9] leading-relaxed">
                At Certix Institute, we're not just redefining higher education,
                we're reimagining the entire journey of learning and career
                growth for the 21st century. More than just a place to study,
                Certix is a launchpad for the next generation of innovators,
                creators, and leaders.
              </p>

              <p className="text-[#C9D3C9] leading-relaxed">
                From your very first day, you'll dive into a world of live
                projects, hands-on training, and immersive industry experiences.
                Our programs are designed to bridge the gap between theory and
                practice, blending academic excellence with real-world
                application.
              </p>

              <p className="text-[#C9D3C9] leading-relaxed">
                You won't just learn about the future; you'll build it, using
                cutting-edge tools and technologies that leading companies use
                today.
              </p>
            </div>
          </div>

          {/* ----- Right Cards ----- */}
          <div className="space-y-4 lg:space-y-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-6 lg:p-8 bg-[#151717]/70 border border-[#232826] 
                hover:border-[#9AD79E]/50 transition-all duration-300 
                hover:shadow-[0_0_25px_rgba(154,215,158,0.3)] 
                group rounded-xl backdrop-blur-sm"
              >
                <div className="flex items-start gap-4 lg:gap-5">
                  <div
                    className="p-3 lg:p-4 bg-[#9AD79E1A] rounded-lg 
                    group-hover:bg-[#9AD79E33] transition-colors shrink-0"
                  >
                    <feature.icon className="w-5 h-5 lg:w-6 lg:h-6 text-[#9AD79E]" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg lg:text-xl font-bold text-[#E7F0E8]">
                      {feature.title}
                    </h3>
                    <p className="text-sm lg:text-base text-[#A5B5A6] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
