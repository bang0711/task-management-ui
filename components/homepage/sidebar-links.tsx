"use client";
import { Home, FolderDot, ClipboardList } from "lucide-react";
import { Link } from "next-view-transitions";
import { usePathname, useParams } from "next/navigation";
import React from "react";

type Props = {};

function SidebarLinks({}: Props) {
  const pathname = usePathname();
  const links = [
    {
      title: "Home",
      href: "/",
      icon: Home,
    },
    {
      title: "Projects",
      href: "/projects",
      icon: FolderDot,
    },
    {
      title: "Tasks",
      href: "/tasks",
      icon: ClipboardList,
    },
  ];
  return (
    <ul className="flex flex-col py-2">
      {links.map((link) => (
        <li key={link.title}>
          <Link
            href={link.href}
            className={`flex transition-all duration-300 items-center min-w-40 px-4 py-2 ${
              pathname === link.href && "bg-primary/10"
            }`}
          >
            <span className="">
              <link.icon />
            </span>
            <span className=" w-20 flex-1 px-4">{link.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default SidebarLinks;
