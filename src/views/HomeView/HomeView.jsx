import React, { useState } from "react";
import { getMonthlyStats, getTotalStats } from "../../api/api";
import Header from "../../components/Header/Header";

function HomeView() {
  const [monthlyStats, setMonthlyStats] = useState();
  const [totalStats, setTotalStats] = useState();

 
  return <div className="homeview-container">
    <Header></Header>
  </div>;
}
export default HomeView;
