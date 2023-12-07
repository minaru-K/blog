export default function renderPosts(post, id, buttonVisibility) {
    const button = addToFavorite(post);
    document.getElementById(id)
        .insertAdjacentHTML(
        "beforeend",
        `<div class="panel">
                   <div class="panel-head">
                      <p class="panel-title">${post.title}</p>
                      <ul class="tags">
                          ${
            post.type === "note"
                ? '<li class="tag tag-rounded">Заметка</li>'
                : '<li class="tag tag-blue tag-rounded">Новость</li>'
        }
                      </ul>
                   </div>
                   <div class="panel-body">
                       <p class="multi-line">${post.fullText}</p>
                   </div>
                  <div class="panel-footer w-panel-footer">
                    <small>${post.date}</small>
                    ${buttonVisibility === true ? button : ""}
                   </div>
                  </div>`
    );
}

function addToFavorite(post) {
    if (JSON.parse(localStorage.getItem("favorites")) === null) {
        return `<button class='button-round button-small button-primary' data-id='${post.id}' data-title='${post.title}'>Сохранить</button>`;
    } else {
        let isFavorite = "";
        isFavorite = JSON.parse(localStorage.getItem("favorites"));
        isFavorite.map((el) => {
            if (el.id === post.id) {
                isFavorite = true;
            }
        });
        return isFavorite
            ? `<button class='button-round button-small button-danger' data-id='${post.id}' data-title='${post.title}'>Удалить</button>`
            : `<button class='button-round button-small button-primary' data-id='${post.id}' data-title='${post.title}'>Сохранить</button>`;
    }
}
