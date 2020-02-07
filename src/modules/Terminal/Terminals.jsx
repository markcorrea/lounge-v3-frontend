import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import DataTable from '@ui/DataTable'
import Spinner from '@ui/Spinner'

import services from '@services'

const Terminals = ({ history }) => {
  const { getTerminals, deleteTerminal } = services
  const [terminals, setTerminals] = useState([])

  useEffect(() => {
    ;(async () => {
      fetchTerminals()
    })()
  }, [])

  const fetchTerminals = async () => {
    let result = await getTerminals()

    setTerminals(result.data.terminals)
  }

  const editTerminal = _id => {
    history.push(`/main/terminal/${_id}`)
  }

  const viewTerminal = _id => {
    history.push(`/main/terminal/view/${_id}`)
  }

  const removeTerminal = async _id => {
    const result = await deleteTerminal(_id)
    if (!result) {
      showMessage('Error: could not remove temrinal.', 'error')
      return
    }
    fetchTerminals()
  }

  const columns = [
    {
      label: 'Nome',
      name: 'name',
    },
  ]

  return (
    <Fragment>
      <Link
        style={{ float: 'right' }}
        to={`/main/terminal`}
        className='btn btn-primary btn-icon-split'
      >
        <span
          style={{ padding: '0.575rem 0.75rem' }}
          className='icon text-white-50'
        >
          <i className='fas fa-plus' />
        </span>
        <span className='text'>New Terminal</span>
      </Link>
      <h1 className='h3 mb-2 text-gray-800'>Terminals</h1>
      <p className='mb-4'>List of available terminals.</p>

      <div className='card shadow mb-4'>
        <div className='card-body'>
          <div className='table-responsive'>
            <div className='row'>
              <div className='col-md-12'>
                {terminals && terminals.length > 0 ? (
                  <DataTable
                    columns={columns}
                    data={terminals}
                    onEdit={editTerminal}
                    onView={viewTerminal}
                    onDelete={removeTerminal}
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

export default Terminals
