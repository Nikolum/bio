// Функции для отображения форм
document.getElementById('login-btn').addEventListener('click', () => {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('register-form').style.display = 'none';
});

document.getElementById('register-btn').addEventListener('click', () => {
    document.getElementById('register-form').style.display = 'block';
    document.getElementById('login-form').style.display = 'none';
});

// Функция регистрации
function register() {
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;

    if (username && password) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.find(user => user.username === username);

        if (userExists) {
            alert('Такой пользователь уже существует');
        } else {
            users.push({ username, password });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Регистрация прошла успешно');
            document.getElementById('register-form').style.display = 'none';
        }
    } else {
        alert('Пожалуйста, заполните все поля');
    }
}

// Функция входа
function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        localStorage.setItem('currentUser', username);
        alert('Вход выполнен');
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('welcome-message').innerText = `Привет, ${username}`;
        document.getElementById('logout-btn').style.display = 'inline-block';
        document.getElementById('login-btn').style.display = 'none';
        document.getElementById('register-btn').style.display = 'none';
        document.getElementById('forum').style.display = 'block';
        loadPosts();
    } else {
        alert('Неверные данные');
    }
}

// Функция выхода
document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    location.reload();
});

// Функция создания поста
function createPost() {
    const content = document.getElementById('post-content').value;
    const username = localStorage.getItem('currentUser');

    if (content && username) {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.push({ username, content });
        localStorage.setItem('posts', JSON.stringify(posts));
        document.getElementById('post-content').value = '';
        loadPosts();
    } else {
        alert('Вы не можете создать пост без входа');
    }
}

// Функция загрузки постов
function loadPosts() {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = '';

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.innerHTML = `<strong>${post.username}</strong>: ${post.content}`;
        postsContainer.appendChild(postElement);
    });
}
