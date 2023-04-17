import { getStats } from "../../api/api";
import "./MainStat.css";
import { useState, useEffect } from "react";


function MainStat(props) {
  return (
    <div className="main-stat">
      <div className="stat-title">{props.title}</div>
      <div className="stats-amount">{props.name}</div>
    </div>
  );
}
export default MainStat;