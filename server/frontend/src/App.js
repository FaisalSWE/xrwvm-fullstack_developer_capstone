import { Routes, Route } from "react-router-dom";
import LoginPanel from "./components/Login/Login";
import Register from "./components/Register/Register";
import Dealers from './components/Dealers/Dealers';
import Dealer from "./components/Dealers/Dealer";
import PostReview from "./components/PostReview/PostReview"; // 👈 make sure you create this
import PostReview from "./components/Dealers/PostReview"

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPanel />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dealer/:id" element={<Dealer />} />
      <Route path="/dealers" element={<Dealers />} />
      <Route path="/postreview/:id" element={<PostReview/>} />
    </Routes>
  );
}

export default App;
