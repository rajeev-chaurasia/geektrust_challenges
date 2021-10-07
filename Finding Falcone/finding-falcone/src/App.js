import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import store from "./store";
import GamePage from "./components/GamePage";
import Header from "./components/Header";
import ReportPage from "./components/ReportPage";
import Footer from "./components/Footer";
import Error from "./components/Error";

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Header />
          <Route exact path="/" component={GamePage} />
          <Route exact path="/report" component={ReportPage} />
          <Error />
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  );
}
