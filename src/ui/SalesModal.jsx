import React, { useState } from 'react'

import AsyncInput from '@ui/AsyncInput'
import ChoiceModal from '@ui/ChoiceModal'
import services from '@services'
import { openModal, closeModal } from '@utilities'

const SalesModal = ({ id, title, cashierId }) => {
  const { searchProducts, payProduct } = services

  const [productList, setProductList] = useState([])
  const [productId, setProductId] = useState(null)

  const columns = [
    {
      label: 'Produto',
      name: 'name',
    },
    {
      label: 'Valor',
      name: 'totalPrice',
    },
  ]

  const confirmModal = productId => {
    setProductId(productId)
    openModal('confirmSale')
  }

  const confirmSale = async () => {
    let result = await payProduct({
      cashierID: cashierId,
      productId: productId,
    })
    if (result) {
      closeModal('confirmSale')
      closeModal('salesModal')
      return
    }
  }

  const searchProduct = async search => {
    let result = await searchProducts({ name: search })
    setProductList(result.data.products)
  }

  return (
    <div id={id} className='modal' role='dialog'>
      <div className='modal-dialog' role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>{title}</h5>
            <button
              type='button'
              className='close'
              data-dismiss='modal'
              aria-label='Fechar'
            >
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
          <div className='modal-body'>
            <div className='row'>
              <div className='col-md-12'>
                <div className='table-filter'>
                  <label>
                    Buscar:
                    <AsyncInput
                      callbackFunction={search => searchProduct(search)}
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-12'>
                <table
                  className='table table-bordered dataTable'
                  id='dataTable'
                  width='100%'
                  cellSpacing='0'
                >
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Valor</th>
                      <th>Confirmar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productList.map((rowData, rowIndex) => (
                      <tr key={`row_${rowIndex}`}>
                        {columns.map((column, colIndex) => (
                          <td key={`cell_${rowIndex}_${colIndex}`}>
                            {rowData[column.name] ? rowData[column.name] : '-'}
                          </td>
                        ))}
                        <td className='icon'>
                          <a onClick={() => confirmModal(rowData._id)}>
                            <i className='fas fa-check edit' />
                          </a>
                        </td>
                      </tr>
                    ))}
                    {productList.length < 1 && (
                      <tr>
                        <td colSpan={6}>Não há itens registrados.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-secondary'
              onClick={() => closeModal(id)}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
      <ChoiceModal
        id='confirmSale'
        title='Confirmar venda?'
        description='Confirmar venda?'
        onConfirm={() => confirmSale()}
      />
    </div>
  )
}

export default SalesModal
