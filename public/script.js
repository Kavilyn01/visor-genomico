document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío del formulario por defecto

    const geneInput = document.getElementById('geneInput').value.trim();
    if (geneInput === '') {
        alert('Por favor, introduce el nombre o ID del gen.');
        return;
    }

    fetch(`/api/genomics?gene=${geneInput}`)
        .then(response => response.json())
        .then(data => {
            const resultsContainer = document.getElementById('results');
            resultsContainer.innerHTML = '';

            if (data.error) {
                resultsContainer.textContent = 'No se encontraron resultados para el gen ingresado.';
                return;
            }

            // Mostrar datos relevantes del gen
            const geneElement = document.createElement('div');
            geneElement.classList.add('gene-info');
            geneElement.innerHTML = `
                <strong>Nombre del Gen:</strong> ${data.display_name}<br>
                <strong>ID del Gen:</strong> ${data.id}<br>
                <strong>Ubicación:</strong> ${data.location}<br>
                <strong>Descripción:</strong> ${data.description || 'No disponible'}
            `;
            resultsContainer.appendChild(geneElement);
        })
        .catch(error => {
            alert('Error al cargar los datos genómicos');
            console.error(error);
        });
});
