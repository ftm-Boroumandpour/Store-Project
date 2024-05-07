/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"

import { PiShoppingCartSimpleBold } from "react-icons/pi"

// import { useCart } from "../context/CartContext"

import styles from "./Layout.module.css"
import { useSelector } from "react-redux"

function Layout({children}) {
    // const [state]=useCart()
    const state = useSelector(store=>store.cart)
  return (
    <>
    <header className={styles.header}>
        <Link to="/products">BotoShop</Link>
        <Link to="/checkout">
            <div>
                <PiShoppingCartSimpleBold/>
                {!!state.itemCounter && <span>{state.itemCounter}</span>}
            </div>
        </Link>
    </header>
    {children}

    <footer className={styles.footer}>
        <p>
            Developed By Fateme
        </p>
    </footer>
    </>
  )
}

export default Layout