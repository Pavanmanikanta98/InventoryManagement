import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Landing } from "./components/Landing";
import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";
import { AddStore } from "./components/add/AddStore";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/addstore" element={<AddStore />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
