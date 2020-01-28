import axios from 'axios'
import { verifyToken, verifyResponseMessage } from '@utilities'
const server = process.env.API_URL

const clients = {
  data: {
    clients: [
      {
        name: 'Salun',
        uniqueNumber: '0',
        _id: '0',
      },
      {
        name: 'Marcus',
        uniqueNumber: '1',
        _id: '1',
      },
    ],
  },
}

const addClient = body => {
  return axios
    .post(`${server}/clients`, body, {
      headers: {
        token: verifyToken(),
      },
    })
    .then(response => {
      verifyResponseMessage(response)
      return response
    })
    .catch(error => {
      console.log('erro', error.response.status)
      return error
    })
}

const searchClients = body => {
  return axios
    .post(`${server}/clients/search`, body, {
      headers: {
        token: verifyToken(),
      },
    })
    .then(response => {
      verifyResponseMessage(response)
      return response
    })
    .catch(error => {
      console.log('erro', error.response.status)
      return error
    })
}

const addClientToTicket = body => {
  return axios
    .post(`${server}/tickets/client`, body, {
      headers: {
        token: verifyToken(),
      },
    })
    .then(response => {
      verifyResponseMessage(response)
      return response
    })
    .catch(error => {
      console.log('erro', error.response.status)
      return error
    })
}

const getClients = () => {
  return clients
}

const getClient = _id => {
  let client = clients.data.clients.find(client => client._id === _id)

  return {
    data: {
      client: client,
    },
  }
}

const deleteClient = _id => {
  console.log('client deleted!')
}

const saveClient = body => {
  console.log('saved client!')
}

const updateClient = body => {
  console.log('updated client!')
}

export default {
  addClient,
  searchClients,
  addClientToTicket,
  getClients,
  getClient,
  deleteClient,
  saveClient,
  updateClient,
}
