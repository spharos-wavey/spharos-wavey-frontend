import React, { useState } from "react";
import ModalSideBar from "@/components/modals/ModalSideBar";

export default function Sidebar() {
  const [isSideOpen, setIsSideOpen] = useState(false);

  return (
    <ModalSideBar
      setIsSideOpen={setIsSideOpen}
      isSideOpen={isSideOpen}
    />
  );
}
