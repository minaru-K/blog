import './stylesheet/styles.css'
import { HeaderComponent } from './components/header.components.js'
import { NavigationComponent } from './components/navigation.component.js'
import { CreateComponents } from './components/create.components.js'
import { PostsComponents } from './components/posts.components.js'
import { FavoriteComponents } from './components/favorite.component.js'
import { LoaderComponent } from './components/loader.component.js'

const header = new HeaderComponent('header')
const loader = new LoaderComponent('loader')
const navigation = new NavigationComponent('navigation')

const create = new CreateComponents('create')
const favorite = new FavoriteComponents('favorite', {loader})
const posts = new PostsComponents('posts', {loader})

navigation.registerTabs([
    {'name': 'create', component : create},
    {'name' : 'favorite', component: favorite},
    {'name' : 'posts', component: posts},
])