import { useEffect, useState } from "react";
import axios from "axios";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/projects");

        console.log("PROJELER:", res.data);

        setProjects(res.data);
      } catch (err) {
        console.error("PROJE HATASI:", err);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="px-6 py-20 lg:px-10">
      <h2 className="text-4xl font-bold">
        Projelerim
      </h2>

      {projects.length === 0 ? (
        <p className="mt-5 text-zinc-400">
          Proje bulunamadı.
        </p>
      ) : (
        <div className="mt-8 space-y-4">
          {projects.map((project) => (
            <div
              key={project._id}
              className="rounded-xl border border-zinc-800 bg-zinc-900 p-6"
            >
              <h3 className="text-xl font-bold">
                {project.projectType}
              </h3>

              <p className="mt-3 text-zinc-400">
                {project.description}
              </p>

              <p className="mt-3 text-lime-400">
                Bütçe: {project.budget}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}