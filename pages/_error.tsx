import { NextPage, NextPageContext } from "next";
import { withTranslation } from "i18n";

type ErrorPage = {
  statusCode: string;
  t: any;
};

const Error: NextPage<ErrorPage> = ({ statusCode, t }) => {
  return (
    <p>
      {statusCode
        ? t("error-with-status", { statusCode })
        : t("error-without-status")}
    </p>
  );
};

Error.getInitialProps = ({ res, err }: NextPageContext): any => {
  let statusCode = null;
  if (res) {
    ({ statusCode } = res);
  } else if (err) {
    ({ statusCode } = err);
  }

  return {
    namespacesRequired: ["common"],
    statusCode,
  };
};

export default withTranslation("common")(Error);
