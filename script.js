
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
    event.preventDefault();

    const btn = event.target.querySelector('button');
    const originalText = btn.innerText;

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const whatsapp = document.getElementById('whatsapp').value;

    btn.innerText = "Enviando...";
    btn.disabled = true;

    const dadosParaEnviar = {
        nome: nome,
        email: email,
        telefone: whatsapp
    };

    try {
        const resposta = await fetch('https://vrindabhumi.org/enviar.php', {
            method: 'POST',
            mode: 'cors', // Força o modo CORS
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosParaEnviar)
        });

        // Primeiro lemos como texto para ver se não há erros de PHP misturados
        const textoParaDebug = await resposta.text();
        console.log("Resposta bruta do servidor:", textoParaDebug);

        const resultado = JSON.parse(textoParaDebug);

        if (resultado.status === "sucesso") {
            alert('✅ Sucesso! Recebemos seu interesse.');
            document.getElementById('formCadastro').reset();
            closeModal();
        } else {
            alert('❌ Erro: ' + resultado.message);
        }

    } catch (error) {
        console.error('Erro detalhado:', error);
        alert('❌ Erro na conexão. Tente pelo WhatsApp lateral.');
    } finally {
        btn.innerText = originalText;
        btn.disabled = false;
    }
}