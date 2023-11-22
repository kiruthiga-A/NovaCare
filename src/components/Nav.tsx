"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const handleHamburger = () => {
    setIsOpen(!isOpen);
  };
  const NavLink = [
    { key: 1, lable: "Demo", link: "/demo" },
    { key: 2, lable: "Research", link: "/research" },
    { key: 3, lable: "Technology", link: "/technology" },
  ];
  const currentPathname = usePathname();

  return (
    <section className="fixed w-full top-0 left-0 flex flex-row justify-between items-center px-5">
      <Link className="flex flex-row items-center" href="/">
        <Image alt="logo" src={"/icon.jpeg"} width={50} height={50} />
        <h1 className="font-extrabold text-4xl ml-2">NCI</h1>
      </Link>

      <section onClick={handleHamburger} className=" md:hidden">
        {isOpen ? <GiHamburgerMenu size={32} /> : <IoClose size={32} />}
      </section>

      <ul
        className={`absolute top-0 p-5 pt-24 flex flex-col bg-white rounded-r-xl shadow-xl space-y-7 h-screen items-center w-[70%] transition-all ${
          !isOpen ? "left-0" : "left-[-500px] "
        } md:static md:w-auto md:flex-row md:space-y-0 md:space-x-5 md:bg-transparent md:pt-5 md:h-auto md:shadow-none md:rounded-none`}
      >
        {NavLink.map((val) => (
          <li key={val.key}>
            <Link
              href={val.link}
              className={cn(
                "text-xl font-bold  hover:text-pink-400 transition-colors",
                val.link == currentPathname ? "text-pink-400" : "text-white",
              )}
            >
              {val.lable}
            </Link>
          </li>
        ))}
        <Button variant={"secondary"}>Contact Us</Button>
      </ul>
    </section>
  );
}
