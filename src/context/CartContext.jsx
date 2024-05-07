/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react"

import {sumProducts} from "../helper/helper"

const initialState ={
    selectedItems:[],
    itemCounter:0,
    total:0,
    checkout:false
}

const reducer=(state , action)=>{
    // console.log(action)
    switch (action.type){
        case "ADD_ITEM":
            if(!state.selectedItems.find(item=>item.id===action.payload.id)){
                state.selectedItems.push({...action.payload ,quantity:1})
            }
            return {
                ...state,
                ...sumProducts(state.selectedItems),
                checkout:false

            }
        case "REMOVE_ITEM":
            // eslint-disable-next-line no-case-declarations
            const newSelectedItems = state.selectedItems.filter(item=>
                item.id !== action.payload.id)
            return {
                ...state,
                selectedItems:[...newSelectedItems],
                ...sumProducts(newSelectedItems)
            }
        case "INCREASE":
            // eslint-disable-next-line no-case-declarations
            const increaseIndex = state.selectedItems.findIndex(
                item=>item.id===action.payload.id
            )
            state.selectedItems[increaseIndex].quantity ++
            return{
                ...state,
                ...sumProducts(state.selectedItems)
            }
        case "DECREASE":
            // eslint-disable-next-line no-case-declarations
            const decreaseIndex = state.selectedItems.findIndex(
                item=>item.id===action.payload.id
            )
            state.selectedItems[decreaseIndex].quantity --
            return{
                ...state,
                ...sumProducts(state.selectedItems)
            }
        case "CHECKOUT":
            return{
                selectedItems:[],
                itemCounter :0,
                total:0,
                checkout:true
            }
            
        default:
            throw new Error("Invalid Action")
    }
}

const CartContext = createContext()

function CartProvider({children}) {

    const [state , dispatch] = useReducer(reducer , initialState)

  return ( <CartContext.Provider value={{state, dispatch}}>{children}</CartContext.Provider> )
}


const useCart =()=>{
    const {state , dispatch}= useContext(CartContext)
    return [state , dispatch]
}
export default CartProvider

// eslint-disable-next-line react-refresh/only-export-components
export {useCart}