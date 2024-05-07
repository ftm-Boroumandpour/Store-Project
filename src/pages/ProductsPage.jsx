/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react"

import Card from "../components/Card"
import Loader from "../components/Loader"
import SearchBox from "../components/SearchBox"
import Sidebar from "../components/Sidebar"

import { fetchProducts } from "../features/product/productSlice"

import { useDispatch, useSelector } from "react-redux"

// import { useProducts } from "../context/ProductsContext"

import styles from "./ProductsPage.module.css"

import { filterProducts, getInitiaQuery, searchProducts } from "../helper/helper"

import { useSearchParams } from "react-router-dom"

function ProductsPage() {
  // const products = useProducts()
  // const products = []
  // console.log(products)

  const {products , loading}= useSelector(store=>store.product)
  const dispatch =useDispatch()

  const [search , setSearch] = useState("")
  const [displayed , setDisplayed] = useState([])
  const [query , setQuery] = useState({})

  const [seaechParams , setSearchParams] =useSearchParams()
  useEffect(()=>{dispatch(fetchProducts())},[])
  useEffect(()=>{
    setDisplayed(products)
    setQuery(getInitiaQuery(seaechParams))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  } ,[products])

  useEffect(()=>{
    setSearchParams(query)
    setSearch(query.search || "")
    let finalProducts =searchProducts(products , query.search)
    finalProducts=filterProducts(finalProducts , query.category)
    setDisplayed(finalProducts)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  } ,[query])

  
  return (
    <>
      <SearchBox search={search} setSearch={setSearch} setQuery={setQuery}/>

      <div className={styles.container}>
        <div className={styles.products}>
          {loading && <Loader />}
          {displayed.map(product => (
            <Card key={product.id} data={product} />
          ))}
        </div>

        <Sidebar query={query} setQuery={setQuery}/>
      </div>
    </>

  )
}

export default ProductsPage