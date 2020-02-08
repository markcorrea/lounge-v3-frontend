import React, { Fragment, useState, useEffect } from 'react'

import services from '@services'
import { showMessage } from '../../utilities'

const Permission = ({ match: { params }, history }) => {
  const { getPermission, savePermission, updatePermission } = services
  const permissionId = params.id || null
  let isMounted

  const [permission, setPermission] = useState({
    name: '',
    uniqueCode: 0,
  })

  useEffect(() => {
    ;(async () => {
      if (permissionId) {
        getPermissionData(permissionId)
      }
    })()
  }, [])

  const getPermissionData = async permissionId => {
    isMounted = true
    const result = await getPermission(permissionId)
    if (result) {
      if (isMounted) {
        setPermission(result.data.permission)
      }
      return () => {
        isMounted = false
      }
    }

    alert('Permissão não encontrada.')
    history.push('/main/permissions')
  }

  const handleInputChange = () => {
    let name = event.target.name
    let value = event.target.value
    setPermission({ ...permission, [name]: value })
  }

  const save = async body => {
    let service = permissionId ? updatePermission : savePermission
    const result = await service(body)
    if (result) {
    } else {
      showMessage('Erro: Não foi possível registrar permissão', 'error')
      return
    }
    history.push('/main/permissions')
  }

  return (
    <Fragment>
      <div className='row d-sm-flex align-items-center justify-content-between mb-4'>
        <h1 className='h3 mb-0 text-gray-800'>
          {permissionId ? 'Editar' : 'Nova'} Permissão
        </h1>
      </div>

      <div className='row'>
        <div className='col-md-6 col-sm-12'>
          <div className='form-group'>
            <div className='small mb-1'>Nome:</div>
            <input
              name='name'
              type='text'
              className='form-control form-control-user'
              value={permission.name || ''}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-12'>
          <a
            className='btn btn-success btn-icon-split react-link form-button'
            onClick={() => save(permission)}
          >
            <span className='text'>Salvar</span>
          </a>
          <a
            className='btn btn-light btn-icon-split form-button'
            onClick={() => history.push('/main/permissions')}
          >
            <span className='text'>Cancelar</span>
          </a>
        </div>
      </div>
    </Fragment>
  )
}

export default Permission
