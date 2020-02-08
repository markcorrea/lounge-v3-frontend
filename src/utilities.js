import { toast } from 'react-toastify'

const formatDate = date => {
  const day = date.getDate().toString()
  const month = (date.getMonth() + 1).toString()
  return `${date.getFullYear()}${validateZeros(month)}${validateZeros(day)}`
}

const dateToBrazilianString = date => {
  date = typeof date === 'string' ? new Date(date) : date
  const day = date.getDate().toString()
  const month = (date.getMonth()).toString()
  return `${validateZeros(day)}/${validateZeros(month)}/${date.getFullYear()}`
}

const brazilianStringToDate = date => {
  const day = date.substr(0, 2)
  const month = date.substr(3, 2)
  const year = date.substr(6, 4)
  return new Date(year, month, day)
}

const validateZeros = entry => (entry.length < 2 ? '0' + entry : entry)

const verifyToken = () => {
  const cookiesArray = document.cookie.split(';')
  const mgmtCookie = cookiesArray.find(
    cookie => cookie.trim().substring(0, 5) === 'token'
  )
  const mycookie = mgmtCookie !== undefined ? mgmtCookie.split('=')[1] : null
  return mycookie
}

const openModal = id => {
  return $(`#${id}`).modal('show')
}

const closeModal = id => {
  return $(`#${id}`).modal('hide')
}

const showMessage = (message, type = 'default') => {
  toast(message, {
    autoClose: 1500,
    hideProgressBar: true,
    type: type,
  })
}

const verifyResponseMessage = result => {
  if (result && result.data && result.data.type) {
    showMessage(result.data.detail, result.data.type)
    return
  }
}

const toCurrencyReal = value => `$ ${value.toFixed(2)}`

export {
  formatDate,
  dateToBrazilianString,
  brazilianStringToDate,
  verifyToken,
  openModal,
  closeModal,
  showMessage,
  toCurrencyReal,
  verifyResponseMessage,
}
