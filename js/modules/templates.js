export const projetosLista = [
    {
        titulo: "Alimentando Esperanças",
        categoria: "Ação Social",
        descricao: "Distribuição de refeições e cestas básicas para famílias em situação de vulnerabilidade.",
        imagem: "alimentando-esperancas"
    },
    {
        titulo: "Educação para o Futuro",
        categoria: "Educação",
        descricao: "Oficinas de reforço escolar e capacitação digital para jovens da comunidade.",
        imagem: "educacao-futuro"
    }
];

export function renderizarProjetos(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = projetosLista.map(proj => `
        <article class="card">
            <picture>
                <!-- O navegador escolhe o formato mais moderno suportado -->
                <source srcset="assets/img/${proj.imagem}.webp" type="image/webp">
                <img
                    src="assets/img/${proj.imagem}.jpg"
                    alt="${proj.titulo}"
                    loading="lazy"
                    width="400"
                    height="250"
                    style="width: 100%; height: auto; border-radius: 4px;"
                >
            </picture>
            <span class="badge badge-primary">${proj.categoria}</span>
            <h3 style="margin: 10px 0;">${proj.titulo}</h3>
            <p>${proj.descricao}</p>
            <button style="margin-top: 10px; padding: 6px 12px; cursor: pointer;">Saiba Mais</button>
        </article>
    `).join('');
}