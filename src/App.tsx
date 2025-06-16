function App() {
  return (
    <CartProvider>
      <Router>
        <div className="font-primary bg-black text-white min-h-screen">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/servizi" element={<ServicesPage />} />
            <Route path="/galleria" element={<GalleryPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/prenota/servizio" element={<SelectService />} />
            <Route path="/prenota/barbiere" element={<SelectBarber />} />
            <Route path="/prenota/orario" element={<SelectTimeSlot />} />
            <Route path="/prenota/successo" element={<BookingSuccess />} />
          </Routes>

          <Footer />

          {/* ✅ Mostra il banner dei cookie sempre in basso */}
          <CookieBanner />
        </div>
      </Router>
    </CartProvider>
  );
}