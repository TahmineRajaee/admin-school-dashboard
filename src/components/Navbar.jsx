"use client";

import { useAuth } from "@/context/AuthContext";
import { useSidebar } from "@/context/SidebarContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

export default function Navbar() {
  const { user } = useAuth();
  const router = useRouter();
  const { toggleSidebar } = useSidebar();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser && !user) {
        router.push("/login");
      } else {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(checkUser, 100);
    return () => clearTimeout(timer);
  }, [user, router]);

  if (isLoading || !user) {
    return (
      <header className="w-full bg-gray-100 p-4 fixed top-0 right-0 z-10 lg:w-[calc(100%-250px)]">
        <div className="flex items-center justify-between">
          <div>Loading...</div>
        </div>
      </header>
    );
  }

  return (
    <header className="flex items-center w-full h-[65px] bg-gray-100 p-4 fixed top-0 right-0 z-10 lg:w-[calc(100%-250px)]">
      <div className="w-full flex items-center justify-between lg:justify-end">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-indigo-100"
        >
          <MenuIcon
            sx={{
              fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
            }}
          />
        </button>

        <div className="flex items-center space-x-3">
          <span className="flex text-gray-700 relative">
            <NotificationsNoneIcon
              sx={{
                fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
              }}
            />
            <span className="flex justify-center items-center w-5 h-5 bg-red-500 text-white rounded-full absolute left-[-6px] top-[-5px]">
              2
            </span>
          </span>

          <span className="text-base lg:text-lg font-medium">
            {user?.username}
          </span>

          <span className="text-violet-500">
            <AccountCircleIcon
              sx={{
                fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
              }}
            />
          </span>
        </div>
      </div>
    </header>
  );
}
