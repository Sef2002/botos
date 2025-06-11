import { Link } from 'react-router-dom';

const Success = () => (
  <div className="container mx-auto py-20 px-4 text-center">
    <h1 className="text-3xl font-bold mb-4">Grazie per il tuo ordine!</h1>
    <p className="mb-8">Ti abbiamo inviato una email con i dettagli.</p>
    <Link to="/shop" className="btn btn-primary">Torna allo Shop</Link>
  </div>
);

export default Success;
