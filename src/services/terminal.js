import axios from 'axios'
import { verifyToken, verifyResponseMessage } from '@utilities'
const server = process.env.API_URL

const getTerminals = () => {
  return axios
    .get(`${server}/terminals`, {
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
      return false
    })
}

const getOrdersByTerminal = terminalId => {
  return axios
    .get(`${server}/orders/terminal/${terminalId}`, {
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
      return false
    })
}

const getTerminal = terminalId => {
  return axios
    .get(`${server}/terminals/${terminalId}`, {
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
      return false
    })
}

const saveTerminal = body => {
  return axios
    .post(`${server}/terminals`, body, {
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
      return false
    })
}

const updateTerminal = body => {
  return axios
    .put(`${server}/terminals/${body._id}`, body, {
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
      return false
    })
}

const deleteTerminal = _id => {
  return axios
    .delete(`${server}/terminals/${_id}`, {
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
      return false
    })
}

const removeAllFromTerminal = _id => {
  return axios
    .post(`${server}/orders/terminal/${_id}/clean`, {
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
      return false
    })
}

const setReadyOrder = body => {
  return axios
    .post(`${server}/orders/ready/${body._id}`, body, {
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
      return false
    })
}

export default {
  getTerminals,
  getOrdersByTerminal,
  getTerminal,
  saveTerminal,
  updateTerminal,
  deleteTerminal,
  setReadyOrder,
  removeAllFromTerminal,
}
