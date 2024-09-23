import { UseFetchOptions } from "nuxt/app";

export async function useApiFetch<T>(path: string, options: UseFetchOptions<T> = {}) {

    const { data: response} = await useFetch(`http://127.0.0.1:8000/api/${path}`, {

        watch: false,
        ...options,
        headers: {
            ...options?.headers
        }

    });
    return response;

}
