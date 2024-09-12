document.addEventListener('DOMContentLoaded', () => {
    fetchEstados();

    document.getElementById('estados').addEventListener('change', fetchCidades);
});

function fetchEstados() {
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados/')
        .then(response => response.json())
        .then(estados => {
            const estadosSelect = document.getElementById('estados');
            estados.forEach(estado => {
                const option = document.createElement('option');
                option.value = estado.id;
                option.textContent = estado.nome;
                estadosSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Erro ao buscar estados:', error));
}

function fetchCidades() {
    const estadoId = document.getElementById('estados').value;
    if (estadoId) {
        fetch('https://servicodados.ibge.gov.br/api/v1/localidades/distritos')
            .then(response => response.json())
            .then(cidades => {
                const cidadesSelect = document.getElementById('cidades');
                    cidadesSelect.innerHTML = '<option value="">Selecione uma cidade</option>';
                    cidades.forEach(cidade => {
                        const option = document.createElement('option');
                        option.value = cidade.id;
                        option.textContent = cidade.nome;
                        cidadesSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Erro ao buscar cidades:', error));
    } 
    else {
        document.getElementById('cidades').innerHTML = '<option value="">Selecione uma cidade</option>';
    }
}