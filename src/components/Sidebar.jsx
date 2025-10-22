"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useSidebar } from "@/context/SidebarContext";
import HomeFilledIcon from "@mui/icons-material/HomeFilled";
import SchoolIcon from "@mui/icons-material/School";
import ClassIcon from "@mui/icons-material/Class";
import QuizIcon from "@mui/icons-material/Quiz";
import EventNoteIcon from "@mui/icons-material/EventNote";
import SettingsIcon from "@mui/icons-material/Settings";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Close";

export default function Sidebar() {
  const { isOpenSidebar, closeSidebar } = useSidebar();
  const { logout } = useAuth();

  const router = useRouter();

  const handleLogout = () => {
    router.push("/login");

    const logoutTimer = setTimeout(() => {
      logout();
    }, 100);

    return () => clearTimeout(logoutTimer);
  };

  const sidebarItems = [
    {
      id: 1,
      title: "Home",
      icon: <HomeFilledIcon />,
      path: "/dashboard",
    },
    {
      id: 2,
      title: "Teachers",
      icon: <SchoolIcon />,
      path: "/teachers",
    },
    {
      id: 3,
      title: "Students",
      icon: <LocalLibraryIcon />,
      path: "/students",
    },
    {
      id: 4,
      title: "Classes",
      icon: <ClassIcon />,
      path: "/classes",
    },
    {
      id: 5,
      title: "Lessons",
      icon: <MenuBookIcon />,
      path: "/lessons",
    },
    {
      id: 6,
      title: "Exams",
      icon: <QuizIcon />,
      path: "/exams",
    },
    {
      id: 7,
      title: "Events",
      icon: <EventNoteIcon />,
      path: "/events",
    },
    {
      id: 8,
      title: "Settings",
      icon: <SettingsIcon />,
      path: "/settings",
    },
  ];

  return (
    <>
      {isOpenSidebar && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`
        fixed lg:static top-0 left-0 h-full w-[250px] bg-white shadow-md overflow-y-auto 
        transform transition-transform duration-300 ease-in-out z-30
        ${isOpenSidebar ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0
      `}
      >
        <div className="w-full p-4">
          <Link
            className="flex items-center justify-center w-full font-bold text-gray-600 py-5 px-2 bg-indigo-200 rounded-2xl mt-1"
            href={sidebarItems[0].path}
          >
            School Management
          </Link>
          <nav className="flex w-full mt-3">
            <ul className="flex flex-wrap text-gray-500 w-full">
              {sidebarItems &&
                sidebarItems.map((item) => {
                  return (
                    <li
                      key={item.id}
                      className="flex items-center w-full p-3 hover:bg-indigo-100 cursor-pointer"
                    >
                      <Link
                        href={item.path}
                        className="flex items-center w-full"
                      >
                        <span>{item.icon}</span>
                        <span className="pl-2">{item.title}</span>
                      </Link>
                    </li>
                  );
                })}
              <li
                className="w-full p-3 hover:bg-indigo-100 cursor-pointer"
                onClick={handleLogout}
              >
                <span>
                  <LogoutIcon />
                </span>
                <span className="pl-2">Logout</span>
              </li>
            </ul>
          </nav>

          <button
            onClick={closeSidebar}
            className="lg:hidden absolute top-1 right-1 text-gray-400 hover:text-gray-500"
          >
            <CloseIcon sx={{ fontSize: "20px", fontWeight: "bold" }} />
          </button>
        </div>
      </aside>
    </>
  );
}
