import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/api/genomics', async (req, res) => {
  const geneQuery = req.query.gene;
  if (!geneQuery) {
    return res.status(400).json({ error: 'Se requiere un parámetro de búsqueda' });
  }

  try {
    const formattedQuery = geneQuery.replace('*', '%');
    const response = await fetch(`https://rest.ensembl.org/xrefs/symbol/homo_sapiens/${formattedQuery}?content-type=application/json`);

    if (!response.ok) {
      throw new Error('Error al obtener datos de la API de Ensembl');
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al conectar con la base de datos genómica' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
