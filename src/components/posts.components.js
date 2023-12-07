import {Component} from "../core/component";
import {apiService} from "../services/api.services";
import {TransformService} from "../services/transform.service";
import renderPosts from "../core/renderPosts";

export class PostsComponents extends Component {
    constructor(id, {loader}) {
        super(id);
        this.loader = loader;
    }

    init() {
        this.$el.addEventListener("click", buttonHandler.bind(this));
    }

    async onShow() {
        this.loader.show();
        const fbData = await apiService.fetchPosts();
        if (fbData) {
            const posts = TransformService.fbObjectToArray(fbData);
            document.getElementById("posts").innerHTML = "";
            this.loader.hide();
            Object.keys(posts).forEach((key) => {
                renderPosts(posts[key], "posts", true);
            });
        } else {
            this.loader.hide();
            document.getElementById("posts").innerHTML =
                '<h1 class="center">Пока не добавлено ни одного поста.</h1>';
        }
    }
}

// здесь в localstorage добавляется только id избранного объекта
// function buttonHandler(event) {
//   const $el = event.target;
//   const id = event.target.dataset.id;
//   if (id) {
//     const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
//     if (favorites.includes(id)) {
//       favorites.splice(favorites.indexOf(id), 1);
//       $el.classList.remove("button-danger");
//       $el.classList.add("button-primary");
//       $el.textContent = "Сохранить";
//     } else {
//       favorites.push(id);
//       $el.classList.add("button-danger");
//       $el.classList.remove("button-primary");
//       $el.textContent = "Удалить";
//     }
//     localStorage.setItem("favorites", JSON.stringify(favorites));
//   }
// }

// здесь в localstorage добавляется id и title избранного объекта
function buttonHandler(event) {
    const $el = event.target;
    const title = $el.dataset.title;
    const id = $el.dataset.id;
    if (id) {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        if (favorites.findIndex((el) => el.id === id) !== -1) {
            favorites.splice(
                favorites.findIndex((el) => el.id === id),
                1
            );
            $el.classList.remove("button-danger");
            $el.classList.add("button-primary");
            $el.textContent = "Сохранить";
        } else {
            favorites.push({title, id});
            $el.classList.add("button-danger");
            $el.classList.remove("button-primary");
            $el.textContent = "Удалить";
        }
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }
}
