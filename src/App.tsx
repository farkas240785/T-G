import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AIAssistant from './components/AIAssistant';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Product from './pages/Product';
import Projects from './pages/Projects';
import Docs from './pages/Docs';
import Order from './pages/Order';
import About from './pages/About';
import Contacts from './pages/Contacts';
import Folder from './pages/Folder';
import Dashboard from './pages/Dashboard';
import OrderTracker from './pages/OrderTracker';
import Configurator from './pages/Configurator';
import ObjectFolder from './pages/ObjectFolder';
import Finance from './pages/Finance';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--c-coal)' }}>
        <Header />
        <main id="main" className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/order" element={<Order />} />
            <Route path="/about" element={<About />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/folder" element={<Folder />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/order/:id" element={<OrderTracker />} />
            <Route path="/dashboard/configurator" element={<Configurator />} />
            <Route path="/dashboard/object-folder" element={<ObjectFolder />} />
            <Route path="/dashboard/finance" element={<Finance />} />
          </Routes>
        </main>
        <Footer />
        <AIAssistant />
      </div>
    </Router>
  );
}

export default App;
