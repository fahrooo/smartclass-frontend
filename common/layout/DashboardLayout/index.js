import DashboardBottomBar from "@/common/components/Dashboard/DashboardBottomBar";
import DashboardMain from "@/common/components/Dashboard/DashboardMain";
import DashboardSidebar from "@/common/components/Dashboard/DashboardSidebar";
import useAuthUserStore from "@/common/hooks/store/useAuthUserStore ";
import generateSidebarAdminItems from "@/common/utils/sidebarAdmin";
import generateSidebarOperatorItems from "@/common/utils/sidebarOperator";
import generateSidebarPesertaItems from "@/common/utils/sidebarPeserta";
import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const DashboardLayout = ({ children }) => {
  const session = useAuthUserStore((state) => state.session);

  const [sidebar, setSidebar] = useState();

  useEffect(() => {
    let sidebarItems =
      session?.data?.role == "super admin" || session?.data?.role == "admin"
        ? setSidebar(generateSidebarAdminItems())
        : session?.data?.role == "operator"
        ? setSidebar(generateSidebarOperatorItems())
        : session?.data?.role == "peserta"
        ? setSidebar(generateSidebarPesertaItems())
        : null;
  }, [session?.data?.role]);

  return (
    <>
      <Flex
        maxH={{ base: "125vh", md: "100vh" }}
        minH={{ base: "125vh", md: "100vh" }}
        bgGradient="linear(to-bl, #5B7688, #F3D5C1 80%)"
        p={{ base: "10px", md: "35px" }}
        gap="40px"
        mb={{ base: "10", md: "0" }}
      >
        <DashboardSidebar items={sidebar} />
        <DashboardMain>{children}</DashboardMain>
      </Flex>
      <DashboardBottomBar items={sidebar} />
    </>
  );
};

export default DashboardLayout;
