import { Outlet } from 'react-router-dom';
import Header from '../components/mobile/HeaderMobile';
import Footer from '../components/mobile/FooterMobile';

export default function MobileLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
