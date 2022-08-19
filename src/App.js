import "swiper/swiper.min.css";
import "./assets/boxicons-2.0.7/css/boxicons.min.css";

import "./App.scss";
import publicRoute from "./config/Routes";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {publicRoute.map((route, index) => {
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <>
                    <Header />
                    <Page />
                    <Footer />
                  </>
                }
              />
            );
          })}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
