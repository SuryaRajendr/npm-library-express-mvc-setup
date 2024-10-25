import fs from 'fs';
import path from 'path';

function generateMvcStructure(basePath, language) {
  const ext = language === 'TypeScript' ? 'ts' : 'js';
  const folders = ['controllers', 'models', 'routes', 'middlewares', 'views', 'config'];

  folders.forEach(folder => {
    const folderPath = path.join(basePath, folder);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
      console.log(`Created folder: ${folder}`);
    }
  });

  fs.writeFileSync(path.join(basePath, `routes/index.${ext}`), "// Sample route file");
  fs.writeFileSync(path.join(basePath, `controllers/homeController.${ext}`), "// Sample controller file");
  fs.writeFileSync(path.join(basePath, `models/sampleModel.${ext}`), "// Sample model file");
  fs.writeFileSync(path.join(basePath, `middlewares/logger.${ext}`), "// Sample middleware");
  fs.writeFileSync(path.join(basePath, `views/index.${ext}`), "// Sample view");

  console.log(`MVC structure generated successfully with ${language}!`);
}

// module.exports = generateMvcStructure;

export default generateMvcStructure;
