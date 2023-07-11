import AuthLayout from "@/common/layout/AuthLayout";
import ForgotPassword from "@/modules/Auth/ForgotPassword";

const forgotpassword = () => {
  return <ForgotPassword />;
};

forgotpassword.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default forgotpassword;
