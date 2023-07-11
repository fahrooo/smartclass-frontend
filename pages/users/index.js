import DashboardLayout from "@/common/layout/DashboardLayout";
import Users from "@/modules/Users";

const UserDashboard = () => {
  return <Users />;
};

UserDashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default UserDashboard;
