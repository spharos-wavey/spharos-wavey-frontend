import React, { ReactNode } from "react";
import styled from "styled-components";

export default function Button(props: {
  children: ReactNode;
  btnType: "button" | "submit" | "reset" | undefined;
  type?: string;
  btnEvent: React.MouseEventHandler<HTMLButtonElement> | undefined;
  shadow?: boolean;
}) {
  const { btnType, children, type, btnEvent, shadow } = props;

  let backgroundColor = "var(--billita-primary)";
  let fontColor = "var(--billita-white)";
  let border = "none";
  let boxShadow = "none";

  if (type === "disabled") {
    backgroundColor = "var(--billita-gray)";
    fontColor = "var(--billita-white)";
  }

  if (shadow === true) {
    boxShadow = "0px 4px 4px rgba(255, 73, 116, 0.3)";
  }

  const StyledButton = styled.button`
    border-radius: 50px;
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
