import DashboardLayout from "@/common/layout/DashboardLayout";
import MyBooking from "@/modules/MyBooking";

const booking = () => {
  return <MyBooking />;
};

booking.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default booking;
