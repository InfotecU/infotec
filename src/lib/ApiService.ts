export class ApiService {
	private url;

	constructor(url: string) {
		this.url = url;
	}

	private parseUrl = (params: Record<string, string> | undefined) =>
		params ? `${this.url}?${new URLSearchParams(params)}` : this.url;

	public get = async ({
		headers,
		params
	}: {
		headers?: HeadersInit;
		params?: Record<string, string>;
	}) => {
		try {
			const res = await fetch(this.parseUrl(params), {
				method: 'GET',
				headers
			});

			const data = await res.json();

			if (!res.ok) return { data: null, error: data.message };

			return { data, error: null };
		} catch (err) {
			return { data: null, error: { message: err } };
		}
	};

	public post = async ({
		headers,
		params,
		body
	}: {
		headers?: HeadersInit;
		params?: Record<string, string>;
		body?: Object;
	}) => {
		try {
			const res = await fetch(this.parseUrl(params), {
				method: 'POST',
				headers,
				body: JSON.stringify(body)
			});

			const data = await res.json();

			if (!res.ok) return { data: null, error: data.message };

			return { data, error: null };
		} catch (err) {
			return { data: null, error: { message: err } };
		}
	};

	public put = async ({
		headers,
		params,
		body
	}: {
		headers?: HeadersInit;
		params?: Record<string, string>;
		body?: Object;
	}) => {
		try {
			const res = await fetch(this.parseUrl(params), {
				method: 'PUT',
				headers,
				body: JSON.stringify(body)
			});

			const data = await res.json();

			if (!res.ok) return { data: null, error: data.message };

			return { data, error: null };
		} catch (err) {
			return { data: null, error: { message: err } };
		}
	};

	public delete = async ({
		headers,
		params
	}: {
		headers?: HeadersInit;
		params?: Record<string, string>;
	}) => {
		try {
			const res = await fetch(this.parseUrl(params), {
				method: 'DELETE',
				headers
			});

			const data = await res.json();

			if (!res.ok) return { data: null, error: data.message };

			return { data, error: null };
		} catch (err) {
			return { data: null, error: { message: err } };
		}
	};
}
