import * as React from "react";
import styled from "styled-components";
import { Row } from "antd";

import { useTranslation } from "i18n";
import useExampleReducerHook from "utils/reducers/example/useExampleReducerHook";

const Wrapper = styled(Row)``;

const Home = () => {
  const { t } = useTranslation();

  const { state, getExampleList } = useExampleReducerHook();
  console.log("🚀 ~ file: index.tsx ~ line 14 ~ Home ~ state", state);

  React.useEffect(() => {
    getExampleList();
  }, []);

  return <Wrapper gutter={[20, 20]}>{t("hello")}</Wrapper>;
};

Home.getInitialProps = () => ({
  namespacesRequired: ["common"],
});

export default Home;
