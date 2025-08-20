import { Outlet } from 'react-router-dom';
import Header from '../components/desktop/HeaderDesktop';
import Footer from '../components/desktop/FooterDesktop';

export default function DesktopLayout() {
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
