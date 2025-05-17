
import React from 'react';
import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import ToolsGrid from '../components/ToolsGrid';
import StatusDashboard from '../components/StatusDashboard';
import DevGuide from '../components/DevGuide';
import Terminal from '../components/Terminal';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-terminal-bg">
      <NavBar />
      <Hero />
      <ToolsGrid />
      <StatusDashboard />
      <DevGuide />
      <Terminal />
      <Footer />
    </div>
  );
};

export default Index;
