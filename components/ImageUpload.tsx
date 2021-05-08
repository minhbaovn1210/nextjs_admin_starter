import { forwardRef, useCallback, useEffect, useState } from "react";
import { Image, message, Upload } from "antd";
import { useTranslation } from "i18n";
import styled from "styled-components";
import HttpService from "lib/httpService";
import Button from "./Button";

const maxSize = 10 * 1024 * 1024;

const StyledUpload = styled(Upload)``;

type UploadFileType = File & {
  originFileObj: File;
};

type ImageUploadType = {
  onChange?: (result: string) => void;
  imageStyle?: React.CSSProperties;
  customInput?: HTMLElement | any;
  value?: string;
  uploadUrl?: string;
  baseData?: any;
  fileFieldName?: string;
};

const ImageUpload = forwardRef<any, ImageUploadType>(
  (
    {
      onChange,
      imageStyle = {},
      customInput,
      uploadUrl,
      baseData,
      fileFieldName = "file",
      ...props
    },
    ref
  ) => {
    const { t } = useTranslation();
    const [uploading, setUploading] = useState(false);
    const [fileUrl, setFileUrl] = useState<string>("");

    useEffect(() => {
      if (props.value !== fileUrl) {
        setFileUrl(props.value);
      }
    }, [props.value]);

    const isValidImageFile = useCallback((type: string, size: number) => {
      if (!["image/png", "image/jpeg"].includes(type) || size > maxSize) {
        message.error({ content: t("invalid-image-file") });
        return false;
      }

      return true;
    }, []);

    const fileReaderHandler = async (e: any) => {
      setFileUrl(e.target.result);
      if (onChange && typeof onChange === "function") {
        onChange(e.target.result);
      }

      setUploading(false);
    };

    const onFileChange = ({
      file,
    }: {
      file: UploadFileType;
      fileList: UploadFileType[];
    } & any) => {
      if (uploading || uploadUrl) {
        return;
      }
      setUploading(true);
      if (!isValidImageFile(file.type, file.size)) {
        return setUploading(false);
      }

      try {
        const reader = new FileReader();
        reader.addEventListener("load", fileReaderHandler);
        reader.readAsDataURL(file.originFileObj);
      } catch (ex) {
        setUploading(false);
      }
    };

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

      setFileUrl(result.data.data?.url);
      if (onChange && typeof onChange === "function") {
        onChange(result.data.data?.url);
      }

      await setUploading(false);
    };

    return (
      <div>
        {fileUrl && (
          <>
            <Image src={fileUrl} style={imageStyle} />
            <br />
          </>
        )}

        <StyledUpload
          accept="image/png, image/jpeg"
          onChange={onFileChange}
          maxCount={1}
          fileList={[]}
          ref={ref}
          beforeUpload={handleUpload}
          {...props}
        >
          {customInput && customInput}

          {!customInput && (
            <Button
              disabled={uploading}
              loading={uploading}
              outline
              buttonType="primary"
            >
              {t("image-upload")}
            </Button>
          )}
        </StyledUpload>
      </div>
    );
  }
);

export default ImageUpload;
