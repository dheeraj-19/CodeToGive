import React from "react"
import "style.css"
import "tailwindcss/lib/css/preflight.css"
import AnimationRevealPage from "helpers/AnimationRevealPage"
import LearningCenter from "components/LearningCenter"

function Learn() {
  return (
    <AnimationRevealPage>
      <LearningCenter />
    </AnimationRevealPage>
  )
}

export default Learn
