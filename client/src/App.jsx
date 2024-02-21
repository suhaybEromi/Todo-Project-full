import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./Home";
import Page from "./Page";
import Auth from "./Auth";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Page />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
