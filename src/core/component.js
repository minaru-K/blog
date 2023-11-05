export class Component {
  constructor(id) {
    this.$el = document.getElementById(id);
    this.init();
  }

  init() {}

  onShow() {}
  onHide() {}

  hide() {
    // this.$el.classList.add('hide')
    this.$el.style.display = "none";
    this.onHide();
    // console.log('test', this.$el)
  }

  show() {
    // this.$el.classList.remove('hide')

    this.$el.style.display = "";
    this.onShow();
    // console.log('test', this.$el)
  }
}
