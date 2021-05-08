import { FunctionComponent } from "react";
import { Typography } from "antd";
import styled from "styled-components";
import _get from "lodash/get";

import { useTranslation } from "i18n";
import { useFormContext } from "react-hook-form";

const Wrapper = styled.div`
  width: 100%;

  .required {
    color: ${(props) => props.theme.errorColor};
  }

  .error {
    color: ${(props) => props.theme.errorColor};
  }
`;

interface FormContainerType extends React.HTMLAttributes<HTMLDivElement> {
  title?: string | any;
  required?: boolean;
  error?: string;
  Component: any;
  suffixTitle?: any;
}

const FormContainer: FunctionComponent<FormContainerType> = ({
  title,
  required,
  error,
  Component,
  suffixTitle,
  ...props
}) => {
  const { t } = useTranslation();
  const { errors } = useFormContext() || {};
  const formErrorName = _get(Component, "props.name", "");
  const errorMessage = error || _get(errors, `${formErrorName}.message`, "");

  return (
    <Wrapper {...props}>
      {title && (
        <Typography>
          {title} {required && <span className="required">*</span>}{" "}
          {suffixTitle && suffixTitle}
        </Typography>
      )}

      {Component}

      {errorMessage && <div className="error">{t(errorMessage)}</div>}
    </Wrapper>
  );
};

export default FormContainer;
