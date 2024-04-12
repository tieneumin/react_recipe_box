import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./reset.css";

import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import RecipeAdd from "./pages/RecipeAdd";
import RecipeDetails from "./pages/RecipeDetails";
import RecipeEdit from "./pages/RecipeEdit";
import PageNotFound from "./pages/PageNotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add" element={<RecipeAdd />} />{" "}
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/recipe/:id/edit" element={<RecipeEdit />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
