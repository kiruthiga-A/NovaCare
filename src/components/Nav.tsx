"use client";

import Image from "next/image";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import useNav from "@/hooks/useNav";

export default function NavBar() {
  const { isOpen, activeNav, NavLink, currentPathname, handleHamburger } =
    useNav();

  return (
    <section
      className={`fixed w-full top-0 left-0 z-20 flex flex-row justify-between items-center px-5 py-3 ${
        activeNav && "bg-accentBlue"
      } transition-all ease-in`}
    >
      <Link className="flex flex-row items-center" href="/">
        <Image alt="logo" src={"/icon.jpeg"} width={50} height={50} />
        <h1 className="font-extrabold text-4xl ml-2">NCI</h1>
      </Link>

      <section onClick={handleHamburger} className=" md:hidden">
        {isOpen ? <GiHamburgerMenu size={32} /> : <IoClose size={32} />}
      </section>

      <ul
        className={`absolute top-0 p-5 pt-24 flex flex-col bg-accentBlue rounded-r-xl shadow-xl space-y-7 h-screen items-center w-[70%] transition-all ${
          !isOpen ? "left-0" : "left-[-1500px] "
        } md:static md:w-auto md:flex-row md:space-y-0 md:space-x-5 md:bg-transparent md:pt-5 md:h-auto md:shadow-none md:rounded-none`}
      >
        {NavLink.map((val) => (
          <li key={val.key}>
            <Link
              href={val.link}
              className={cn(
                "text-xl font-bold  hover:text-accentRed transition-colors",
                val.link == currentPathname
                  ? "text-accentRed hover:text-accentRed-hover"
                  : "text-white",
              )}
            >
              {val.lable}
            </Link>
          </li>
        ))}
        <Button className="bg-accentRed hover:bg-accentRed-hover">
          Contact Us
        </Button>
      </ul>
    </section>
  );
}
