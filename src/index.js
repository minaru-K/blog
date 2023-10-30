import {HeaderComponent} from './components/header.components.js'
import { NavigationComponent } from './components/navigation.component.js'
import { CreateComponents } from './components/create.components.js'
import { PostsComponents } from './components/posts.components.js'
import { FavoriteComponents } from './components/favorite.component.js'


const header = new HeaderComponent('header')

const navigation = new NavigationComponent('navigation')

const create = new CreateComponents('create')
const favorite = new FavoriteComponents('favorite')
const posts = new PostsComponents('posts')

navigation.registerTabs([
    {'name': 'create', component : create},
    {'name' : 'favorite', component: favorite},
    {'name' : 'posts', component: posts},
])