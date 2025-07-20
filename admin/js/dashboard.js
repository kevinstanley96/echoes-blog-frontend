let editMode = false;
let editId = null;

const form = document.getElementById('postForm');
const postsList = document.getElementById('posts');
const apiURL = 'https://echoes-blog-api.onrender.com/api/posts';

// Fetch and display posts
async function fetchPosts() {
  const res = await fetch(apiURL);
  const posts = await res.json();

  postsList.innerHTML = posts.map(post => `
  <li>
    <b>${post.title}</b> (${post.category})<br>
    <small>${new Date(post.date).toLocaleDateString()}</small><br>
    <button onclick="editPost('${post._id}')">Edit</button>
    <button onclick="deletePost('${post._id}')">Delete</button>
  </li>
`).join('');

}

// Create new post
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {
    title: form.title.value,
    body: form.body.value,
    category: form.category.value,
    image: form.image.value
  };

  const method = editMode ? 'PUT' : 'POST';
  const url = editMode ? `${apiURL}/${editId}` : apiURL;

  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (res.ok) {
    alert(editMode ? 'Post updated!' : 'Post created!');
    form.reset();
    fetchPosts();
    editMode = false;
    editId = null;
    form.querySelector('button').innerText = 'Publish';
  }
});

async function editPost(id) {
  const res = await fetch(`${apiURL}/${id}`);
  const post = await res.json();

  // Fill form with existing data
  form.title.value = post.title;
  form.body.value = post.body;
  form.category.value = post.category || '';
  form.image.value = post.image || '';

  editMode = true;
  editId = id;
  form.querySelector('button').innerText = 'Update';
}

// Delete post
async function deletePost(id) {
  if (confirm("Are you sure you want to delete this post?")) {
    const res = await fetch(`${apiURL}/${id}`, {
      method: 'DELETE'
    });
    if (res.ok) {
      alert('Post deleted');
      fetchPosts();
    }
  }
}

fetchPosts();
