import DashboardLayout from "@/common/layout/DashboardLayout";
import Settings from "@/modules/Settings";

const SettingsDashboard = () => {
  return <Settings />;
};

SettingsDashboard.getLayout = (page) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default SettingsDashboard;
