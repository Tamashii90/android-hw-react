import { useFetch } from "use-http";

export default class MyApi {
	constructor() {
		const { post, put, get, cache, loading, response, data } = useFetch(
			process.env.BASE_URL,
			{
				headers: {
					"Authorization": `Bearer ${localStorage.getItem("token")}`
				}
			}
		);
		this.put = put;
		this.data = data;
		this.post = post;
		this.get = get;
		this.cache = cache;
		this.loading = loading;
		this.response = response;
	}
}
