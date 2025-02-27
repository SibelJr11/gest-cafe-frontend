import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./routes/AppRoutes";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas Públicas */}
        {routes
          .filter((route) => route.isPublic)
          .map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}

        {/* Rutas Protegidas */}
        <Route element={<ProtectedRoute />}>
          {routes
            .filter((route) => !route.isPublic)
            .map((route, index) => (
              <Route key={index} path={route.path} element={route.element}>
                {/* Mapea las subrutas dentro de cada ruta principal */}
                {route.children &&
                  route.children.map((child, childIndex) => (
                    <Route
                      key={childIndex}
                      index={child.index}
                      path={child.path}
                      element={child.element}
                    />
                  ))}
              </Route>
            ))}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
