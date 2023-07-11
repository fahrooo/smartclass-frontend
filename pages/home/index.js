import DashboardLayout from "@/common/layout/DashboardLayout";
import React from "react";
import Home from "@/modules/Home/index";

const home = () => {
  return <Home />;
};

home.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default home;
