import React, { Fragment } from 'react'

import ChoiceModal from '@ui/ChoiceModal'
import { openModal, toCurrencyReal } from '@utilities'

const defineDisplay = (column, colIndex, rowIndex, rowData) => {
  if (column.hasOwnProperty('display') && column.display == 'currency') {
    return (
      <td key={`cell_${rowIndex}_${colIndex}`}>
        {rowData[column.name] ? toCurrencyReal(rowData[column.name]) : '-'}
      </td>
    )
  }

  return (
    <td key={`cell_${rowIndex}_${colIndex}`}>
      {rowData[column.name] ? rowData[column.name] : '-'}
    </td>
  )
}

const RenderHeaders = ({ columns }) =>
  columns.map((column, index) => (
    <th key={`${column.name}_${index}`}>{column.label}</th>
  ))

const RenderRows = ({
  columns,
  data,
  onEdit = null,
  onView = null,
  disableEdition,
  onDelete = null,
  confirmDelete,
}) => (
  <Fragment>
    {data.map((rowData, rowIndex) => (
      <tr key={`row_${rowIndex}`}>
        {columns.map((column, colIndex) => {
          return defineDisplay(column, colIndex, rowIndex, rowData)
        })}
        {onView && (
          <td className='icon'>
            <a onClick={() => onView(rowData._id)}>
              <i className='fas fa-eye view' />
            </a>
          </td>
        )}
        {onEdit && (
          <td className='icon'>
            {disableEdition && disableEdition(rowData) ? (
              <div style={{ textAlign: 'center' }}>-</div>
            ) : (
              <a onClick={() => onEdit(rowData._id)}>
                <i className='fas fa-edit edit' />
              </a>
            )}
          </td>
        )}
        {onDelete && (
          <td className='icon'>
            <a onClick={() => confirmDelete(rowData._id)}>
              <i className='fas fa-trash remove' />
            </a>
          </td>
        )}
      </tr>
    ))}
    {data.length < 1 && (
      <tr>
        <td colSpan={6}>Não há itens registrados.</td>
      </tr>
    )}
  </Fragment>
)

const DataTable = props => {
  let idToDelete = null

  const DeleteInformation = items => {
    return `Remover item?`
  }

  const confirmDelete = _id => {
    idToDelete = _id
    openModal('deleteModal')
  }

  return (
    <Fragment>
      <table
        className='table table-bordered dataTable'
        id='dataTable'
        width='100%'
        cellSpacing='0'
      >
        <thead>
          <tr>
            <RenderHeaders columns={props.columns} />
            {props.onView && <th>Visualizar</th>}
            {props.onEdit && <th>Editar</th>}
            {props.onDelete && <th>Deletar</th>}
          </tr>
        </thead>
        <tbody>
          <RenderRows {...props} confirmDelete={confirmDelete} />
          {props.totalAttributeName && (
            <tr>
              <td className='total' colSpan={4}>
                <span>Total: </span>
                <span className='total-value'>
                  {toCurrencyReal(
                    props.data.reduce((accumulator, currentValue) => {
                      return (
                        accumulator + currentValue[props.totalAttributeName]
                      )
                    }, 0)
                  )}
                </span>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <ChoiceModal
        id='deleteModal'
        title='Confirmar'
        description={<DeleteInformation />}
        onConfirm={() => props.onDelete(idToDelete)}
      />
    </Fragment>
  )
}

export default DataTable
