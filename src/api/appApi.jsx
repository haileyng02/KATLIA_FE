import axios from 'axios'

const appApi = axios.create({
  baseURL: 'http://localhost:2041'
})

export default appApi