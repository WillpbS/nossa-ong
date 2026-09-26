import { salvarDadosVoluntario, carregarDadosSalvos } from './modules/storage.js';
import { validarEmail } from './modules/validacao.js';
import { renderizarProjetos } from './modules/templates.js';

// Função auxiliar para validar tamanhos e aplicar cor vermelha/verde
// IMPORTANTE: conta apenas os DÍGITOS digitados (ignora ".", "-", "(", ")", espaço).
// Assim a validação continua funcionando mesmo se a máscara do IMask não carregar
// (ex: CDN bloqueado, offline, ad-blocker) - antes, o código comparava
// input.value.length com o tamanho já formatado (com máscara), o que travava
// o formulário para sempre caso o IMask falhasse.
function validarCampoVisual(input, spanErro, digitosExigidos) {
    const apenasDigitos = input.value.replace(/\D/g, '');
    if (apenasDigitos.length < digitosExigidos) {
        input.classList.add('campo-invalido');
        input.classList.remove('campo-valido');
        input.setAttribute('aria-invalid', 'true');
        if (spanErro) spanErro.style.display = 'block';
        return false;
    } else {
        input.classList.add('campo-valido');
        input.classList.remove('campo-invalido');
        input.setAttribute('aria-invalid', 'false');
        if (spanErro) spanErro.style.display = 'none';
        return true;
    }
}

// Validação simples do nome (antes dependia 100% do "required" nativo do navegador,
// que deixa de bloquear o envio quando adicionamos "novalidate" no form)
function validarNome(input) {
    const valido = input.value.trim().length > 0;
    input.classList.toggle('campo-invalido', !valido);
    input.classList.toggle('campo-valido', valido);
    input.setAttribute('aria-invalid', String(!valido));
    return valido;
}

function inicializarAplicacao() {
    renderizarProjetos('lista-projetos');
    carregarDadosSalvos();

    // Referências dos campos e spans de erro
    const inputNome = document.getElementById('nome');
    const inputCPF = document.getElementById('cpf');
    const erroCPF = document.getElementById('erro-cpf');
    
    const inputWhatsApp = document.getElementById('whatsapp');
    const erroWhatsApp = document.getElementById('erro-whatsapp');
    
    const inputCEP = document.getElementById('cep');
    const erroCEP = document.getElementById('erro-cep');

    const inputEmail = document.getElementById('email');
    const erroEmail = document.getElementById('erro-email');

    // 1. Aplicação de Máscaras (O IMask já bloqueia letras automaticamente se configurado com '0')
    if (typeof window.IMask !== 'undefined') {
        if (inputWhatsApp) window.IMask(inputWhatsApp, { mask: '(00) 00000-0000' });
        if (inputCEP) window.IMask(inputCEP, { mask: '00000-000' });
        if (inputCPF) window.IMask(inputCPF, { mask: '000.000.000-00' });
    }

    // 2. Eventos para validação visual ao sair do campo (blur) ou digitar
    if (inputNome) inputNome.addEventListener('input', () => validarNome(inputNome));
    if (inputCPF) inputCPF.addEventListener('input', () => validarCampoVisual(inputCPF, erroCPF, 11)); // 11 dígitos
    if (inputWhatsApp) inputWhatsApp.addEventListener('input', () => validarCampoVisual(inputWhatsApp, erroWhatsApp, 11)); // DDD + 9 dígitos
    if (inputCEP) inputCEP.addEventListener('input', () => validarCampoVisual(inputCEP, erroCEP, 8)); // 8 dígitos
    if (inputEmail) inputEmail.addEventListener('input', () => validarEmail(inputEmail, erroEmail));

    // 3. Validação final no envio do formulário
    const form = document.getElementById('form-cadastro');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Trava o envio para validar primeiro

            const nomeValido = validarNome(inputNome);
            const emailValido = validarEmail(inputEmail, erroEmail);
            const cpfValido = validarCampoVisual(inputCPF, erroCPF, 11);
            const wppValido = validarCampoVisual(inputWhatsApp, erroWhatsApp, 11);
            const cepValido = validarCampoVisual(inputCEP, erroCEP, 8);

            // Se algum campo estiver inválido, bloqueia o processo
            if (!nomeValido || !emailValido || !cpfValido || !wppValido || !cepValido) {
                alert('Por favor, corrija os campos em vermelho antes de enviar o formulário.');
                return;
            }

            // Se passou em tudo, salva os dados
            const dadosForm = {
                nome: document.getElementById('nome')?.value || '',
                cpf: inputCPF?.value || '',
                email: inputEmail?.value || '',
                whatsapp: inputWhatsApp?.value || '',
                cep: inputCEP?.value || ''
            };

            salvarDadosVoluntario(dadosForm);
            alert('Cadastro de Voluntário realizado com sucesso!');
            form.reset();
            
            // Limpa as bordas verdes após enviar
            document.querySelectorAll('input').forEach(input => input.classList.remove('campo-valido'));
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarAplicacao);
} else {
    inicializarAplicacao();
}