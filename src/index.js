let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".add-toy-form")

  getToys();


  function renderToys(toy) {
    let card = document.createElement('li')
    card.className = "card"
    card.innerHTML = `
      <h2>"${toy.name}"</h2>
      <img src="${toy.image}" class="toy-avatar">
      <p>${toy.likes} likes</p>
      <button class="like-btn" id="${toy.id}">Like ❤️</button>
      `
    document.querySelector("#toy-collection").appendChild(card)
    card.querySelector("button").addEventListener("click", () => {
      toy.likes++
      card.querySelector("p").textContent = `${toy.likes} likes`
      updateLikes(toy)
    })

  }

  function updateLikes(toyObj) {
    return fetch(`http://localhost:3000/toys/${toyObj.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(toyObj
        )
      })
      .then(res => res.json())
      .then(toy => console.log(toy))
  }

  function getToys() {
    fetch("http://localhost:3000/toys")
      .then((res) => res.json())
      .then((toyData) => toyData.forEach(toy => renderToys(toy)))

  }

  function placeToy(toyObj) {
    return fetch("http://localhost:3000/toys",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: toyObj.name,
          image: toyObj.image,
          likes: toyObj.likes
        })
      })
      .then(res => res.json())
      .then(toy => console.log(toy))

  }

  form.addEventListener("submit", function (e) {
    e.preventDefault()
    let toyObj = {
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0
    }
    renderToys(toyObj)
    placeToy(toyObj)
  })


  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
