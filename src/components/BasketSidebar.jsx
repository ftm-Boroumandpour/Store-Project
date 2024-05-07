/* eslint-disable react/prop-types */
import { TbChecklist } from "react-icons/tb"
import { FaHashtag } from "react-icons/fa6"
import { BsPatchCheck } from "react-icons/bs"

import styles from "./asketSidebar.module.css"
import { useDispatch } from "react-redux"
import { checkout } from "../features/cart/cartSlice"

function BasketSidebar({ state }) {

    const dispatch =useDispatch()
    return (
        <div className={styles.sidebar}>
            <div>
                <TbChecklist/>
                <p>Total:</p>
                <span>{state.total} $</span>
            </div>
            <div>
                <FaHashtag/>
                <p>Quantity:</p>
                <span>{state.itemCounter}</span>
            </div>
            <div>
                <BsPatchCheck/>
                <p>Status:</p>
                <span>{!state.checkout && "pending....."}</span>
            </div>
            <button onClick={()=>dispatch(checkout())}>checkout</button>
        </div>
    )
}

export default BasketSidebar