const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

document.addEventListener('DOMContentLoaded', () => {
    fetchPosts();

    document.getElementById('postForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const body = document.getElementById('body').value;

        await createPost({ title, body });
        fetchPosts();
    });
});

// Получение постов
async function fetchPosts() {
    const response = await fetch(apiUrl);
    const posts = await response.json();
    const postList = document.getElementById('postList');
    postList.innerHTML = '';

    posts.forEach(post => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${post.title}</strong>
            <p>${post.body}</p>
            <button onclick="editPost(${post.id})">Изменить</button>
            <button class="delete" onclick="deletePost(${post.id})">Удалить</button>
        `;
        postList.appendChild(li);
    });
}

// Создание нового поста
async function createPost(post) {
    await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    });
}

// Изменение поста
async function editPost(id) {
    const title = prompt('Введите новый заголовок:');
    const body = prompt('Введите новое содержание:');

    await fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, title, body })
    });

    fetchPosts();
}

// Удаление поста
async function deletePost(id) {
    await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    });
    fetchPosts();
}
