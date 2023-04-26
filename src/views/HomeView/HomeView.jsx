import React, { useState } from "react";
import { getMonthlyStats, getTotalStats } from "../../api/api";

function HomeView() {
  const [monthlyStats, setMonthlyStats] = useState();
  const [totalStats, setTotalStats] = useState();

  useEffect(() => {
    async function retrieveData() {
      const monthlyStatsData = await getMonthlyStats();
      const totalStatsData = await getTotalStats();

      setPhotos(photosData);
      setStats(statsData);
    }

    retrieveData();
  }, [username]);
  return <div class="Homeview-container"></div>;
}
export default HomeView;
