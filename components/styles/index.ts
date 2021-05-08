import styled, { css } from "styled-components";

export const WhiteWrapper = styled.div<{
  minHeight?: string;
  maxHeight?: string;
  height?: string;
  margin?: string;
  padding?: string;
}>`
  border-radius: 4px;
  background-color: white;
  position: relative;

  ${(props) =>
    props.minHeight &&
    css`
      min-height: ${props.minHeight};
    `}
  ${(props) =>
    props.maxHeight &&
    css`
      max-height: ${props.maxHeight};
    `}
  ${(props) =>
    props.height &&
    css`
      height: ${props.height};
    `}
  ${(props) =>
    props.margin &&
    css`
      margin: ${props.margin};
    `}
  ${(props) =>
    props.padding &&
    css`
      padding: ${props.padding};
    `}
`;
