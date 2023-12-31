import React from "react";
import SideBar from "../components/SideBar";
import MenuIcon from "../components/MenuIcon";
import { Outlet } from "react-router";

const Dashboard = () => {
  return (
    <div className="flex justify-start items-start">
      <MenuIcon />
      <SideBar />
      <Outlet />
    </div>
  );
};

export default Dashboard;
