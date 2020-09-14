import React from "react";
import "./App.css";
import { AppHeader } from "./components/AppHeader";
import { Timer } from "./components/Timer/Timer";

function App() {
  return (
    <div className="App">
      <div className="AppContainer">
        <AppHeader />
        <section>
          <Timer />
        </section>
      </div>

      <footer className="AppFooter">
        @Copyright {new Date().getFullYear()}
      </footer>
    </div>
  );
}

export default App;
