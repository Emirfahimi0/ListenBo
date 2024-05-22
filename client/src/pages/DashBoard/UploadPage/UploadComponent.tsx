import { Fragment, FunctionComponent, useState } from "react";
import { NativeSyntheticEvent, ScrollView, Text, TextInputChangeEventData, View, ViewStyle } from "react-native";
import { DirectoryPickerResponse, DocumentPickerResponse, types } from "react-native-document-picker";
import { Icon, CustomSpacer, FileSelector, CustomTextInput, DropdownPicker, CustomButton } from "../../../components";
import {
  sw12,
  sh12,
  sh80,
  flexRowSbSb,
  rowCenterVertical,
  fs12BoldBlack2,
  sw24,
  sh6,
  sh8,
  fs10RegGray4,
  sw8,
  fs12SemiBoldJett3,
  colorBlue,
  flexRowSaSa,
  fs12BoldGray1,
  fs12BoldWhite1,
  colorGray,
  colorTransparent,
  colorWhite,
  flexChild,
  sh2,
  sh40,
  sw143,
} from "../../../styles";

interface UploadComponentProps {
  disable: boolean;
  dropDownSelection: IDropdownOptions<TCategoriesPlaylist>[];
  handleUpload: () => Promise<void>;
  loading: boolean | undefined;
  progress: number;
  setUploadData: (value: IUploadFile) => void;
  uploadData: IUploadFile;
}

export const UploadComponent: FunctionComponent<UploadComponentProps> = ({
  disable,
  dropDownSelection,
  handleUpload,
  loading,
  progress,
  setUploadData,
  uploadData,
}: UploadComponentProps) => {
  const [selectedOption, setSelectedOption] = useState<IDropdownOptions<TCategoriesPlaylist> | undefined>(undefined);

  const handleOnChangeTitle = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const title = e.nativeEvent.text;
    setUploadData({ ...uploadData, title });
  };

  const handleOnChangeDescription = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const description = e.nativeEvent.text;
    setUploadData({
      ...uploadData,
      description,
    });
  };

  const handleUploadPoster = (value: DocumentPickerResponse[] | DirectoryPickerResponse | null | undefined) => {
    return setUploadData({ ...uploadData, fileUrl: { file: uploadData.fileUrl?.file, poster: value } });
  };

  const handleUploadfile = (value: DocumentPickerResponse[] | DirectoryPickerResponse | null | undefined) => {
    setUploadData({ ...uploadData, fileUrl: { poster: uploadData.fileUrl?.poster, file: value } });
  };

  const handleSelect = (category: IDropdownOptions<TCategoriesPlaylist>) => {
    setSelectedOption(category);
    return setUploadData({ ...uploadData, category });
  };

  const containerStyle: ViewStyle = {
    backgroundColor: colorWhite._1,
    borderRadius: sw24,
    paddingHorizontal: sw12,
    paddingVertical: sh12,
    ...flexChild,
  };

  const buttonStyle: ViewStyle = {
    borderRadius: sw12,
    borderWidth: sh2,
    borderColor: colorGray._5,
    backgroundColor: colorTransparent,
    maxWidth: sw143,
    height: sh40,
  };

  return (
    <ScrollView
      nestedScrollEnabled
      showsVerticalScrollIndicator={false}
      snapToAlignment="center"
      snapToStart
      stickyHeaderHiddenOnScroll
      contentContainerStyle={{ paddingHorizontal: sw12, paddingVertical: sh12, paddingBottom: sh80 }}>
      <View style={containerStyle}>
        <View style={{ ...flexRowSbSb, ...rowCenterVertical }}>
          <Text style={fs12BoldBlack2}>Add New Files</Text>
          <Icon name="close-circle" size={sw24} color={colorGray._3} />
        </View>
        <CustomSpacer space={sh12} />
        <FileSelector
          label={"Drag & Drop or choose file to upload"}
          onPressAction={handleUploadPoster}
          value={uploadData.fileUrl}
          options={{ type: [types.images], allowMultiSelection: false }}
          subLabel="Select jpeg, png or jpg"
        />
        <CustomSpacer space={sh12} />
        <FileSelector
          label={"Drag & Drop or choose file to upload"}
          onPressAction={handleUploadfile}
          value={uploadData.fileUrl}
          options={{ type: [types.audio], allowMultiSelection: false }}
          subLabel="Select mp3, mp4 or wav"
        />
        <CustomTextInput
          label={"Title"}
          onChange={handleOnChangeTitle}
          spaceBottomLabel={sh6}
          spaceToTop={sh8}
          style={fs10RegGray4}
          value={uploadData.title}
        />
        <CustomTextInput
          label={"Description"}
          onChange={handleOnChangeDescription}
          spaceBottomLabel={sh6}
          spaceToTop={sh8}
          style={fs10RegGray4}
          value={uploadData.description}
        />
        <View style={{ paddingHorizontal: sw8 }}>
          <DropdownPicker
            options={dropDownSelection}
            onSelect={handleSelect as (option: IDropdownOptions<TCategoriesPlaylist | unknown>) => void}
            label={"Category"}
            selected={selectedOption === undefined ? undefined : selectedOption}
            spaceBottomLabel={sh8}
            labelTextStyle={fs12SemiBoldJett3}
            required={uploadData.fileUrl === null ? true : false}
            dropBackgroundColor={colorBlue._1}
          />
        </View>
        <Fragment>
          <View style={{ ...flexRowSaSa, paddingVertical: sh12 }}>
            <CustomButton
              onPress={() => {}}
              text="Cancel"
              textStyle={fs12BoldGray1}
              buttonStyle={buttonStyle}
              disabled={false}
              withDebounce
            />
            <CustomButton
              onPress={handleUpload}
              textStyle={fs12BoldWhite1}
              text="Upload"
              loading={loading}
              withDebounce
              disabled={disable}
              buttonStyle={{ ...buttonStyle, backgroundColor: colorBlue._4, borderWidth: undefined }}
            />
          </View>
        </Fragment>
      </View>
    </ScrollView>
  );
};
