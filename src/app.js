const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// API (para tests y uso técnico)
app.get('/api', (req, res) => {
  res.json({
    message: 'Hola Mundo!',
    status: 'ok',
    version: process.env.npm_package_version || '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Health check (para DevOps / deploy)
app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// Página web visual
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>DevOps Final</title>
        <style>
          body {
            font-family: Arial;
            text-align: center;
            background-color: #0f172a;
            color: white;
          }
          .card {
            background: #1e293b;
            padding: 25px;
            margin: 60px auto;
            width: 320px;
            border-radius: 12px;
            box-shadow: 0 0 15px rgba(0,0,0,0.3);
          }
          .status {
            color: #22c55e;
            font-weight: bold;
          }
          .title {
            font-size: 22px;
            margin-bottom: 10px;
          }
          .footer {
            margin-top: 15px;
            font-size: 12px;
            color: #94a3b8;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="title">DevOps CI/CD de Sandel Arache 2023-1070 App</div>
          <p><strong>Estado:</strong> <span class="status">OK</span></p>
          <p><strong>Versión:</strong> ${process.env.npm_package_version || '1.0.0'}</p>
          <p><strong>Fecha:</strong> ${new Date().toLocaleString()}</p>
          <div class="footer">
            CI/CD funcionando correctamente
          </div>
        </div>
      </body>
    </html>
  `);
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

module.exports = app;