"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";
// import Logo from "./cai.svg";
import Nnc from "./nnc.svg";
import "./index.css";

export default function HomeLink() {
  const pathname = usePathname();
  const isActive = pathname === "/";
  return (
    <Link
      className={[
        "inline-block text-2xl font-black",
        isActive ? "" : "hover:scale-[1.02]",
      ].join(" ")}
      href="/"
    >
      <div
        className=" logo text-[104px]"
        style={{
          color: "var(--headerColor)",
        }}
      >
        <Nnc className="logo" />
        {/* <Logo /> */}
      </div>
    </Link>
  );
}
