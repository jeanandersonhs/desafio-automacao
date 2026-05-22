
import axios from 'axios'
import {URL} from '../constants/api-route'



export const api = axios.create({
    baseURL: 'URL',
    headers: {
        'Content-Type': 'application/json'
    }
})