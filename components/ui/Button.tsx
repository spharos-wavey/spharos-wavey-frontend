import React, { ReactNode } from "react";
import styled from "styled-components";

export default function Button(props: {
  children: ReactNode;
  btnType: "button" | "submit" | "reset" | undefined;
  type?: string;
  btnEvent: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) {
  const { btnType, children, type, btnEvent } = props;

  let backgroundColor = "var(--billita-primary)";
  let fontColor = "var(--billita-white)";
  let border = "none";
  let boxShadow = "none";

  if (type === "disabled") {
    backgroundColor = "var(--billita-gray)";
    fontColor = "var(--billita-white)";
  }

  const StyledButton = styled.button`
    border-radius: 30px;
    width: 90%;
    height: 3rem;
    border: none;
    color: ${fontColor};
    background-color: ${backgroundColor};
    border: ${border};
    margin: 15px 0;
    letter-spacing: -0.2px;
    box-shadow: ${boxShadow};
    font-size: 1.1rem;
    white-space: nowrap;
    &:hover {
      filter: brightness(110%);
    }
    &:active {
      filter: brightness(120%);
    }
  `;

  return (
    <StyledButton type={btnType} onClick={btnEvent}>
      {children}
    </StyledButton>
  );
}
