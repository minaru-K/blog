export class Component {
    constructor(id){
        this.$el = document.getElementById(id)
        this.init()
    }

    init() {

    }

    hide() {
        // this.$el.classList.add('hide')
        this.$el.style.display = 'none'
        // console.log('test', this.$el)
    }

    show() {
        // this.$el.classList.remove('hide')
        
        this.$el.style.display = ''
        // console.log('test', this.$el)
    }
}