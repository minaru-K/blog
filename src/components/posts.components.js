import { Component } from "../core/component";
import { apiService } from "../services/api.services";
import { TransformService } from "../services/transform.service";
export class PostsComponents extends Component {
  constructor(id, { loader }) {
    super(id);
    this.loader = loader;
  }

  init() {
    this.$el.addEventListener("click", buttonHandler.bind(this));
  }

  async onShow() {
    this.loader.show();
    const fbData = await apiService.fetchPosts();
    const posts = TransformService.fbObjectToArray(fbData);
    document.getElementById("posts").innerHTML = "";
    this.loader.hide();
    renderPosts(posts);
  }
}

function renderPosts(postsArray) {
  Object.keys(postsArray).forEach((key) => {
    document.getElementById("posts").insertAdjacentHTML(
      "beforeend",
      `<div class="panel">
         <div class="panel-head">
            <p class="panel-title">${postsArray[key].title}</p>
            <ul class="tags">
                ${
                  postsArray[key].type == "note"
                    ? '<li class="tag tag-rounded">Заметка</li>'
                    : '<li class="tag tag-blue tag-rounded">Новость</li>'
                }
            </ul>
         </div>
         <div class="panel-body">
             <p class="multi-line">${postsArray[key].fulltext}</p>
         </div>
        <div class="panel-footer w-panel-footer">
          <small>${postsArray[key].date}</small>
          ${
            JSON.parse(localStorage.getItem("favorites")).includes(
              postsArray[key].id
            )
              ? `<button class='button-round button-small button-danger' data-id='${postsArray[key].id}'>Удалить</button>`
              : `<button class='button-round button-small button-primary' data-id='${postsArray[key].id}'>Сохранить</button>`
          }

         </div>
        </div>`
    );
  });
}

function buttonHandler(event) {
  const $el = event.target;
  const id = event.target.dataset.id;
  if (id) {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (favorites.includes(id)) {
      favorites.splice(favorites.indexOf(id), 1);
      $el.classList.remove("button-danger");
      $el.classList.add("button-primary");
      $el.textContent = "Сохранить";
    } else {
      favorites.push(id);
      $el.classList.add("button-danger");
      $el.classList.remove("button-primary");
      $el.textContent = "Удалить";
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
}
