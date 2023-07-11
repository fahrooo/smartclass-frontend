import AuthLayout from "@/common/layout/AuthLayout";
import AktivasiAkun from "@/modules/Auth/AktivasiAkun";

const aktivasiakun = () => {
  return <AktivasiAkun />;
};

aktivasiakun.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default aktivasiakun;
