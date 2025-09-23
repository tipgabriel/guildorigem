// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Função para carregar membros na página members.html
    const loadMembers = async () => {
        const membersList = document.getElementById('members-list');
        if (!membersList) return; // Sai se não estiver na página de membros

        try {
            const response = await fetch('./data/members.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const members = await response.json();
            
            membersList.innerHTML = ''; // Limpa os membros de exemplo (se houver)

            members.forEach(member => {
                const memberCard = `
                    <div class="bg-aqw-dark p-6 rounded-lg shadow-lg border border-aqw-gold border-opacity-30 flex flex-col items-center text-center transform hover:scale-105 transition duration-300">
                        <img src="${member.avatar || 'https://via.placeholder.com/100/FFCC00/1A202C?text=Hero'}" alt="Avatar do Membro" class="w-24 h-24 rounded-full object-cover mb-4 border-2 border-aqw-gold">
                        <h2 class="text-2xl font-semibold text-aqw-gold mb-2">${member.username}</h2>
                        <p class="text-aqw-light-gray text-opacity-80 mb-2">Classe: ${member.class}</p>
                        <p class="text-sm text-aqw-light-gray text-opacity-60">"${member.bio}"</p>
                        <a href="#" class="mt-4 bg-aqw-blue text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">Ver Perfil</a>
                    </div>
                `;
                membersList.innerHTML += memberCard;
            });

            // Botão "Carregar Mais" - exemplo simples
            const loadMoreButton = document.getElementById('load-more-members');
            if (loadMoreButton) {
                loadMoreButton.addEventListener('click', () => {
                    alert('Funcionalidade de carregar mais membros (requer backend real).');
                    // Aqui você implementaria a lógica para carregar mais dados de um backend
                });
            }

        } catch (error) {
            console.error('Erro ao carregar membros:', error);
            if (membersList) {
                membersList.innerHTML = '<p class="text-center text-red-500">Erro ao carregar membros. Tente novamente mais tarde.</p>';
            }
        }
    };

    // Função para lidar com o envio do formulário de Login
    const handleLogin = (event) => {
        event.preventDefault();
        const username = document.getElementById('username-login').value;
        const password = document.getElementById('password-login').value;

        // Simulação de login
        if (username === 'test' && password === '123') {
            alert('Login bem-sucedido! Bem-vindo, ' + username + '!');
            window.location.href = 'index.html'; // Redireciona para a página inicial
        } else {
            alert('Nome de usuário ou senha inválidos.');
        }
    };

    // Função para lidar com o envio do formulário de Cadastro
    const handleSignup = (event) => {
        event.preventDefault();
        const username = document.getElementById('username-signup').value;
        const email = document.getElementById('email-signup').value;
        const password = document.getElementById('password-signup').value;
        const confirmPassword = document.getElementById('confirm-password-signup').value;

        if (password !== confirmPassword) {
            alert('As senhas não coincidem!');
            return;
        }

        // Simulação de cadastro
        alert(`Conta para ${username} criada com sucesso! Verifique seu email para ativação.`);
        window.location.href = 'login.html'; // Redireciona para a página de login
    };

    // Função para adicionar um novo post de interação
    const addNewPost = (title, content) => {
        const postsContainer = document.getElementById('posts-container');
        if (!postsContainer) return;

        const newPost = `
            <div class="bg-aqw-dark p-6 rounded-lg shadow-lg border border-aqw-gold border-opacity-30 hover:border-aqw-red transition duration-300">
                <h3 class="text-2xl font-semibold text-aqw-gold mb-2">${title}</h3>
                <p class="text-aqw-light-gray text-opacity-80 text-sm mb-3">Publicado por <span class="text-aqw-blue font-medium">Você</span> agora mesmo</p>
                <p class="text-aqw-light-gray">${content}</p>
                <div class="mt-4 flex justify-end">
                    <a href="#" class="text-aqw-blue hover:underline">Ver Discussão (0 Comentários)</a>
                </div>
            </div>
        `;
        postsContainer.insertAdjacentHTML('afterbegin', newPost); // Adiciona no início
    };

    // Lógica para a página de Interação
    const newPostForm = document.getElementById('new-post-form');
    if (newPostForm) {
        newPostForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const title = document.getElementById('post-title').value;
            const content = document.getElementById('post-content').value;
            if (title && content) {
                addNewPost(title, content);
                newPostForm.reset(); // Limpa o formulário
                alert('Publicação criada com sucesso!');
            } else {
                alert('Por favor, preencha o título e o conteúdo da publicação.');
            }
        });
    }


    // Adiciona event listeners aos formulários
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }

    // Chama a função para carregar membros quando a página for members.html
    if (window.location.pathname.includes('members.html')) {
        loadMembers();
    }
});
