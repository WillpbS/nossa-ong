export function salvarDadosVoluntario(dados) {
    try {
        localStorage.setItem('voluntario_dados', JSON.stringify(dados));
    } catch (e) {
        console.error('Erro ao salvar no localStorage:', e);
    }
}

export function carregarDadosSalvos() {
    try {
        const dadosGuardados = localStorage.getItem('voluntario_dados');
        if (dadosGuardados) {
            const dados = JSON.parse(dadosGuardados);
            if (dados.nome && document.querySelector('#nome')) document.querySelector('#nome').value = dados.nome;
            if (dados.cpf && document.querySelector('#cpf')) document.querySelector('#cpf').value = dados.cpf;
            if (dados.email && document.querySelector('#email')) document.querySelector('#email').value = dados.email;
            if (dados.whatsapp && document.querySelector('#whatsapp')) document.querySelector('#whatsapp').value = dados.whatsapp;
            if (dados.cep && document.querySelector('#cep')) document.querySelector('#cep').value = dados.cep;
        }
    } catch (e) {
        console.error('Erro ao ler do localStorage:', e);
    }
}