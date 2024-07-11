"use client";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import Nav from "@/components/Nav";
import { Button } from "./ui/button";
import MobileNav from "./MobileNav";

const Header = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const handleStickyHeader = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current?.classList.add("sticky_header");
      } else {
        headerRef.current?.classList.remove("sticky_header");
      }
    });
  };
  useEffect(() => {
    handleStickyHeader();
    return () => window.removeEventListener("scroll", handleStickyHeader);
  });
  return (
    <header className="py-8 xl:py-12 sticky top-0 z-30 ">
      <div className="container mx-auto flex justify-between items-center">
        <Link href={"/"}>
          <h1 className="text-4xl font-semibold">
            BlooCodeTech<span className="text-accent">.</span>
          </h1>
        </Link>
        <div className="hidden xl:flex gap-8 justify-center items-center">
          <Nav />
        </div>
        <div className="xl:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
