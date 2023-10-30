export class Component {
    constructor(id){
        this.$el = document.getElementById(id)
        this.init()
    }

    init() {

    }

    hide() {
        this.$el.classList.add('hide')
        console.log('test', this.$el)
    }

    show() {
        this.$el.classList.remove('hide')
        console.log('test', this.$el)
    }
}