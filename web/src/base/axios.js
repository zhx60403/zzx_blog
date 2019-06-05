import axios from 'axios'

const http = axios.create({
    baseURL:'http://192.168.1.4:4000',
    timeout:3000
})

export default http