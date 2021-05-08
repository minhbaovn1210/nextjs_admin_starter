import { forwardRef, useCallback, useState } from "react";
import { message, Upload } from "antd";
import { useTranslation } from "i18n";
import styled from "styled-components";
import HttpService from "lib/httpService";
import Button from "./Button";

const maxSize = 10 * 1024 * 1024;

const StyledUpload = styled(Upload)``;

type FileUploadType = {
  onChange?: (result: string) => void;
  uploadUrl?: string;
  baseData?: any;
  fileFieldName?: string;
};

const FileUpload = forwardRef<any, FileUploadType>(
  (
    { onChange, uploadUrl, baseData, fileFieldName = "file", ...props },
    ref
  ) => {
    const { t } = useTranslation();
    const [uploading, setUploading] = useState(false);

    const isValidImageFile = useCallback((type: string, size: number) => {
      if (size > maxSize) {
        message.error({ content: "Maximum file size is 10MB" });
        return false;
      }

      return true;
    }, []);

    const handleUpload = async (file: any) => {
      if (uploading || !uploadUrl) {
        return;
      }
      setUploading(true);
      if (!isValidImageFile(file.type, file.size)) {
        return setUploading(false);
      }

      const formData = new FormData();
      Object.keys(baseData).forEach((key) => {
        formData.append(key, baseData[key]);
      });
      formData.append(fileFieldName, file);

      const result = await HttpService().post(uploadUrl, formData);

      if (onChange && typeof onChange === "function") {
        onChange(result.data.data?.url);
      }

      await setUploading(false);
    };

    return (
      <StyledUpload
        maxCount={1}
        fileList={[]}
        ref={ref}
        beforeUpload={handleUpload}
        {...props}
      >
        <Button
          disabled={uploading}
          loading={uploading}
          outline
          buttonType="primary"
        >
          {t("upload")}
        </Button>
      </StyledUpload>
    );
  }
);

export default FileUpload;
