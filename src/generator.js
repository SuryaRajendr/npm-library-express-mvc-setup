import fs from 'fs';
import path from 'path';

function generateMvcStructure(basePath, language, addSwagger) {
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

  if (addSwagger) {
    addSwaggerSetup(basePath, ext);
    console.log('Swagger setup added.');
  }

  console.log(`MVC structure generated successfully with ${language}!`);
}

function addSwaggerSetup(basePath, ext) {
  const swaggerConfig = `
    const swaggerJsDoc = require('swagger-jsdoc');
    const swaggerUi = require('swagger-ui-express');

    const swaggerOptions = {
      swaggerDefinition: {
        openapi: '3.0.0',
        info: {
          title: 'API Documentation',
          version: '1.0.0',
          description: 'API Information',
        },
        servers: [{ url: 'http://localhost:3000' }],
      },
      apis: ['./routes/*.${ext}'],
    };

    const swaggerDocs = swaggerJsDoc(swaggerOptions);
    module.exports = { swaggerUi, swaggerDocs };
  `;

  const swaggerSetup = `
    const express = require('express');
    const { swaggerUi, swaggerDocs } = require('./config/swaggerConfig');

    const app = express();
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  `;

  // Create Swagger config file
  const configPath = path.join(basePath, `config/swaggerConfig.${ext}`);
  fs.writeFileSync(configPath, swaggerConfig.trim());

  // Update main app setup with Swagger
  const appSetupPath = path.join(basePath, `app.${ext}`);
  fs.writeFileSync(appSetupPath, swaggerSetup.trim());
}

export default generateMvcStructure;
