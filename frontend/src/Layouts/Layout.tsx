import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

// interface Props {
//   children: React.ReactNode;
// }
const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      <Hero />
      <div className="container mx-auto flex-1 py-10"><Outlet/></div>
      <Footer />
    </div>
  );
};

export default Layout;
