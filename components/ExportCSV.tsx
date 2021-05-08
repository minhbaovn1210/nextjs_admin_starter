import { useTranslation } from "i18n";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { CSVLink } from "react-csv";
import Button from "./Button";

type ExportCSVType = {
  headers?: string[];
  getDataHandler: () => Promise<any[][]>;
};

const ExportCSV: FunctionComponent<ExportCSVType> = ({
  headers,
  getDataHandler,
}) => {
  const csvLinkRef = useRef<any>();
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    if (data.length !== 0 && csvLinkRef.current) {
      setTimeout(() => {
        csvLinkRef.current.link.click();
      }, 0);

      setTimeout(() => {
        setData([]);
      }, 1000);
    }
  }, [data.length, csvLinkRef.current]);

  const handleExportCSV = async () => {
    await setExporting(true);
    const newData = [];
    if (headers) {
      newData.push(headers);
    }

    const resData = await getDataHandler();
    resData.forEach((d: any[]) => {
      newData.push(d);
    });

    await setData(newData);
    await setExporting(false);
  };

  return (
    <>
      <CSVLink
        ref={csvLinkRef}
        data={data}
        filename="Livin-Store-Partner.csv"
      />

      <Button
        disabled={exporting}
        onClick={handleExportCSV}
        buttonType={exporting ? "warning" : "success"}
      >
        {exporting ? t("exporting") : t("export-to-csv")}
      </Button>
    </>
  );
};

export default ExportCSV;
