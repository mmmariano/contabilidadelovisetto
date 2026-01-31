
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

    // FUNÇÃO QUE CONECTA COM O SEU PHP NA HOSTINGER
    async function handleForm(event) {
        event.preventDefault(); // Impede a página de recarregar

        const btn = event.target.querySelector('button');
        const originalText = btn.innerText;

        // Captura os valores dos campos
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const whatsapp = document.getElementById('whatsapp').value;

        // Feedback visual: desabilita o botão enquanto envia
        btn.innerText = "Enviando...";
        btn.disabled = true;

        const dadosParaEnviar = {
            nome: nome,
            email: email,
            telefone: whatsapp // Enviamos como 'telefone' para bater com seu PHP
        };

        try {
            // AQUI VOCÊ CONECTA COM O SEU LINK DA HOSTINGER
            const resposta = await fetch('https://vrindabhumi.org/enviar.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dadosParaEnviar)
            });

            const resultado = await resposta.json();

            if (resultado.status === "sucesso") {
                alert('✅ Sucesso, ' + nome + '! Recebemos seu interesse. Entraremos em contato em breve.');
                document.getElementById('formCadastro').reset();
                closeModal();
            } else {
                alert('❌ Erro do servidor: ' + resultado.message);
            }

        } catch (error) {
            console.error('Erro ao enviar:', error);
            alert('❌ Erro na conexão. Verifique se o arquivo PHP está online.');
        } finally {
            // Restaura o botão
            btn.innerText = originalText;
            btn.disabled = false;
        }
    }