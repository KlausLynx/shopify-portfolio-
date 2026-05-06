import { Routes, Route } from 'react-router-dom'
import { StorePage } from './components/StorePage'
import { ProductDetail } from './components/ProductDetails'
import './App.css'

export default function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={ <StorePage /> }/>
        <Route path='/product/:id' element={ <ProductDetail /> }/>
      </Routes>
    </>
  )
}