import { Space } from "antd";
import { FunctionComponent } from "react";
import styled, { css } from "styled-components";

const Wrapper = styled.div<{ center: boolean }>`
  position: absolute;
  margin: -20px;
  bottom: 20px;
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 24px;
  justify-content: flex-end;
  button {
    min-width: 120px;
  }

  ${(props) =>
    props.center &&
    css`
      justify-content: center;
    `}
`;

const ActionContainer: FunctionComponent<{ center?: boolean }> = ({
  children,
  center,
  ...props
}) => {
  return (
    <Wrapper center={center} {...props}>
      <Space size="middle">{children}</Space>
    </Wrapper>
  );
};

export default ActionContainer;
