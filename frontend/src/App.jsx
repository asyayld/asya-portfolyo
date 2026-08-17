import axios from "axios";
import { useEffect, useState } from "react";
import { siteConfig } from "./data/siteConfig";
import Sidebar from "./components/Sidebar";
import Hero from "./components/Hero";
import ProfileImage from "./components/ProfileImage";
import Contact from "./components/Contact";
import Projects from "./components/Projects";

const sections = ["home", "about", "contact", "projects"];

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/profiles"
        );

        console.log("PROFİL:", res.data);

        setProfile(res.data);
      } catch (err) {
        console.error("Profil alınamadı:", err);
      }
    };

    fetchProfile();

    const elements = sections
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => b.intersectionRatio - a.intersectionRatio
          )[0];

        if (visible?.target?.id) {
          setActiveSection(visible.target.id);
        }
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0, 0.25, 0.5],
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleNavigate = (id) => {
    setActiveSection(id);

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] p-10 text-white">
        Yükleniyor...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] pb-20 text-white lg:pb-0 lg:pr-16">
      <div className="mx-auto grid max-w-7xl lg:grid-cols-2">

        {/* SOL TARAF */}
        <div>
          <Hero
            name={profile.fullName}
            title={profile.title}
            about={profile.about}
            stats={siteConfig.stats}
          />

          <div className="px-6 py-8 lg:hidden">
            <ProfileImage />
          </div>

          <Contact
            contact={{
              email: profile.email,
              github: profile.github,
              linkedin: profile.linkedin,
              instagram: profile.instagram,
            }}
          />
        </div>

        {/* SAĞ TARAF */}
        <div className="sticky top-0 hidden h-screen items-center px-8 lg:flex">
          <ProfileImage />
        </div>
      </div>

      {/* SIDEBAR */}
      <Sidebar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        contact={{
          email: profile.email,
          github: profile.github,
          linkedin: profile.linkedin,
          instagram: profile.instagram,
        }}
      />
    </div>
  );
}

export default App;