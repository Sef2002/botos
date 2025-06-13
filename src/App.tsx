import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import GalleryPage from './pages/GalleryPage';
import ShopPage from './shop/pages/ShopPage';
import Checkout from './shop/checkout/Checkout';
import CheckoutSuccess from './shop/checkout/Success';
import CheckoutCancel from './shop/checkout/Cancel';

import SelectService from './booking/SelectService';
import SelectBarber from './booking/SelectBarber';
import SelectTimeSlot from './booking/SelectTimeSlot';
import BookingSuccess from './booking/BookingSuccess';

import { CartProvider } from './shop/context/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="font-primary bg-black text-white min-h-screen">
          <Navbar />
          <Routes>
            {/* Website pages */}
            <Route path="/" element={<HomePage />} />
            <Route path="/servizi" element={<ServicesPage />} />
            <Route path="/galleria" element={<GalleryPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkout/success" element={<CheckoutSuccess />} />
            <Route path="/checkout/cancel" element={<CheckoutCancel />} />

            {/* Booking flow */}
            <Route path="/prenota/servizio" element={<SelectService />} />
            <Route path="/prenota/barbiere" element={<SelectBarber />} />
            <Route path="/prenota/orario" element={<SelectTimeSlot />} />
            <Route path="/prenota/successo" element={<BookingSuccess />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;