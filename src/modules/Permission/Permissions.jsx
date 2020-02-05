import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import DataTable from '@ui/DataTable'
import Spinner from '@ui/Spinner'

import services from '@services'
import { showMessage } from '../../utilities'

const Permissions = ({ history }) => {
  const { getPermissions, deletePermission } = services
  const [permissionList, setPermissionList] = useState([])

  useEffect(() => {
    ;(async () => {
      fetchPermissions()
    })()
  }, [])

  const fetchPermissions = async () => {
    let result = await getPermissions()

    setPermissionList(result.data.permissions)
  }

  const editPermission = _id => {
    history.push(`/main/permission/${_id}`)
  }

  const removePermission = async _id => {
    const result = await deletePermission(_id)
    if (!result) {
      showMessage('Error: could not remove permission.', 'error')
      return
    }
    fetchPermissions()
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
        to={`/main/permission`}
        className='btn btn-primary btn-icon-split'
      >
        <span
          style={{ padding: '0.575rem 0.75rem' }}
          className='icon text-white-50'
        >
          <i className='fas fa-plus' />
        </span>
        <span className='text'>New Permission</span>
      </Link>
      <h1 className='h3 mb-2 text-gray-800'>Permissions</h1>
      <p className='mb-4'>List of available permissions.</p>

      <div className='card shadow mb-4'>
        <div className='card-body'>
          <div className='table-responsive'>
            <div className='row'>
              <div className='col-md-12'>
                {permissionList && permissionList.length > 0 ? (
                  <DataTable
                    columns={columns}
                    data={permissionList}
                    onEdit={editPermission}
                    onDelete={removePermission}
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

export default Permissions
