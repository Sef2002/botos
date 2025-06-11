import { Link } from 'react-router-dom';

const Cancel = () => (
  <div className="container mx-auto py-20 px-4 text-center">
    <h1 className="text-3xl font-bold mb-4">Pagamento annullato</h1>
    <p className="mb-8">Non preoccuparti, puoi riprovare quando vuoi.</p>
    <Link to="/shop" className="btn btn-primary">Torna allo Shop</Link>
  </div>
);

export default Cancel;
