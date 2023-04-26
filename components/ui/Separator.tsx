import React from "react";

export default function Separator(props: { gutter?: number }) {
  return (
    <div className="separator" style={{ margin: `${props.gutter}rem 0` }}></div>
  );
}
