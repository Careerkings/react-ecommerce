import './App.css';
import React from 'react';
import Home from './pages/Home';
import Header from './components/Header';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Cart from './pages/Cart'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Checkout from './pages/Checkout';
import { QueryClient, QueryClientProvider } from 'react-query'



const queryClient = new QueryClient()

function App() {


  return (
    <>
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <Header/> 
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/cart' element={<Cart/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/signin' element={<Signin/>} /> 
      <Route path='/checkout' element={<Checkout/>} /> 
    </Routes>
    </BrowserRouter>
    </QueryClientProvider>
    </>
  );
}

export default App;