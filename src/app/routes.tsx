import { createBrowserRouter, Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

const gridPattern = `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40V.5H40' fill='none' stroke='white' stroke-opacity='0.02'/%3E%3C/svg%3E")`;

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function Layout() {
  return (
    <div 
      className="min-h-screen bg-[#050505] text-white/90 font-sans antialiased selection:bg-white/20 selection:text-white dark relative overflow-clip flex flex-col"
    >
      {/* Faint Grid Pattern */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{ backgroundImage: gridPattern, backgroundSize: '40px 40px' }}
      />

      {/* Subtle Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[160px]" />
        <div className="absolute top-[40%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[160px]" />
      </div>

      <ScrollToTop />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "projects", Component: Projects },
      { path: "projects/:id", Component: ProjectDetail },
      { path: "blog", Component: Blog },
      { path: "contact", Component: Contact },
    ],
  },
]);
