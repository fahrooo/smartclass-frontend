import DashboardLayout from "@/common/layout/DashboardLayout";
import Device from "@/modules/Device";

const DeviceDashboard = () => {
  return <Device />;
};

DeviceDashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default DeviceDashboard;
