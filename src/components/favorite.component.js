import { Component } from "../core/component";
import { apiService } from "../services/api.services";
import renderPosts from "../core/renderPosts";

export class FavoriteComponents extends Component {
  constructor(id, { loader }) {
    super(id);
    this.loader = loader;
  }

  init() {}

  async onShow() {
    this.loader.show();
    this.getPosts();
    this.$el.addEventListener("click", renderFavoritePost.bind(this), {
      once: true,
    });
  }

  async getPosts() {
    const posts = await apiService.fetchPosts();
    if (posts) {
      const favoritePosts = JSON.parse(localStorage.getItem("favorites"));
      this.loader.hide();
      renderFavoritesLink(getFavoriteLikeObj(await posts, favoritePosts));
    } else {
      this.loader.hide();
      document.getElementById("favorite").innerHTML =
        '<h1 class="center">Вы не добавляли ничего в избранное!</h1>';
    }
  }
}

function getFavoriteLikeObj(all, favorites) {
  const favoritesObj = [];
  Object.keys(all).map((key) => {
    favorites.map((el) => {
      if (el.id == key) {
        all[key]["id"] = key;
        favoritesObj.push(all[key]);
      }
    });
  });
  return favoritesObj;
}

function renderFavoritesLink(obj) {
  if (obj.length == 0) {
    document.getElementById("favorite").innerHTML =
      '<h1 class="center">Вы не добавляли ничего в избранное!</h1>';
  } else {
    const favoriteDiv = document.getElementById("favorite");
    favoriteDiv.innerHTML = "";
    obj.map((el) => {
      favoriteDiv.insertAdjacentHTML(
        "beforeend",
        `<p>${el.title} - <a data-id='${el.id}'>${el.id}</a></p><br>`
      );
    });
  }
}

async function renderFavoritePost(event) {
  const post = await apiService.fetchOnePost(event.target.dataset.id);
  document.getElementById("favorite").innerHTML = "";
  renderPosts(post, "favorite", false);
}
