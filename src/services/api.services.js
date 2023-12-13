class ApiService {
    constructor(baseUrl) {
        this.url = baseUrl;
    }

    async createPost(post) {
        try {
            const request = new Request(this.url + "/save", {
                method: "post",
                body: JSON.stringify(post),
            });
            return useRequest(request);
        } catch (error) {
            console.error(error);
        }
    }

    async fetchPosts() {
        try {
            const request = new Request(`${this.url}`, {
                method: "get"
            });
            return useRequest(request);
        } catch (error) {
            console.log(error);
        }
    }

    async fetchOnePost(id) {
        try {
            const request = new Request(`${this.url}/get/${id}`, {
                method: "get"
            });
            return useRequest(request);
        } catch (error) {
            console.log(error);
        }
    }
}

async function useRequest(request) {
    const response = await fetch(request);
    return await response.json();
}

export const apiService = new ApiService(
    process.env.BACKEND_API
)