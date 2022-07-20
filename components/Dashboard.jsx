import React from "react";
import SideBar from "./SideBar";

import MainSection from "./MainSection";

const Dashboard = () => {
  return (
    <div className="flex flex-row md:h-screen w-screen bg-gray-200">
      {/* sidebar */}
      <SideBar />
      {/* main */}
      <MainSection />
    </div>
  );
};

export default Dashboard;
