import AuthLayout from "@/common/layout/AuthLayout";
import Login from "@/modules/Auth/Login";

export default function Home() {
  return <Login />;
}

Home.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;
