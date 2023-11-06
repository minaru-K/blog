import { Component } from "../core/component";
import { apiService } from "../services/api.services";

export class FavoriteComponents extends Component {
    constructor(id){
        super(id)
    }

    init(){
        
    }
   async onShow(){
    this.getPosts()
   }
    

    async getPosts() {
        const temp = await apiService.fetchPosts()
        console.log(await temp)
    }

}

