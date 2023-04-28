import { headerMenuType } from "@/types/headerType";
import Image from "next/image";
import React from "react";

export default function HeaderMenuItem(props: {
  menuItem: headerMenuType;
  discription?: boolean;
  status?: string;
}) {
  return (
    <li>
      <Image
        src={props.menuItem.icon}
        width={200}
        height={200}
        alt={props.menuItem.name}
        priority
      />
      {props.discription && props.discription === true ? (
        <p>{props.status}</p>
      ) : (
        ""
      )}
    </li>
  );
}
