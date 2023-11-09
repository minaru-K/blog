import { Component } from "../core/component";
import { apiService } from "../services/api.services";
import renderPosts from "./posts.components";

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
    const favoritePosts = JSON.parse(localStorage.getItem("favorites"));
    this.loader.hide();
    renderFavoritesLink(getFavoriteLikeObj(await posts, favoritePosts));
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
  const favoriteDiv = document.getElementById("favorite");
  favoriteDiv.innerHTML = "";
  obj.map((el) => {
    favoriteDiv.insertAdjacentHTML(
      "beforeend",
      `<p>${el.title} - <a data-id='${el.id}'>${el.id}</a></p><br>`
    );
  });
}

async function renderFavoritePost(event) {
  const post = [];
  post.push(await dataPreparation(event));
  document.getElementById("favorite").innerHTML = "";
  renderPosts(post, "favorite");
}

async function dataPreparation(event) {
  const postId = event.target.dataset.id;
  const posts = await apiService.fetchPosts();
  const post = [];
  Object.keys(posts).map((key) => {
    if (key == postId) {
      posts[key]["id"] = key;
      post = posts[key];
    }
  });
  return post;
}

// не работает удаление поста из избранного
