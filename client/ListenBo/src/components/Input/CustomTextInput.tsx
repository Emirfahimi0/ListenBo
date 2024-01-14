import React, { Fragment, FunctionComponent, useEffect } from "react";
import {
  NativeSyntheticEvent,
  Pressable,
  Text,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import {
  alignFlexStart,
  colorGray,
  colorRose,
  colorTransparent,
  flexRow,
  flexWrap,
  fs12RegBlack2,
  fs12RegRose2,
  fs12SemiBoldJett3,
  sh10,
  sh32,
  sh8,
  sw16,
  sw2,
  sw20,
  sw4,
  sw8,
} from "../../styles";
import { CustomSpacer } from "../spacer";
import { Icon } from "../Icons/IcoMoon";
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withSpring, withTiming } from "react-native-reanimated";

interface ICustomTextInputProps extends TextInputProps {
  containerStyle?: TextStyle;
  error?: string;
  errorBorderStyle?: number;
  increaseErrorWidth?: number;
  label: string;
  labelHolder?: string;
  spaceBottomLabel?: number;
  spaceToTop?: number;
  setVisible?: () => void;
  visibilityText?: boolean;
}

export const CustomTextInput: FunctionComponent<ICustomTextInputProps> = ({
  autoCapitalize,
  containerStyle,
  error,
  errorBorderStyle,
  increaseErrorWidth,
  keyboardType,
  label,
  labelHolder,
  onBlur,
  onChange,
  onFocus,
  // onLayout,
  setVisible,
  visibilityText,
  secureTextEntry,
  spaceBottomLabel,
  spaceToTop,
}: ICustomTextInputProps) => {
  const transformValue = useSharedValue(0);

  const defaultTextStyle: TextStyle = {
    ...fs12RegBlack2,
    padding: sw8,
    backgroundColor: colorGray._6,
    borderRadius: sw16,
    borderColor: error !== undefined ? colorRose._1 : colorTransparent,
    borderWidth: errorBorderStyle === undefined ? sw2 : errorBorderStyle,
  };

  const errorWidthStyle: TextStyle = {
    width: increaseErrorWidth ? increaseErrorWidth : "auto",
    lineHeight: sh10,
    ...fs12RegRose2,
    ...flexWrap,
  };

  const shakeUI = () => {
    transformValue.value = withSequence(
      withTiming(-10, { duration: 50 }),
      withSpring(0, {
        damping: 8,
        stiffness: 1000,
        mass: 0.5,
        restDisplacementThreshold: 0.1,
      }),
    );
  };
  const animateErrorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: transformValue.value }],
      ...flexRow,
    };
  });
  const errorLabelStyle: ViewStyle = {
    ...alignFlexStart,
    ...animateErrorStyle,
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

  const textInputStyle: TextStyle = containerStyle !== undefined ? { ...defaultTextStyle, ...containerStyle } : defaultTextStyle;

  useEffect(() => {
    if (error !== undefined) shakeUI();
  }, [error]);

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
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          placeholder={labelHolder === undefined ? undefined : labelHolder}
          onBlur={handleOnBlur}
          onChange={onChange}
          onFocus={handleOnFocus}
        />
        {visibilityText === undefined ? null : (
          <View style={{ position: "absolute", right: sw20, top: sh32 }}>
            <Pressable onPress={setVisible}>
              <Icon color={colorRose._2} name={visibilityText === true ? "eye-disabled" : "eye"} size={sw16} />
            </Pressable>
          </View>
        )}

        {error === undefined ? null : (
          <Fragment>
            <CustomSpacer space={sh8} />
            <Animated.View style={errorLabelStyle}>
              <Icon color={colorRose._2} name="warning" size={sw16} />
              <CustomSpacer isHorizontal={true} space={sw8} />
              <Text style={errorWidthStyle}>{error}</Text>
            </Animated.View>
          </Fragment>
        )}
      </View>
    </Fragment>
  );
};
