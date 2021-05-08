import { useRef } from "react";
import { NextPage } from "next";
import styled from "styled-components";
import { Button, Col, Input, Row } from "antd";
import { useForm, Controller } from "react-hook-form";
import { get as _get } from "lodash";

import { Router, useTranslation } from "i18n";
import HttpService from "lib/httpService";
import { AUTH_SERVICE_API } from "constants/api";
import { useAuth } from "providers/AuthProvider";

const Background = styled.div`
  background-image: url(/images/login-bg.jpg);
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  background: white;
  border-radius: 5px;
  min-height: 400px;

  .login-btn {
    width: 100%;
    border-radius: 21px;
    background-image: ${(props) => props.theme.headerBackground};

    :hover,
    :active {
      background-image: ${(props) => props.theme.headerBackground};
    }
    color: white;
    font-weight: bold;

    :disabled {
      opacity: 65%;
    }
  }
`;

const Login: NextPage = () => {
  const { t } = useTranslation();
  const { setToken, getProfile } = useAuth();
  const btnRef: any = useRef();

  const triggerSubmitWhenEnterOnInput = () => {
    btnRef.current.click();
  };

  const {
    formState: { isSubmitting },
    handleSubmit,
    control,
  } = useForm();

  const onSubmit = (data: { username: string; password: string }) => {
    Router.push("/");

    // return new Promise((resolve, reject) => {
    //   HttpService()
    //   .post(AUTH_SERVICE_API.postLoginURL(), {
    //     ...data,
    //   })
    //   .then((res) => {
    //     /* HOC will be automated to redirect to home if AuthProvider have token,
    //     so we don't have to handle here*/
    //     const tokenObject = _get(res, "data.data");
    //     if (tokenObject) {
    //       setToken(tokenObject);

    //       setTimeout(() => {
    //         getProfile();
    //       }, 200);
    //     }

    //     resolve(true);
    //   })
    //   .catch(reject);
    // });
  };

  return (
    <Background>
      <Wrapper>
        <div className="text-center mt-2 mb-5">
          <img
            className="mt-4"
            src="/images/logo.png"
            alt="icon"
            width="96px"
            height="96px"
          />
          <h3 className="font-weight-bold mt-3">{t("login")}</h3>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Row justify="center" gutter={[0, 12]}>
            <Col md={20} xs={22}>
              <Controller
                as={
                  <Input
                    className="rounded"
                    placeholder={t("username")}
                    onPressEnter={triggerSubmitWhenEnterOnInput}
                  />
                }
                control={control}
                name="username"
                rules={{ required: true }}
              />
            </Col>

            <Col md={20} xs={22}>
              <Controller
                as={
                  <Input.Password
                    className="rounded"
                    placeholder={t("password")}
                    onPressEnter={triggerSubmitWhenEnterOnInput}
                  />
                }
                control={control}
                name="password"
                rules={{ required: true }}
              />
            </Col>

            <Col md={20} xs={22}>
              <br />
              <Button
                ref={btnRef}
                className="login-btn"
                htmlType="submit"
                disabled={isSubmitting}
              >
                {t("login")}
              </Button>
            </Col>
          </Row>
        </form>
      </Wrapper>
    </Background>
  );
};

Login.getInitialProps = () => ({
  namespacesRequired: ["common"],
});

export default Login;
