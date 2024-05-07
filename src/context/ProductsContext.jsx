/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react"

import api from "../services/config"


const ProoductContext = createContext()

function ProductsProvider({children}) {
    const [products , setProducts] = useState([])

    useEffect(()=>{
        const fetchProducts = async ()=>{
            try {
               setProducts(await api.get("/products")) 
            } catch (error) {
                console.log(error.message)
            } 
        }
        fetchProducts()
    } ,[])
  return (
    <ProoductContext.Provider value={products}>
        {children}
    </ProoductContext.Provider>
  )
}

const useProducts=()=>{
    const products = useContext(ProoductContext)
    return products
}

const useProductDetails =(id)=>{
    const products = useContext(ProoductContext)
    const result = products.find(product=>product.id===id)

    return result
}

export default ProductsProvider
// eslint-disable-next-line react-refresh/only-export-components
export {useProducts , useProductDetails}