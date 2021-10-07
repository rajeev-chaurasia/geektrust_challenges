import React from "react";
import { Route, Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import UserTable from "./components/UserTable";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={UserTable}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
