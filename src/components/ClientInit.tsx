"use client";

import { useEffect } from "react";
import { initGSAP } from "@/lib/gsap-init";
import Cursor from "./Cursor";
import Navbar from "./Navbar";

export default function ClientInit() {
  useEffect(() => {
    initGSAP();
  }, []);

  return (
    <>
      <Cursor />
      <Navbar />
    </>
  );
}
