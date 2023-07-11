import AuthLayout from "@/common/layout/AuthLayout";
import UpdatePassword from "@/modules/Auth/UpdatePassword";

const updatepassword = () => {
  return <UpdatePassword />;
};

updatepassword.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default updatepassword;
