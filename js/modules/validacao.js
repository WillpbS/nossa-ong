export function validarEmail(inputElement, msgErroElement) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const ehValido = regexEmail.test(inputElement.value);

    if (!ehValido) {
        inputElement.classList.add('campo-invalido');
        inputElement.classList.remove('campo-valido');
        inputElement.setAttribute('aria-invalid', 'true');
        if (msgErroElement) msgErroElement.style.display = 'block';
    } else {
        inputElement.classList.add('campo-valido');
        inputElement.classList.remove('campo-invalido');
        inputElement.setAttribute('aria-invalid', 'false');
        if (msgErroElement) msgErroElement.style.display = 'none';
    }
    return ehValido;
}