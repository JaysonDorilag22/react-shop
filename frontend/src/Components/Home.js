import React, { useState, useEffect, Fragment } from 'react'
import MetaData from './Layout/Metadata'
import axios from 'axios'
import Product from './Product/Products'
import Loader from './Layout/Loader'
import Pagination from 'react-js-pagination'
const Home = () => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState();
    const [productsCount, setProductsCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [resPerPage, setResPerPage] = useState(0);
    
    const getProducts = async (page=1) => {
        let link='';
        if (page){
            link = `http://localhost:4001/api/v1/products?page=${page}`;

        }
        else{
            link = `http://localhost:4001/api/v1/products`

        }
         
        console.log(link)
        let res = await axios.get(link)
        console.log(res);
        setProducts(res.data.products)
        setProductsCount(res.data.productsCount)
        setResPerPage(res.data.resPerPage);
        setLoading(false)
    }
    let count = productsCount;
    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }
    useEffect(() => {
        getProducts(currentPage)
    }, [currentPage]);
    return (

        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Buy Best Products Online'} />
                    <div className="container container-fluid">
                        <h1 id="products_heading">Latest Products</h1>
                        <section id="products" className="container mt-5">
                            <div className="row">
                                {products && products.map(product => (
                                    <Product key={product._id} product={product} col={4} />
                                ))}
                            </div>
                        </section>
                        {resPerPage <= count && (
                            <div className="d-flex justify-content-center mt-5">
                                <Pagination
                                    activePage={currentPage}
                                    itemsCountPerPage={resPerPage}
                                    totalItemsCount={productsCount}
                                    onChange={setCurrentPageNo}
                                    nextPageText={'Next'}
                                    prevPageText={'Prev'}
                                    firstPageText={'First'}
                                    lastPageText={'Last'}
                                    itemClass="page-item"
                                    linkClass="page-link"
                                />
                            </div>)}
                    </div>
                </Fragment>
            )}
        </Fragment>

    )
}

export default Home