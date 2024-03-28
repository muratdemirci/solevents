import Home from "././src/pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "/./src/pages/Dashboard";
import Events from "/./src/pages/Events";
import EventsCategory from "/./src/pages/EventsCategory";
import CreateEvent from "/./src/pages/CreateEvent";
import EventDetails from "/./src/pages/EventDetails";
import Register from "./src/pages/Register";
import Login from "./src/pages/Login";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/events/all", element: <Events /> },
  { path: "/events/:category", element: <EventsCategory /> },
  { path: "/create/event", element: <CreateEvent /> },
  { path: "/event/:slug", element: <EventDetails /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
];

function App() {
  return (
    <Router>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
