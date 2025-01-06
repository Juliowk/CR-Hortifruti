import multer, { StorageEngine } from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho para a pasta "uploads"
const uploadsPath = path.resolve(__dirname, "../uploads");

// Verifica se a pasta existe, se não, cria
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true }); // Cria a pasta, incluindo subpastas se necessário
}

const storage: StorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsPath); // Usa o caminho da pasta já verificado/criado
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Adiciona timestamp ao nome do arquivo
  },
});

const upload = multer({ storage });

export default upload;
