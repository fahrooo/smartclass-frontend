import AuthLayout from "@/common/layout/AuthLayout";
import Registrasi from "@/modules/Auth/Registrasi";

const registrasi = () => {
  return <Registrasi />;
};

registrasi.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default registrasi;
