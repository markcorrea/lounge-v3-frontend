import React, { Fragment, useState, useEffect } from 'react'
import SwipeableViews from 'react-swipeable-views'

import TerminalCard from '@ui/TerminalCard'
import Spinner from '@ui/Spinner'

import services from '@services'

import socketIOClient from 'socket.io-client'

const server = process.env.API_SOCKET

const TerminalView = ({ match: { params } }) => {
  const terminalId = params.id || null

  const {
    getOrdersByTerminal,
    getTerminal,
    setReadyOrder,
    removeAllFromTerminal,
  } = services
  const [orders, setOrders] = useState([])
  const [terminalName, setTerminalName] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchTerminal()
    fetchOrders()
    let socket = socketIOClient(`${server}`)
    socket.on(terminalId, () => {
      fetchOrders()
    })

    return function cleanup() {
      socket.close()
    }
  }, [])

  const fetchOrders = async () => {
    let result = await getOrdersByTerminal(terminalId)
    if (result) {
      setOrders([...result.data.orders])
    }
  }

  const fetchTerminal = async () => {
    let result = await getTerminal(terminalId)
    if (result) {
      setTerminalName(result.data.terminal.name)
    }
  }

  const confirmOrder = async order => {
    await setReadyOrder(order)
    fetchOrders()
  }

  const clearTerminal = async () => {
    setLoading(true)
    await removeAllFromTerminal(terminalId)
    fetchOrders()

    setLoading(false)
  }

  const OrderList = () => {
    return orders.map((order, orderIndex) => {
      return (
        <SwipeableViews
          key={'order' + orderIndex}
          index={1}
          onChangeIndex={() => confirmOrder(order)}
          enableMouseEvents
        >
          <div className='col-xl-4 col-md-6 mb-4' />
          <TerminalCard
            title={order.name || 'sem nome'}
            uniqueNumber={order.client}
          />
        </SwipeableViews>
      )
    })
  }

  return (
    <Fragment>
      <a
        onClick={clearTerminal}
        className='btn btn-primary btn-icon-split'
        style={{ float: 'right', color: 'white' }}
      >
        <span className='text'>Concluir todos</span>
      </a>
      <h1 className='h3 mb-2 text-gray-800'>Terminal: {terminalName}</h1>
      <p>&nbsp;</p>
      {!loading ? (
        <>
          {orders && orders.length > 0 ? (
            <OrderList />
          ) : (
            <div>Não existem pedidos pendentes.</div>
          )}
        </>
      ) : (
        <Spinner />
      )}
    </Fragment>
  )
}

export default TerminalView
