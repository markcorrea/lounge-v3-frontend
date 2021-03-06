import React, { Fragment, useState, useEffect } from 'react'
import MaskedInput from 'react-text-mask'

import services from '@services'
import {
  showMessage,
  dateToBrazilianString,
  brazilianStringToDate,
} from '../../utilities'

const Client = ({ match: { params }, history }) => {
  const { getClient, saveClient, updateClient } = services
  const clientId = params.id || null
  let isMounted

  const [client, setClient] = useState({
    name: '',
    uniqueCode: 0,
  })
  // https://text-mask.github.io/text-mask/

  useEffect(() => {
    ;(async () => {
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
        const newClient = result.data.client
        if (newClient.birthDate) {
          newClient.birthDate = dateToBrazilianString(newClient.birthDate)
        }

        setClient(newClient)
      }
      return () => {
        isMounted = false
      }
    }

    alert('Cliente não encontrado.')
    history.push('/main/clients')
  }

  const handleInputChange = () => {
    let name = event.target.name
    let value = event.target.value
    setClient({ ...client, [name]: value })
  }

  const save = async body => {
    let service = clientId ? updateClient : saveClient
    if (body.birthDate) {
      body.birthDate = brazilianStringToDate(body.birthDate)
    }
    const result = await service(body)
    if (result) {
    } else {
      showMessage('Erro: Não foi possível registrar cliente.', 'error')
      return
    }
    history.push('/main/clients')
  }

  return (
    <Fragment>
      <div className='row d-sm-flex align-items-center justify-content-between mb-4'>
        <h1 className='h3 mb-0 text-gray-800'>
          {clientId ? 'Editar' : 'Novo'} Cliente
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
              value={client.name || ''}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className='col-md-6 col-sm-12'>
          <div className='form-group'>
            <div className='small mb-1'>Código Único:</div>
            <input
              name='uniqueNumber'
              type='text'
              className='form-control form-control-user'
              value={client.uniqueNumber || ''}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className='col-md-6 col-sm-12'>
          <div className='form-group'>
            <div className='small mb-1'>Telefone:</div>
            <MaskedInput
              mask={['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
              name='telephone'
              type='text'
              className='form-control form-control-user'
              value={client.telephone || ''}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className='col-md-6 col-sm-12'>
          <div className='form-group'>
            <div className='small mb-1'>Data de Nascimento:</div>
            <MaskedInput
              mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
              name='birthDate'
              type='text'
              className='form-control form-control-user'
              value={client.birthDate || ''}
              onChange={handleInputChange}
            />
          </div>
        </div>
        {/* \(\d{2,}\) \d{4,}\-\d{4} */}
        <div className='col-md-6 col-sm-12'>
          <div className='form-group'>
            <div className='small mb-1'>E-mail:</div>
            <input
              name='email'
              type='text'
              className='form-control form-control-user'
              value={client.email || ''}
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
            <span className='text'>Salvar</span>
          </a>
          <a
            className='btn btn-light btn-icon-split form-button'
            onClick={() => history.push('/main/clients')}
          >
            <span className='text'>Cancelar</span>
          </a>
        </div>
      </div>
    </Fragment>
  )
}

export default Client
