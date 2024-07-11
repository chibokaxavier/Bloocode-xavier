"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Nav = () => {
  const links = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Furnitures",
      path: "/furnitures",
    },
    {
      name: "Beauty",
      path: "/beauty",
    },
    {
      name: "Fragrances",
      path: "/fragrances",
    },
    {
      name: "Groceries",
      path: "/groceries",
    },
  ];
  const pathName = usePathname();
  return (
    <nav className="flex gap-8">
      {links.map((link, index) => {
        return (
          <Link
            href={link.path}
            key={index}
            className={`${
              link.path === pathName &&
              "text-yellow-600 border-b-2 border-yellow-600"
            } capitalize  hover:text-yellow-600 transition-all font-semibold text-lg`}
          >
            {" "}
            {link.name}{" "}
          </Link>
        );
      })}{" "}
    </nav>
  );
};

export default Nav;
