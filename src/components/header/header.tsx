import Link from "next/link";

import HomeLink from "../homeLink/homeLink";
import React from "react";
import ThemeSwitch from "../ThemeSwitch";
import BlogsIcon from "./icons/blogs.svg";
import DemosIcon from "./icons/demo.svg";
import GitHubIcon from "./icons/github.svg";

const Header: React.FC = () => {
  return (
    <header className="header top-0 flex h-[48px] w-screen items-center justify-between bg-transparent pl-[24px] pr-[24px]">
      <HomeLink />

      <div className="flex items-center gap-[14px]">
        <Link
          className="flex cursor-pointer items-center gap-[4px] transition-all hover:text-[var(--title)]"
          href={"/blogs"}
        >
          <BlogsIcon />
          Blogs
        </Link>
        <Link
          className="flex cursor-pointer items-center gap-[4px] transition-all hover:text-[var(--title)]"
          href={"/demos"}
        >
          <DemosIcon />
          Demos
        </Link>

        <Link
          className="flex cursor-pointer items-center gap-[4px] transition-all hover:text-[var(--title)]"
          href={"https://github.com/feargadh"}
        >
          <GitHubIcon />
          GitHub
        </Link>

        <ThemeSwitch />
      </div>
    </header>
  );
};

export default Header;
