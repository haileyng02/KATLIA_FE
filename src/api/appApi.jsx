import axios from 'axios'

const appApi = axios.create({
  baseURL: 'https://katlia-server.herokuapp.com/'
})

export default appApi