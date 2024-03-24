import React, { FunctionComponent } from "react";
import { SafeAreaView, Text } from "react-native";

interface IUploadProps {}

export const Upload: FunctionComponent<IUploadProps> = ({}: IUploadProps) => {
  return (
    <SafeAreaView>
      <Text>Upload</Text>
    </SafeAreaView>
  );
};
