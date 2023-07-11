import { RxDashboard } from "react-icons/rx";
import {
  MdOutlineAlarm,
  MdOutlineDevices,
  MdOutlineHome,
  MdOutlineLocationOn,
  MdOutlinePeopleAlt,
  MdOutlinePersonOutline,
  MdOutlineSettings,
} from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";

function generateSidebarPesertaItems() {
  return [
    {
      name: "Home",
      path: "/home",
      icon: MdOutlineHome,
    },
    {
      name: "Booking",
      path: "/booking",
      icon: MdOutlineAlarm,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: MdOutlineSettings,
    },
  ];
}

export default generateSidebarPesertaItems;
