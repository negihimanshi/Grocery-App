import React, { useState } from 'react'
import { useUserAuth } from '../../hooks/useUserAuth';
import DashboardLayout from '../../components/layouts/DashboardLayout';

const Analytics = () => {
  useUserAuth();

  const [dashboardData, setDashboardData] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <DashboardLayout activeMenu={"Analytics"}>

    </DashboardLayout>
  )
}

export default Analytics