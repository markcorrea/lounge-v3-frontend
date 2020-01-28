import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import DataTable from '@ui/DataTable'
import AsyncInput from '@ui/AsyncInput'
import Spinner from '@ui/Spinner'

import services from '@services'
import { showMessage } from '../../utilities'

const Clients = ({ history }) => {
  const { searchClients, getClients, deleteClient } = services
  const [clientList, setClientList] = useState([])

  useEffect(() => {
    ;(async () => {
      fetchClients()
    })()
  }, [])

  const fetchClients = async () => {
    let result = await getClients()

    setClientList(result.data.clients)
  }

  const editClient = _id => {
    history.push(`/main/client/${_id}`)
  }

  const removeClient = async _id => {
    const result = await deleteClient(_id)
    if (!result) {
      showMessage('Error: could not remove client.', 'error')
      return
    }
    fetchClients()
  }

  const searchClient = async search => {
    let result = await searchClients({ name: search })
    setClientList(result.data.clients)
  }

  const columns = [
    {
      label: 'Name',
      name: 'name',
    },
  ]

  return (
    <Fragment>
      <Link
        style={{ float: 'right' }}
        to={`/main/client`}
        className='btn btn-primary btn-icon-split'
      >
        <span
          style={{ padding: '0.575rem 0.75rem' }}
          className='icon text-white-50'
        >
          <i className='fas fa-plus' />
        </span>
        <span className='text'>New Client</span>
      </Link>
      <h1 className='h3 mb-2 text-gray-800'>Clients</h1>
      <p className='mb-4'>
        List of available clients. Use the search field to filter.
      </p>

      <div className='card shadow mb-4'>
        <div className='card-body'>
          <div className='table-responsive'>
            <div className='row'>
              <div className='col-md-12'>
                <div className='table-filter'>
                  <label>
                    Search:
                    <AsyncInput
                      callbackFunction={search => searchClient(search)}
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-12'>
                {clientList && clientList.length > 0 ? (
                  <DataTable
                    columns={columns}
                    data={clientList}
                    onEdit={editClient}
                    onDelete={removeClient}
                  />
                ) : (
                  <Spinner />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Clients
