let posts = JSON.parse(localStorage.getItem("posts")) || []
let editingId = null

const form = document.getElementById("postForm")
const contentInput = document.getElementById("content")
const postsContainer = document.getElementById("posts")

function savePosts() {
  localStorage.setItem("posts", JSON.stringify(posts))
}

function renderPosts() {
  postsContainer.innerHTML = ""
  for (let i = 0; i < posts.length; i++) {
    let p = posts[i]
    let div = document.createElement("div")
    div.className = "post"
    div.innerHTML = `
      <p>${p.content}</p>
      <button onclick="editPost('${p.id}')">Edit</button>
      <button onclick="deletePost('${p.id}')">Delete</button>
    `
    postsContainer.appendChild(div)
  }
}

function validate() {
  return contentInput.value.trim() !== ""
}

form.addEventListener("submit", function (e) {
  e.preventDefault()
  if (!validate()) return

  const item = {
    id: editingId || new Date().getTime().toString(),
    content: contentInput.value.trim()
  }

  if (editingId) {
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].id === editingId) {
        posts[i] = item
        break
      }
    }
  } else {
    posts.push(item)
  }

  savePosts()
  renderPosts()
  contentInput.value = ""
  editingId = null
})

function deletePost(id) {
  posts = posts.filter(function (p) {
    return p.id !== id
  })
  savePosts()
  renderPosts()
}

function editPost(id) {
  let found = posts.find(function (p) {
    return p.id === id
  })
  if (found) {
    contentInput.value = found.content
    editingId = found.id
  }
}

renderPosts()
