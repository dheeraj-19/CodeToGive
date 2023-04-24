import React from "react"
import "style.css"
import "tailwindcss/lib/css/preflight.css"
import AnimationRevealPage from "helpers/AnimationRevealPage"
import RouteOptimization from "components/RouteComponent.js";

function Route() {
  return (
    <AnimationRevealPage>
      <RouteOptimization />
    </AnimationRevealPage>
  )
}

export default Route
