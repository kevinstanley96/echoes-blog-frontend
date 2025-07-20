document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById('posts');
  const apiURL = 'https://echoes-blog-api.onrender.com/api/posts';

  try {
    const res = await fetch(apiURL);
    const posts = await res.json();

    container.innerHTML = posts.map(post => `
      <article>
        <h2>${post.title}</h2>
        <p><em>${new Date(post.date).toLocaleDateString()}</em> — <strong>${post.category || 'Uncategorized'}</strong></p>
        ${post.image ? `<img src="${post.image}" alt="" style="max-width:100%;">` : ''}
        <p>${post.body.substring(0, 250)}...</p>
        <a href="post.html?id=${post._id}">Read more</a>
      </article>
      <hr>
    `).join('');
  } catch (err) {
    container.innerHTML = `<p style="color:red;">Failed to load posts. Please try again later.</p>`;
    console.error('Error fetching posts:', err);
  }
});
