import { RxDashboard } from "react-icons/rx";
import {
  MdOutlineDevices,
  MdOutlineLocationOn,
  MdOutlinePeopleAlt,
  MdOutlinePersonOutline,
  MdOutlineSettings,
} from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";

function generateSidebarOperatorItems() {
  return [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: RxDashboard,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: MdOutlineSettings,
    },
  ];
}

export default generateSidebarOperatorItems;
