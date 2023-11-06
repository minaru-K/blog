import { Component } from "../core/component";
import { apiService } from "../services/api.services";
import renderPosts from "./posts.components";

export class FavoriteComponents extends Component {
  constructor(id, { loader }) {
    super(id);
    this.loader = loader;
  }

  init() {
    this.$el.addEventListener("click", renderFavoritePost.bind(this));
    
  }
  async onShow() {
    this.loader.show();
    this.getPosts();
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
//   event.stopImmediatePropagation()
}

async function dataPreparation(event) {
    // event.preventDefault()
    // event.stopImmediatePropagation()
  const postId = event.target.dataset.id;
  const posts = await apiService.fetchPosts();
  let post = [];
  Object.keys(posts).map((key) => {
    if (key == postId) {
      posts[key]["id"] = key;
      post = posts[key];
    }
  });
  return post;
}

// не работает удаление поста из избранного + прослушиватель реагирует на нажатия на самом избранном посте и возвращает undefined