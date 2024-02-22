import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./Home";
import Page from "./Page";
import Auth from "./Auth";
import AuthContextProvider from "./components/AuthContext";
function App() {
  return (
    <div>
      <AuthContextProvider>
        <Router>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<Page />} />
          </Routes>
        </Router>
      </AuthContextProvider>
    </div>
  );
}
export default App;
