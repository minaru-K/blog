import { Component } from "../core/component";
import { apiService } from "../services/api.services";
import { TransformService } from "../services/transform.service";
export class PostsComponents extends Component {
  constructor(id) {
    super(id);
  }

  async onShow() {
    
    const fbData = await apiService.fetchPosts();
    const posts = TransformService.fbObjectToArray(fbData);
    console.log(posts);
    document.getElementById("posts").innerHTML = ''
    renderPosts(posts);
  }
}

function renderPosts(postsArray) {
  const button = `<button class='button-round button-small button-primary'>Сохранить</button>`;
  Object.keys(postsArray).forEach((key) => {
    document.getElementById("posts").insertAdjacentHTML(
      "beforeend",
      `<div class="panel">
         <div class="panel-head">
            <p class="panel-title">${postsArray[key].title}</p>
            <ul class="tags">
                ${
                postsArray[key].type == "note" ? '<li class="tag tag-rounded">Заметка</li>' : '<li class="tag tag-blue tag-rounded">Новость</li>'
                }
            </ul>
         </div>
         <div class="panel-body">
             <p class="multi-line">${postsArray[key].fulltext}</p>
         </div>
        <div class="panel-footer w-panel-footer">
          <small>${postsArray[key].date}</small>
          ${button}
         </div>
        </div>`
    );
  });
}
