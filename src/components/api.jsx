import axios from "axios"



const BaseUrl_HackerRankAPI = "https://jsonmock.hackerrank.com/api",

    BaseUrl_jsonPlaceHolderAPI = "https://jsonplaceholder.typicode.com/"


export const HackerRankAPI = axios.create({
    baseURL: BaseUrl_HackerRankAPI
})

export const JsonPlaceHolder = axios.create({ baseURL: BaseUrl_jsonPlaceHolderAPI })

HackerRankAPI.interceptors.response.use((result) => result.data.data)

JsonPlaceHolder.interceptors.response.use((result) => result.data)