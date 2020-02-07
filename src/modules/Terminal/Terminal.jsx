import React, { Fragment, useState, useEffect } from 'react'

import services from '@services'
import { showMessage } from '../../utilities'

const Terminal = ({ match: { params }, history }) => {
  const { getTerminal, saveTerminal, updateTerminal } = services
  const terminalId = params.id || null
  let isMounted

  const [terminal, setTerminal] = useState({
    name: '',
    barCode: '',
    quantity: 0,
    price: 0,
    terminal: null,
    uniqueCode: 0,
  })

  useEffect(() => {
    ;(async () => {
      if (terminalId) {
        getTerminalData(terminalId)
      }
    })()
  }, [])

  const getTerminalData = async terminalId => {
    isMounted = true
    const result = await getTerminal(terminalId)
    if (result) {
      if (isMounted) {
        setTerminal(result.data.terminal)
      }
      return () => {
        isMounted = false
      }
    }

    alert('Terminal not found')
    history.push('/main/terminals')
  }

  const handleInputChange = () => {
    let name = event.target.name
    let value = event.target.value
    setTerminal({ ...terminal, [name]: value })
  }

  const save = async body => {
    let service = terminalId ? updateTerminal : saveTerminal
    const result = await service(body)
    if (result) {
    } else {
      showMessage('Error: could not register terminal', 'error')
      return
    }
    history.push('/main/terminals')
  }

  return (
    <Fragment>
      <div className='row d-sm-flex align-items-center justify-content-between mb-4'>
        <h1 className='h3 mb-0 text-gray-800'>
          {terminalId ? 'Edit' : 'New'} Terminal
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
              value={terminal.name || ''}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-12'>
          <a
            className='btn btn-success btn-icon-split react-link form-button'
            onClick={() => save(terminal)}
          >
            <span className='text'>Save</span>
          </a>
          <a
            className='btn btn-light btn-icon-split form-button'
            onClick={() => history.push('/main/terminals')}
          >
            <span className='text'>Cancel</span>
          </a>
        </div>
      </div>
    </Fragment>
  )
}

export default Terminal
