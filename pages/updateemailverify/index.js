import AuthLayout from "@/common/layout/AuthLayout";
import UpdateEmailVerify from "@/modules/Auth/UpdateEmailVerify";

const updateemailverify = () => {
  return <UpdateEmailVerify />;
};

updateemailverify.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default updateemailverify;
