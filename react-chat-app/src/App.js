import React from "react";
import { Routes, Route } from "react-router-dom";

import Chat from "./components/Chat";
import Join from "./components/Join"


function App() {
  
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Join />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
