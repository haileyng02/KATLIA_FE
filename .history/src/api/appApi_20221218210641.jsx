import axios from 'axios'

const appApi = axios.create({
<<<<<<< HEAD
  baseURL: 'https://katlia-server.onrender.com/'
=======
  baseURL: 'http://localhost:2041' //https://katlia-server.onrender.com
>>>>>>> main
})

export default appApi