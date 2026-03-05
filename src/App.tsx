import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppLayout } from "./app/layouts/AppLayout";
import { LandingPage } from "./pages/LandingPage";
import { MockupPage } from "./pages/MockupPage";
import { FramePage } from "./pages/FramePage";
import { AboutPage } from "./pages/AboutPage";

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/mockup" element={<MockupPage />} />
          <Route path="/frame" element={<FramePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
