import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ExecutiveApply from "./pages/executive/ExecutiveApply";
import SlotBooking from "./pages/student/SlotBooking";
import StudentDashboard from "./pages/student/StudentDashboard.jsx";
import OpportunityFeed from "./pages/opportunity/OpportunityFeed";
import DashBoard from "./pages/Dashboard.jsx";
import "./App.css";
function App() {
  return (<>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<><DashBoard /><StudentDashboard /></>} />
        <Route path="/apply-executive" element={<ExecutiveApply />} />
        <Route path="/book-slot" element={<SlotBooking />} />
        <Route path="/opportunities" element={<OpportunityFeed />} />
      </Routes>

      </>
  );
}

export default App;
