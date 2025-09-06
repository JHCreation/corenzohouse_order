import { writable } from "svelte/store";

// export const apiUrl= writable(import.meta.env.VITE_API_URL)
// export const apiWeb= writable(import.meta.env.VITE_API_WEB)
// console.log("ENV:", import.meta.env.VITE_API_URL, import.meta.env.VITE_API_WEB)
export const projectName= 'corenzo-order'
export const projectNameKR= '코렌초 오더'
export const apiUrl= import.meta.env.VITE_API_IP
export const staticUrl= import.meta.env.VITE_STATIC_URL
export const staticWeb= import.meta.env.VITE_STATIC_WEB
export const authUrl= `${apiUrl}/auth`