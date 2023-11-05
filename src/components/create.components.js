import { Component } from "../core/component";
import { Form } from "../core/form";
import { Validators } from "../core/validators";
import { apiService } from "../services/api.services";

export class CreateComponents extends Component {
  constructor(id) {
    super(id);
  }

  init() {
    this.$el.addEventListener("submit", submitHandler.bind(this));
    this.form = new Form(this.$el, {
      title: [Validators.required],
      fulltext: [Validators.required, Validators.minLength(10)],
    });
  }
}

async function submitHandler(event) {
  event.preventDefault();

  if (this.form.isValid()) {
    const formData = {
      date: new Date().toLocaleDateString(),
      type: this.$el.type.value,
      ...this.form.value(),
    };
    await apiService.createPost(formData);
    alert('Запись добавлена в базу данных')
    this.form.clear();
  }
}
