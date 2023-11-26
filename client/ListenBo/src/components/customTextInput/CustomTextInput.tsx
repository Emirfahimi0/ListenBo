import React, { Fragment, FunctionComponent } from "react";
import { NativeSyntheticEvent, Text, TextInput, TextInputFocusEventData, TextInputProps, TextStyle, View, ViewStyle } from "react-native";
import {
  centerHorizontal,
  colorGray,
  colorRose,
  colorTransparent,
  flexRow,
  fs12RegRose2,
  fs12SemiBoldJett3,
  sh10,
  sh8,
  sw10,
  sw16,
  sw2,
  sw336,
  sw362,
  sw4,
  sw8,
} from "../../styles";
import { CustomSpacer } from "../spacer";
import { Icon } from "../Icons/IcoMoon";

interface ICustomTextInputProps extends TextInputProps {
  containerStyle?: ViewStyle;
  error?: string;
  errorBorderStyle?: number;
  increaseErrorWidth?: number;
  label: string;
  spaceBottomLabel?: number;
  labelHolder?: string;
  spaceToTop?: number;
}

export const CustomTextInput: FunctionComponent<ICustomTextInputProps> = ({
  containerStyle,
  error,
  errorBorderStyle,
  increaseErrorWidth,
  label,
  labelHolder,
  onBlur,
  onFocus,
  onLayout,
  spaceBottomLabel,
  spaceToTop,
}: ICustomTextInputProps) => {
  const defaultContainerStyle: ViewStyle = {
    padding: sw8,
    backgroundColor: colorGray._6,
    borderRadius: sw16,
    borderColor: error !== undefined ? colorRose._1 : colorTransparent,
    borderWidth: errorBorderStyle === undefined ? sw2 : errorBorderStyle,
  };

  const errorWidthStyle: TextStyle = {
    width: increaseErrorWidth ? sw362 : sw336,
    lineHeight: sh10,
    ...fs12RegRose2,
  };

  const handleOnBlur = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (onBlur) {
      onBlur(event);
    }
  };

  const handleOnFocus = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (onFocus) {
      onFocus(event);
    }
  };

  const textInputStyle: ViewStyle = containerStyle !== undefined ? { ...containerStyle, ...defaultContainerStyle } : defaultContainerStyle;
  return (
    <Fragment>
      <View style={{ marginTop: spaceToTop !== undefined ? spaceToTop : sh8, paddingHorizontal: sw8 }}>
        <View style={{ marginBottom: spaceBottomLabel === undefined ? sw4 : spaceBottomLabel }}>
          <Text suppressHighlighting={true} style={{ ...fs12SemiBoldJett3, paddingLeft: sw8 }}>
            {label}
          </Text>
        </View>

        <TextInput
          style={textInputStyle}
          placeholder={labelHolder === undefined ? undefined : labelHolder}
          onBlur={handleOnBlur}
          onFocus={handleOnFocus}
        />
        {error === undefined ? null : (
          <Text>
            <View>
              <CustomSpacer space={sh8} />
              <View style={{ ...flexRow, ...centerHorizontal, paddingHorizontal: sw10 }}>
                <Icon color={colorRose._2} name="exclamation-circle" size={sw16} />
                <CustomSpacer isHorizontal={true} space={sw8} />
                <Text style={errorWidthStyle}>{error}</Text>
              </View>
            </View>
          </Text>
        )}
      </View>
    </Fragment>
  );
};
