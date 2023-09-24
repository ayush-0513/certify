import React from "react";
import ReactDom from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import "./index.css";
import App from "./App";

import { StateContextProvider } from "./context";

const root = ReactDom.createRoot(document.getElementById("root"));

root.render(
  <ThirdwebProvider
    activeChain={"goerli"}
    desiredChainId={ChainId.Goerli}
    clientId="97cbf60c5ce1f921eee5fbab75753f01"
  >
    <Router>
      <StateContextProvider>
        <App />
      </StateContextProvider>
    </Router>
  </ThirdwebProvider>
);
