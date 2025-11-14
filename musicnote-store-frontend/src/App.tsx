import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import { Home } from './pages/Home';
import { Signup } from './pages/Signup';
import { Login } from "./pages/Login";
import { Layout } from './components/Layout';
import { HotTracks } from './pages/HotTracks';


function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/hot-tracks" element={<HotTracks />} />
        </Routes>
      </Layout>

    </Router>
  )
}

export default App
