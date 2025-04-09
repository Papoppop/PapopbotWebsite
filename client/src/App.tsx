import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './Views/LandingPage';
import DevelopersPage from './Views/DevelopersPage';
import ShowDevelopers from './Views/ShowDevelopers';
import Navbar from './Components/Navbar';
import AboutUs from './Views/AboutUs';
import ChatPage from './Views/ChatPage';

function App() {
  return (
    <>
    <Navbar />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/developers" element={<DevelopersPage />} />
        <Route path="/developers/:id" element={<ShowDevelopers />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;