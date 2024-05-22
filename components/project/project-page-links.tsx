"use client";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  id: string;
};

function ProjectPageLinks({ id }: Props) {
  const links = [
    {
      title: "All Tasks",
      href: `/projects/${id}/tasks`,
    },
    {
      title: "Board",
      href: `/projects/${id}/board`,
    },
    {
      title: "Setting",
      href: `/projects/${id}/setting`,
    },
  ];
  const pathname = usePathname();
  return (
    <div className="flex gap-3 border-b-2 border-primary py-2">
      {links.map((link) => (
        <Link
          className={`px-4 py-2 transition-all duration-300 rounded-lg ${
            pathname === link.href && "shadow-inner shadow-primary "
          }`}
          href={link.href}
          key={link.title}
        >
          {link.title}
        </Link>
      ))}
    </div>
  );
}

export default ProjectPageLinks;
