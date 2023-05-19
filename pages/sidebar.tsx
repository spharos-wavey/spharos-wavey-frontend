import React, { useState } from "react";
import ModalSideBar from "@/components/modals/ModalSideBar";

export default function Sidebar() {
  const [isSideOpen, setIsSideOpen] = useState(false);

  const handleClose = () => {
    setIsSideOpen(false);
  };

  return (
    <ModalSideBar
      onClose={handleClose}
      setIsSideOpen={setIsSideOpen}
      isSideOpen={isSideOpen}
    />
  );
}
