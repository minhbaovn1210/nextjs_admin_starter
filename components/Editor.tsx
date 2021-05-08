import { forwardRef, useState } from "react";
import { Editor as TinyMCE, IAllProps } from "@tinymce/tinymce-react";

import config from "config";
import HttpService from "lib/httpService";
import { useTranslation } from "i18n";

type EditorPropType = {
  baseData?: {
    serviceType?: string;
    path?: string;
    isPrivate?: number;
  } & any;
  uploadURL?: string;
  onLoaded?: () => void;
};

const Editor = forwardRef<any, IAllProps & EditorPropType & any>(
  ({ onChange, value, baseData, uploadURL, onLoaded, ...props }, ref) => {
    const { t } = useTranslation();
    const [isActive, setIsActive] = useState(false);

    const handleEditorChange = (value: string) => {
      if (onChange) {
        onChange(value);
      }
    };

    return (
      <TinyMCE
        ref={ref}
        apiKey={config.TINYMCE_KEY}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "image code",
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | link image | code | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment",
          file_picker_types: "image",
          automatic_uploads: true,
          images_upload_handler: async function (blobInfo, success, failure) {
            if (!uploadURL) {
              return failure(t("does-not-have-upload-api"));
            }

            const formData = new FormData();
            Object.keys(baseData).forEach((key) => {
              formData.append(key, baseData[key]);
            });
            formData.append("file", blobInfo.blob());

            const result = await HttpService().post(uploadURL, formData);
            success(result.data.data.url);
          },
        }}
        onActivate={() => {
          if (onLoaded && !isActive) {
            setIsActive(true);
            onLoaded();
          }
        }}
        onEditorChange={handleEditorChange}
        initialValue={value}
        value={value}
        {...props}
      />
    );
  }
);

export default Editor;
