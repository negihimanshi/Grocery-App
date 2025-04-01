import React, { useState } from 'react'
import { useUserAuth } from '../../hooks/useUserAuth';
import DashboardLayout from '../../components/layouts/DashboardLayout';

const Community = () => {
  useUserAuth();

  const [dashboardData, setDashboardData] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <DashboardLayout activeMenu={"Community"}>

    </DashboardLayout>
  )
}

export default Community