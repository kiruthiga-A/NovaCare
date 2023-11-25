import { usePathname } from "next/navigation";
import { useState } from "react";

export default function useNav() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [activeNav, setActiveNav] = useState<boolean>(false);
  const handleHamburger = () => {
    setIsOpen(!isOpen);
  };
  const NavLink = [
    { key: 1, lable: "Demo", link: "/demo" },
    { key: 2, lable: "Research", link: "/research" },
    { key: 3, lable: "Technology", link: "/technology" },
  ];
  const currentPathname = usePathname();

  const handleScroll = () => {
    if (window.scrollY >= 540) setActiveNav(true);
    else setActiveNav(false);
  };

  if (typeof window !== "undefined")
    window.addEventListener("scroll", handleScroll);

  return {
    isOpen,
    activeNav,
    NavLink,
    handleScroll,
    handleHamburger,
    currentPathname,
  };
}
