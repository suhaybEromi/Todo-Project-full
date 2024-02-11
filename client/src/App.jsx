import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./Home";
import Page from "./Page";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Page />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
