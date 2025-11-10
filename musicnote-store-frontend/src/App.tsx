import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import { Home } from './pages/Home';
import { Signup } from './pages/Signup';
import { Layout } from './components/Layout';


function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Layout>

    </Router>
  )
}

export default App
