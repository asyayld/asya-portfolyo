import { useState } from "react";
import { Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

const SERVICES = [
  "Web Sitesi Geliştirme",
  "Uygulama Geliştirme",
  "Tasarım / UI",
  "Bakım & Destek",
  "E-ticaret",
  "Performans İyileştirme",
];

const BUDGETS = [
  { value: "low", label: "5.000 TL'den az" },
  { value: "mid", label: "5.000 - 20.000 TL" },
  { value: "high", label: "20.000 TL'den fazla" },
];

const inputClass =
  "w-full rounded-lg border border-zinc-800 bg-zinc-900/80 px-4 py-3 text-sm text-white placeholder:text-zinc-500 transition-colors focus:border-lime-400 focus:outline-none focus:ring-2 focus:ring-lime-400/25";

const optionClass =
  "flex cursor-pointer items-center gap-2 rounded-lg border border-zinc-800 px-3 py-2.5 text-sm text-zinc-300 transition-colors hover:border-lime-400/40 has-checked:border-lime-400 has-checked:bg-lime-400/5";

export default function ProjectForm() {
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);

  const toggleService = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus("loading");
    setErrorMsg("");

    const fd = new FormData(e.target);

    const payload = {
      fullName: `${fd.get("firstName")} ${fd.get("lastName")}`,
      email: fd.get("email"),
      projectType:
        selectedServices.length > 0
          ? selectedServices.join(", ")
          : "Belirtilmedi",
      budget: fd.get("budget"),
      description: fd.get("message"),
    };

    try {
      const res = await fetch("http://localhost:3000/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      setStatus("success");
      e.target.reset();
      setSelectedServices([]);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  };

  return (
    <div id="work" className="scroll-mt-24">
      <p className="font-mono text-sm text-lime-400/70">
        &gt; iş formu
      </p>

      <h3 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
        Projeni <span className="text-lime-400">anlat</span>
      </h3>

      <p className="mt-3 max-w-lg text-zinc-400">
        Formu doldur ve proje talebini bana gönder.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8"
      >
        <h4 className="text-lg font-semibold text-white">
          İletişim Bilgilerin
        </h4>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">

          <div>
            <label className="mb-1.5 block text-xs text-zinc-500">
              Ad
            </label>

            <input
              name="firstName"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs text-zinc-500">
              Soyad
            </label>

            <input
              name="lastName"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs text-zinc-500">
              E-posta
            </label>

            <input
              type="email"
              name="email"
              required
              className={inputClass}
            />
          </div>
                    <div className="sm:col-span-2">
            <label className="mb-1.5 block text-xs text-zinc-500">
              Şirket
            </label>

            <input
              name="company"
              className={inputClass}
            />
          </div>

        </div>

        <h4 className="mt-8 text-sm font-semibold text-white">
          Hangi hizmetlere ihtiyacın var?
        </h4>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {SERVICES.map((service) => (
            <label
              key={service}
              className={optionClass}
            >
              <input
                type="checkbox"
                checked={selectedServices.includes(service)}
                onChange={() => toggleService(service)}
              />

              {service}
            </label>
          ))}
        </div>

        <h4 className="mt-8 text-sm font-semibold text-white">
          Tahmini Bütçe
        </h4>

        <div className="mt-4 space-y-2">
          {BUDGETS.map(({ value, label }) => (
            <label
              key={value}
              className={optionClass}
            >
              <input
                type="radio"
                name="budget"
                value={value}
                required
              />

              {label}
            </label>
          ))}
        </div>

        <h4 className="mt-8 text-sm font-semibold text-white">
          Proje Detayları
        </h4>

        <textarea
          name="message"
          rows={6}
          required
          className={`${inputClass} mt-3 resize-none`}
          placeholder="Projeni detaylı şekilde anlat..."
        />

        {status === "success" && (
          <p className="mt-4 flex items-center gap-2 text-lime-400">
            <CheckCircle2 size={18} />
            Talebin başarıyla gönderildi.
          </p>
        )}

        {status === "error" && (
          <p className="mt-4 flex items-center gap-2 text-red-400">
            <AlertCircle size={18} />
            {errorMsg}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-lime-400 py-3 font-semibold text-zinc-900 transition hover:bg-lime-300 disabled:opacity-60"
        >
          {status === "loading" ? (
            <>
              <Loader2
                size={18}
                className="animate-spin"
              />
              Gönderiliyor...
            </>
          ) : (
            <>
              <Send size={18} />
              Talebi Gönder
            </>
          )}
        </button>
      </form>
    </div>
  );
}