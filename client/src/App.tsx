import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import { useAuth0 } from "@auth0/auth0-react";
import PrivateOutlet from "./routes/PrivateRoute";
const { isAuthenticated, user } = useAuth0;
console.log(user);
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<PrivateOutlet />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}

export default App;
