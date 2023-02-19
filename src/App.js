import { Route, Routes } from 'react-router-dom'
import './App.css'
import Banner from './components/Banner'
import DefaultLayout from './components/DefaultLayout'
import DetailProduct from './pages/DetailProduct'
import ListProduct from './pages/ListProduct'

function App() {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <DefaultLayout>
            <Banner />
          </DefaultLayout>
        }
      />
      <Route
        path='/:key/:id'
        element={
          <DefaultLayout>
            <ListProduct />
          </DefaultLayout>
        }
      />
      <Route
        path='/chitiet/:name'
        element={
          <DefaultLayout>
            <DetailProduct />
          </DefaultLayout>
        }
      />
      <Route
        path='*'
        element={<div className='flex items-center justify-center text-[30px] font-bold text-black'>NotFound</div>}
      />
    </Routes>
  )
}

export default App
