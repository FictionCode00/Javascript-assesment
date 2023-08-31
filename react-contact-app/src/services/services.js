import axios from "axios";

// let api_uri="http://localhost:8080"
let api_uri="https://javascript-assesment.vercel.app/api"

export const fetchContacts=()=>{
    return axios.get(api_uri+'/contacts')
}

export const addContacts=(payload)=>{
    return axios.post(api_uri+`/contacts`,payload)
}

export const updateContacts=(id,payload)=>{
    return axios.put(api_uri+`/contacts/${id}`,payload)
}

export const deleteContacts=(id)=>{
    return axios.delete(api_uri+`/contacts/${id}`)
}