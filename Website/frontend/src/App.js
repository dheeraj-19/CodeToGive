import React from "react"
import "style.css"
import "tailwindcss/lib/css/preflight.css"
import AnimationRevealPage from "helpers/AnimationRevealPage"
import Landing from "components/HomeLanding.js"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContactUs from "pages/Translation.js";
import RouteOptimization from "pages/Route";
import LearningCenter  from "pages/Learning";
import LearnPartner from "pages/LearnPartner";
import LearnPeople from "pages/LearnPeople";
import Tranlation from "pages/Translation.js"
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/route" element={<RouteOptimization />} />
          <Route exact path="/learn" element={<LearningCenter />} />
          <Route exact path="/learn_partners" element={<LearnPartner />} />
          <Route exact path="/learn_people" element={<LearnPeople />} />
          <Route exact path="/translation" element={<Tranlation />} />
        </Routes>
      </div>
    </Router>
  )
}

function Home() {
  return (
    <AnimationRevealPage>
      <Landing />
    </AnimationRevealPage>
  );
}

export default App
