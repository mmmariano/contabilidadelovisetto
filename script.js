
    function openModal() {
        document.getElementById('modalCadastro').style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        document.getElementById('modalCadastro').style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // FECHA O MODAL AO CLICAR FORA DELE
    window.onclick = function(event) {
        const modal = document.getElementById('modalCadastro');
        if (event.target == modal) closeModal();
    }
    async function handleForm(event) {
    event.preventDefault(); // Impede a página de recarregar

    const btn = event.target.querySelector('button');
    const originalText = btn.innerText;

    // Captura os valores dos campos
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const whatsapp = document.getElementById('whatsapp').value;

    // Feedback visual
    btn.innerText = "Enviando...";
    btn.disabled = true;

    // Monta o objeto de dados para o Formspree
    const dadosParaEnviar = {
        nome: nome,
        email: email,
        whatsapp: whatsapp,
        _subject: "Novo Lead - Contabilidade Lovisetto" // Assunto do e-mail
    };

    try {
        const resposta = await fetch('https://formspree.io/f/mgozadry', {
            method: 'POST',
            body: JSON.stringify(dadosParaEnviar),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (resposta.ok) {
            alert('✅ Sucesso, ' + nome + '! Recebemos seus dados. Entraremos em contato em breve.');
            document.getElementById('formCadastro').reset();
            closeModal();
        } else {
            const erroData = await resposta.json();
            alert('❌ Erro: ' + (erroData.errors ? erroData.errors[0].message : 'Não foi possível enviar.'));
        }

    } catch (error) {
        console.error('Erro ao enviar:', error);
        alert('❌ Erro na conexão. Verifique sua internet ou tente novamente mais tarde.');
    } finally {
        // Restaura o botão
        btn.innerText = originalText;
        btn.disabled = false;
    }
}