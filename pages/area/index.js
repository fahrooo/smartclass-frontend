import DashboardLayout from "@/common/layout/DashboardLayout";
import Area from "@/modules/Area";

const AreaDashboard = () => {
  return <Area />;
};

AreaDashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default AreaDashboard;
