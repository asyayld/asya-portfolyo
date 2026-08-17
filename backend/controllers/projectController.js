const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

const Project = require("../models/Project");
// Tüm projeleri getir
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });

    res.json(projects);
  } catch (err) {
    console.error("Projeler alınamadı:", err);

    res.status(500).json({
      message: err.message,
    });
  }
};

// Yeni proje oluştur
const createProject = async (req, res) => {
  try {
    // 1. Formdan gelen bilgileri MongoDB'ye kaydet
    const project = await Project.create(req.body);

    // 2. Mail gönder
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["asyayildiz007@icloud.com"],
      subject: `Yeni İş Talebi - ${project.fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>🚀 Yeni Bir İş Talebi Geldi</h2>

          <p>
            <strong>Ad Soyad:</strong>
            ${project.fullName}
          </p>

          <p>
            <strong>E-posta:</strong>
            ${project.email}
          </p>

          <p>
            <strong>Proje Türü:</strong>
            ${project.projectType}
          </p>

          <p>
            <strong>Bütçe:</strong>
            ${project.budget}
          </p>

          <p>
            <strong>Proje Detayı:</strong>
          </p>

          <p>
            ${project.description}
          </p>
        </div>
      `,
    });

    // 3. Resend hata verdiyse terminalde göster
    if (error) {
      console.error("🔥 RESEND HATASI:", error);

      return res.status(500).json({
        message: "Proje kaydedildi fakat mail gönderilemedi.",
        error: error.message,
      });
    }

    // 4. Mail başarılı
    console.log("✅ MAIL BAŞARIYLA GÖNDERİLDİ:", data);

    // 5. Frontend'e başarılı cevap gönder
    res.status(201).json({
      message: "Talep başarıyla gönderildi.",
      project,
      email: data,
    });
  } catch (err) {
    console.error("🔥 PROJE HATASI:", err);

    res.status(400).json({
      message: err.message,
    });
  }
};

module.exports = {
  getProjects,
  createProject,
};