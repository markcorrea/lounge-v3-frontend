import axios from 'axios'
import { verifyToken, verifyResponseMessage } from '@utilities'
const server = process.env.API_URL

const permissions = {
  data: {
    permissions: [
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

const addPermission = body => {
  return axios
    .post(`${server}/permissions`, body, {
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

const getPermissions = () => {
  return permissions
}

const getPermission = _id => {
  let permission = permissions.data.permissions.find(
    permission => permission._id === _id
  )

  return {
    data: {
      permission: permission,
    },
  }
}

const deletePermission = _id => {
  console.log('permission deleted!')
}

const savePermission = body => {
  console.log('saved permission!')
}

const updatePermission = body => {
  console.log('updated permission!')
}

export default {
  addPermission,
  getPermissions,
  getPermission,
  deletePermission,
  savePermission,
  updatePermission,
}
