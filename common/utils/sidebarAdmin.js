import { RxDashboard } from "react-icons/rx";
import {
  MdOutlineDevices,
  MdOutlineLocationOn,
  MdOutlinePeopleAlt,
  MdOutlinePersonOutline,
  MdOutlineSettings,
} from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";

function generateSidebarAdminItems() {
  return [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: RxDashboard,
    },
    {
      name: "Users",
      path: "/users",
      icon: MdOutlinePeopleAlt,
    },
    {
      name: "Area",
      path: "/area",
      icon: MdOutlineLocationOn,
    },
    {
      name: "Device",
      path: "/device",
      icon: MdOutlineDevices,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: MdOutlineSettings,
    },
  ];
}

export default generateSidebarAdminItems;
