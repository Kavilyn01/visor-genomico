import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3000;

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Ruta API para buscar datos genómicos de Ensembl
app.get('/api/genomics', async (req, res) => {
    const geneId = req.query.gene; // Obtener el parámetro de búsqueda del query
    if (!geneId) {
        return res.status(400).json({ error: 'Se requiere un parámetro de búsqueda' });
    }

    try {
        // Endpoint para buscar un gen específico en Ensembl
        const response = await fetch(`https://rest.ensembl.org/lookup/symbol/homo_sapiens/${geneId}?content-type=application/json`);
        
        if (!response.ok) {
            throw new Error('Error al obtener datos de la API de Ensembl');
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error al conectar con la base de datos genómica' });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
