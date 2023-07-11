import AuthLayout from "@/common/layout/AuthLayout";
import VerifyEmail from "@/modules/Auth/verifyEmail";

const verifyemail = () => {
  return <VerifyEmail />;
};

verifyemail.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default verifyemail;
