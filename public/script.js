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

            if (data.length === 0) {
                resultsContainer.textContent = 'No se encontraron resultados para el gen ingresado.';
                return;
            }

            data.forEach(gene => {
                const geneElement = document.createElement('div');
                geneElement.classList.add('gene-info');
                geneElement.innerHTML = `
                    <strong>Nombre del Gen:</strong> ${gene.display_id}<br>
                    <strong>Tipo:</strong> ${gene.db_display_name}<br>
                    <strong>Descripción:</strong> ${gene.description || 'No disponible'}<br>
                    <hr>
                `;
                resultsContainer.appendChild(geneElement);
            });

            // Agregar el mensaje personalizado después de los resultados
            const messageElement = document.createElement('div');
            messageElement.classList.add('personal-message');
            messageElement.textContent = "pero mira que te lo pasas bien Alejandrito";
            resultsContainer.appendChild(messageElement);
        })
        .catch(error => {
            alert('Error al cargar los datos genómicos');
            console.error(error);
        });
});

