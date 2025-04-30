import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";

const App: React.FC = () => {
  const location = useLocation();

  return (
    <>
      {/* Animação de transição entre rotas */}
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </AnimatePresence>

      {/* Toasts globais (alertas, notificações etc) */}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            fontSize: "14px",
            padding: "10px 16px",
            borderRadius: "8px",
          },
          duration: 4000,
        }}
      />
    </>
  );
};

export default App;
