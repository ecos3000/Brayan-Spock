import express from "express";
import { createServer as createViteServer } from "vite";
import fs from "fs";
import path from "path";
import cors from "cors";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json({ limit: '50mb' }));

  // API para persistir cambios en el código fuente
  app.post("/api/save-content", (req, res) => {
    try {
      const { content } = req.body;
      const filePath = path.join(process.cwd(), 'src', 'site-content.json');
      
      let existingContent: any = {};
      if (fs.existsSync(filePath)) {
        existingContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      }

      // Merge profundo básico
      const updatedContent = {
        ...existingContent,
        ...content,
        hero: { ...(existingContent.hero || {}), ...(content.hero || {}) },
        metrics: content.metrics || existingContent.metrics,
        socials: content.socials || existingContent.socials,
        timestamp: new Date().toISOString()
      };
      
      fs.writeFileSync(filePath, JSON.stringify(updatedContent, null, 2), 'utf-8');
      console.log("✅ Contenido actualizado en site-content.json");
      
      res.json({ success: true, message: "Cambios guardados en el código fuente" });
    } catch (error) {
      console.error("❌ Error al guardar:", error);
      res.status(500).json({ success: false, error: "Error al escribir en el disco" });
    }
  });

  // API para obtener el contenido actual
  app.get("/api/get-content", (req, res) => {
    try {
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      
      const filePath = path.join(process.cwd(), 'src', 'site-content.json');
      if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf-8');
        res.json(JSON.parse(data));
      } else {
        res.status(404).json({ error: "Archivo no encontrado" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error al leer" });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Servidor CMS funcionando en http://localhost:${PORT}`);
  });
}

startServer();
