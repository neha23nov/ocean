import React from "react";
import ResearchHeader from "../components/Research_header"; // make sure file is PascalCase
import GlobeViewer from "./waste";

export default function Research() {
  return (
    <main className="min-h-screen p-6 text-white bg-[#0D1117]">
      <ResearchHeader />
      
      <div className="mt-6">
        <h1 className="text-2xl font-bold">Research Page Content</h1>
        <p>Here you can add more info about research, analysis, or visualizations.</p>
      </div>
      <GlobeViewer/>
    </main>
  );
}
