import React, { Fragment, FunctionComponent, useState } from "react";
import { UploadComponent } from "./UploadComponent";
import { createAudio } from "../../../network";
import { DocumentPickerResponse } from "react-native-document-picker";
import { isUndefined } from "lodash";
import { Alert } from "react-native";
import { KEYS, getStorage } from "../../../utils";

interface IUploadProps {}

const initialInputState: IUploadFile = {
  title: "",
  description: "",
  category: undefined,
  fileUrl: undefined,
};

export const Upload: FunctionComponent<IUploadProps> = ({}: IUploadProps) => {
  const [input, setInput] = useState<IUploadFile>(initialInputState);
  const [loading, setLoading] = useState<boolean | undefined>(undefined);
  const [progress, setProgress] = useState<number>(0);

  const { title, description, category, fileUrl } = input;

  const handleProgress = (value: number) => {
    console.log(value);
    if (value >= 100) {
      setInput(initialInputState);
    }
    setProgress(value);
  };

  const handleUpload = async () => {
    const formData = new FormData();

    if (input === undefined) {
      return;
    }
    formData.append("title", title);
    formData.append("about", description);
    formData.append("category", category?.value);

    if (fileUrl !== undefined && fileUrl.file) {
      const { name, type, uri } = fileUrl.file as DocumentPickerResponse;
      formData.append("file", {
        name,
        type,
        uri,
      });
    }

    if (fileUrl !== undefined && fileUrl.poster) {
      const { name, type, uri } = fileUrl.poster as DocumentPickerResponse;

      formData.append("poster", {
        name,
        type,
        uri,
      });
    }

    try {
      setLoading(true);

      const token = await getStorage(KEYS.AUTH_TOKEN);
      const response = (await createAudio(formData, token ? token : "", handleProgress)) as unknown;

      if (response.code === "error") {
        const errorMessage = response.error.data.error;
        Alert.alert(errorMessage);
        //response for success
      }
    } catch (error) {
      console.log(`error: ${error}`);
    }
    setLoading(false);
  };

  const disable = title === "" || description === "" || isUndefined(fileUrl) || isUndefined(category);

  const options: IDropdownOptions<TCategoriesPlaylist>[] = [
    { option: "Business", value: "Business" },
    { option: "Education", value: "Education" },
    { option: "Kids & Family", value: "Kids & Family" },
    { option: "Music", value: "Music" },
    { option: "Others", value: "Others" },
  ];

  return (
    <Fragment>
      <UploadComponent
        disable={disable}
        dropDownSelection={options}
        handleUpload={handleUpload}
        setUploadData={setInput}
        uploadData={input}
        progress={progress}
        loading={loading}
      />
    </Fragment>
  );
};
