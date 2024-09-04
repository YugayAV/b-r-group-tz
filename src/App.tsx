import "./App.css";
import NewsList from "./components/newsList/NewsList.tsx";
import { Route, Routes } from "react-router-dom";
import NewsCard from "./components/newsCard/NewsCard.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<NewsList />} />
      <Route path="/news/:id" element={<NewsCard />} />
    </Routes>
  );
}

export default App;
