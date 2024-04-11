import { DocumentPickerResponse, DirectoryPickerResponse } from "react-native-document-picker";

type fileUrl = {
  poster: DocumentPickerResponse[] | DirectoryPickerResponse | null | undefined;
  file: DocumentPickerResponse[] | DirectoryPickerResponse | null | undefined;
};

declare global {
  type TCategoriesPlaylist = "Art" | "Business" | "Education" | "Entertainment" | "Kids & Family" | "Music" | "Science" | "Tech" | "Others";
  interface IDropdownOptions<T> {
    option: T;
    value: T;
  }

  interface IUploadFile {
    category: IDropdownOptions<TCategoriesPlaylist> | undefined;
    description: string;
    fileUrl: fileUrl | undefined;
    title: string;
  }
}

interface IFormAudio {
  category: IDropdownOptions<TCategoriesPlaylist> | undefined;
  description: string;
  fileUrl: fileUrl | undefined;
  title: string;
}
