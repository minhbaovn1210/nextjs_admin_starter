import React, { forwardRef } from "react";
import { Button as AntButton, ButtonProps } from "antd";
import styled, { useTheme } from "styled-components";
import { ThemeType } from "./styles/GlobalStyles";

const StyledButton = styled(AntButton)`
  min-width: 80px;
  border-radius: 21px;
`;

type ButtonType =
  | "primary"
  | "danger"
  | "cancel"
  | "success"
  | "warning"
  | "dark";

const getButtonColor = (
  type: ButtonType,
  outline: boolean
): {
  color: string;
  borderColor: string;
  backgroundColor: string;
} => {
  const theme: ThemeType = useTheme();

  switch (type) {
    case "success":
      return {
        color: outline ? theme.successColor : "white",
        borderColor: theme.successColor,
        backgroundColor: outline ? "white" : theme.successColor,
      };
    case "warning":
      return {
        color: outline ? theme.warningColor : "white",
        borderColor: theme.warningColor,
        backgroundColor: outline ? "white" : theme.warningColor,
      };
    case "danger":
      return {
        color: outline ? theme.errorColor : "white",
        borderColor: theme.errorColor,
        backgroundColor: outline ? "white" : theme.errorColor,
      };
    case "cancel":
      return {
        color: outline ? theme.normalColor : "white",
        borderColor: theme.normalColor,
        backgroundColor: outline ? "white" : theme.normalColor,
      };
    case "dark":
      return {
        color: outline ? theme.darkColor : "white",
        borderColor: theme.darkColor,
        backgroundColor: outline ? "white" : theme.darkColor,
      };
    case "primary":
    default:
      return {
        color: outline ? theme.primaryColor : "white",
        borderColor: theme.primaryColor,
        backgroundColor: outline ? "white" : theme.primaryColor,
      };
  }
};

const Button = forwardRef<
  any,
  ButtonProps & {
    buttonType?: ButtonType;
    outline?: boolean;
  }
>(({ buttonType = "primary", outline, style, ...props }, ref) => {
  return (
    <StyledButton
      ref={ref}
      style={{ ...style, ...getButtonColor(buttonType, outline) }}
      {...props}
    />
  );
});

export default Button;
