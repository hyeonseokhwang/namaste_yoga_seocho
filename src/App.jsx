import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useIsMobile from './hooks/useIsMobile';
import DesktopLayout from './layouts/DesktopLayout';
import MobileLayout from './layouts/MobileLayout';
import Home from './pages/Home';
import What from './pages/iyengar/What';
import Guruji from './pages/iyengar/Guruji';
import Teachers from './pages/Teachers';
import IYCK from './pages/iyengar/IYCK';
import CIYT from './pages/iyengar/CIYT';
import FAQ from './pages/FAQ';
import Workshops from './pages/programs/Workshops';
import Gallery from "./pages/Gallery";


function App() {
  const isMobile = useIsMobile();
  const Layout = isMobile ? MobileLayout : DesktopLayout;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="iyengar/what" element={<What />} />
          <Route path="iyengar/guruji" element={<Guruji />} />
          <Route path="iyengar/iyck" element={<IYCK />} />
          <Route path="iyengar/ciyt" element={<CIYT />} />
          <Route path="teachers" element={<Teachers />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="programs/workshops" element={<Workshops />} />
          <Route path="/gallery" element={<Gallery />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

