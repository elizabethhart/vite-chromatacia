import "./App.css";
import { Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Home from "./pages/Home";
import About from "./pages/About";
import Layout from "./pages/Layout";
// import Bookshelf from "./pages/Bookshelf";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          {/* <Route path="bookshelf" element={<Bookshelf />} /> */}
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
