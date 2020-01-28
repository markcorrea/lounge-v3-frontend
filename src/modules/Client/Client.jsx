import React, { Fragment, useState, useEffect } from 'react'

import services from '@services'
import { showMessage } from '../../utilities'

const Client = ({ match: { params }, history }) => {
  const { getClient, saveClient, updateClient } = services
  const clientId = params.id || null
  let isMounted

  const [client, setClient] = useState({
    name: '',
    uniqueCode: 0,
  })

  useEffect(() => {
    ;(async () => {
      console.log('clientId', clientId)
      if (clientId) {
        getClientData(clientId)
      }
    })()
  }, [])

  const getClientData = async clientId => {
    isMounted = true
    const result = await getClient(clientId)
    if (result) {
      if (isMounted) {
        console.log('result', result)
        setClient(result.data.client)
      }
      return () => {
        isMounted = false
      }
    }

    alert('Client not found')
    history.push('/main/clients')
  }

  const handleInputChange = () => {
    let name = event.target.name
    let value = event.target.value
    setClient({ ...client, [name]: value })
  }

  const save = async body => {
    let service = clientId ? updateClient : saveClient
    const result = await service(body)
    if (result) {
    } else {
      showMessage('Error: could not register client', 'error')
      return
    }
    history.push('/main/clients')
  }

  return (
    <Fragment>
      <div className='row d-sm-flex align-items-center justify-content-between mb-4'>
        <h1 className='h3 mb-0 text-gray-800'>
          {clientId ? 'Edit' : 'New'} Client
        </h1>
      </div>

      <div className='row'>
        <div className='col-md-6 col-sm-12'>
          <div className='form-group'>
            <div className='small mb-1'>Name:</div>
            <input
              name='name'
              type='text'
              className='form-control form-control-user'
              value={client.name || ''}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-12'>
          <a
            className='btn btn-success btn-icon-split react-link form-button'
            onClick={() => save(client)}
          >
            <span className='text'>Save</span>
          </a>
          <a
            className='btn btn-light btn-icon-split form-button'
            onClick={() => history.push('/main/clients')}
          >
            <span className='text'>Cancel</span>
          </a>
        </div>
      </div>
    </Fragment>
  )
}

export default Client
