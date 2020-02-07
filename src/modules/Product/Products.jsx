import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Pagination from 'react-bootstrap/Pagination'

import DataTable from '@ui/DataTable'
import AsyncInput from '@ui/AsyncInput'
import Spinner from '@ui/Spinner'

import services from '@services'
import { showMessage } from '../../utilities'

const Products = ({ history }) => {
  const { searchProducts, getProducts, deleteProduct } = services
  const [productList, setProductList] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    ;(async () => {
      fetchProducts()
    })()
  }, [])

  const fetchProducts = async (page = 1) => {
    let result = await getProducts(page)

    result.data.products.map(product => {
      if (product.hasOwnProperty('terminal') && product.terminal != undefined) {
        product.terminal = product.terminal.name
      }
    })
    setPage(page)
    setTotalPages(result.data.totalPages)
    setProductList(result.data.products)
  }

  const editProduct = _id => {
    history.push(`/main/product/${_id}`)
  }

  const removeProduct = async _id => {
    const result = await deleteProduct(_id)
    if (!result) {
      showMessage('Error: could not remove product.', 'error')
      return
    }
    fetchProducts()
  }

  const searchProduct = async search => {
    let result = await searchProducts({ name: search })
    setProductList(result.data.products)
  }

  const pageItems = () => {
    let items = []
    for (let i = 0; i < totalPages; i++) {
      items.push(
        <Pagination.Item
          onClick={() => fetchProducts(i + 1)}
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
      label: 'Quantity',
      name: 'quantity',
    },
    {
      label: 'Terminal',
      name: 'terminal',
    },
    {
      label: 'Price',
      name: 'price',
      display: 'currency',
    },
  ]

  return (
    <Fragment>
      <Link
        style={{ float: 'right' }}
        to={`/main/product`}
        className='btn btn-primary btn-icon-split'
      >
        <span
          style={{ padding: '0.575rem 0.75rem' }}
          className='icon text-white-50'
        >
          <i className='fas fa-plus' />
        </span>
        <span className='text'>New Product</span>
      </Link>
      <h1 className='h3 mb-2 text-gray-800'>Products</h1>
      <p className='mb-4'>
        List of available products. Use the search field to filter.
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
                      callbackFunction={search => searchProduct(search)}
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-12'>
                {productList && productList.length > 0 ? (
                  <DataTable
                    columns={columns}
                    data={productList}
                    onEdit={editProduct}
                    onDelete={removeProduct}
                  />
                ) : (
                  <Spinner />
                )}
              </div>
              <div className='col-md-12'>
                {productList && productList.length > 0 && (
                  <Pagination>
                    <Pagination.Prev onClick={() => fetchProducts(page - 1)} />
                    {pageItems()}
                    <Pagination.Next onClick={() => fetchProducts(page + 1)} />
                  </Pagination>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Products
