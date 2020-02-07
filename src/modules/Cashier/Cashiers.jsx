import React, { Fragment, useState, useEffect } from 'react'
import ChoiceModal from '@ui/ChoiceModal'
import Pagination from 'react-bootstrap/Pagination'

import DataTable from '@ui/DataTable'
import services from '@services'
import { openModal } from '@utilities'

const Cashiers = ({ history }) => {
  const { getCashiers, openCashier } = services
  const [cashierList, setCashierList] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    fetchCashiers()
  }, [])

  const fetchCashiers = async (page = 1) => {
    let result = await getCashiers(page)

    result.data.cashiers.map(cashier => {
      if (cashier.hasOwnProperty('openDate') && cashier.openDate != undefined) {
        let date = new Date(cashier.openDate)
        cashier.openDate = date.toLocaleString('pt-BR')
      }

      if (
        cashier.hasOwnProperty('closeDate') &&
        cashier.closeDate != undefined
      ) {
        let date = new Date(cashier.closeDate)
        cashier.closeDate = date.toLocaleString('pt-BR')
      }
    })

    setPage(page)
    setTotalPages(result.data.totalPages)
    setCashierList(result.data.cashiers)
  }

  const openNewCashier = async () => {
    let cashier = { name: 'marcus' }
    await openCashier(cashier)
    fetchCashiers()
  }

  const editCashier = _id => {
    history.push(`/main/cashier/${_id}`)
  }

  const pageItems = () => {
    let items = []
    for (let i = 0; i < totalPages; i++) {
      items.push(
        <Pagination.Item
          onClick={() => fetchCashiers(i + 1)}
          key={i + 1}
          active={i + 1 === page}
        >
          {i + 1}
        </Pagination.Item>
      )
    }
    return items
  }

  const columns = [
    {
      label: 'Name',
      name: 'name',
    },
    {
      label: 'Opened',
      name: 'openDate',
    },
    {
      label: 'Closed',
      name: 'closeDate',
    },
    {
      label: 'Total Price',
      name: 'price',
      display: 'currency',
    },
  ]

  return (
    <Fragment>
      <a
        onClick={() => openModal('openCashier')}
        className='btn btn-primary btn-icon-split'
        style={{ float: 'right', color: 'white' }}
      >
        <span
          style={{ padding: '0.575rem 0.75rem' }}
          className='icon text-white-50'
        >
          <i className='fas fa-plus' />
        </span>
        <span className='text'>New cashier</span>
      </a>
      <h1 className='h3 mb-2 text-gray-800'>Cashiers</h1>
      <p>&nbsp;</p>
      <div className='card shadow mb-4'>
        <div className='card-body'>
          <div className='table-responsive'>
            <div className='row'>
              <div className='col-md-12'>
                {cashierList && (
                  <DataTable
                    columns={columns}
                    data={cashierList}
                    onEdit={editCashier}
                  />
                )}
              </div>
              <div className='col-md-12'>
                {cashierList && cashierList.length > 0 && (
                  <Pagination>
                    <Pagination.Prev onClick={() => fetchCashiers(page - 1)} />
                    {pageItems()}
                    <Pagination.Next onClick={() => fetchCashiers(page + 1)} />
                  </Pagination>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ChoiceModal
        id='openCashier'
        title='Open Cashier'
        description='Open new cashier with current user?'
        onConfirm={() => openNewCashier()}
      />
    </Fragment>
  )
}

export default Cashiers
