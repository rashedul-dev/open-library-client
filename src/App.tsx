import { Outlet } from "react-router";
// import "./App.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <>
      <div>
        <Navbar></Navbar>
        <div className="px-4 sm:px-6 lg:px-8 min-h-[160vh]">
          <Outlet></Outlet>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
}

export default App;
