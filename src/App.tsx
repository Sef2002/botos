import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import GalleryPage from './pages/GalleryPage';
import ShopPage from './pages/ShopPage';
import SelectService from './booking/SelectService';
import SelectBarber from './booking/SelectBarber';
import ConfirmBooking from './booking/ConfirmBooking';
import BookingSuccess from './booking/BookingSuccess';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="font-primary bg-black text-white min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/servizi" element={<ServicesPage />} />
          <Route path="/galleria" element={<GalleryPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/prenota" element={<SelectService />} />
          <Route path="/prenota/barbiere" element={<SelectBarber />} />
          <Route path="/prenota/conferma" element={<ConfirmBooking />} />
          <Route path="/prenota/successo" element={<BookingSuccess />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App