import { Fragment, FunctionComponent, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextStyle, ViewStyle, Pressable } from "react-native";
import {
  centerHV,
  sw8,
  sh50,
  colorOrange,
  fs14RegGray1,
  fs10RegGray4,
  border,
  colorBlue,
  alignSelfEnd,
  sw16,
  colorGreen,
  sw1,
  colorGray,
  sh40,
  sh32,
} from "../../styles";
import { Icon, IconProps } from "../Icons";
import { DocumentPickerOptions } from "react-native-document-picker";
import { SupportedPlatforms } from "react-native-document-picker/lib/typescript/fileTypes";
import { DirectoryPickerResponse, DocumentPickerResponse, isCancel, isInProgress, types, pickSingle } from "react-native-document-picker";
import Animated, {
  ReduceMotion,
  cancelAnimation,
  measure,
  runOnJS,
  runOnUI,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { isUndefined } from "lodash";
import { fileUrl } from "../../types/upload";

interface FileSelectorProps {
  label: string;
  labelStyle?: TextStyle;
  onPressAction: (value: DocumentPickerResponse[] | DirectoryPickerResponse | null | undefined) => void;
  options?: DocumentPickerOptions<SupportedPlatforms>;
  subLabel?: string;
  value?: fileUrl | undefined;
}

export const FileSelector: FunctionComponent<FileSelectorProps> = ({
  label,
  labelStyle,
  value,
  onPressAction,
  subLabel,
  options,
}: FileSelectorProps) => {
  const [upload, setUpload] = useState<Array<DocumentPickerResponse> | DirectoryPickerResponse | null | undefined>(undefined);
  const paddingAnimated = useSharedValue(sh40);
  const animatedRef = useAnimatedRef();
  const [height, setHeight] = useState<number>(0);

  const defaultOptions: DocumentPickerOptions<SupportedPlatforms> = {
    type: [types.allFiles],
    allowMultiSelection: false,
    copyTo: "cachesDirectory",
    ...options,
  };

  const handleError = (err: unknown) => {
    if (isCancel(err)) {
      console.warn("cancelled");
      // User cancelled the picker, exit any dialogs or menus and move on
    } else if (isInProgress(err)) {
      console.warn("multiple pickers were opened, only the last will be considered");
    } else {
      throw err;
    }
  };
  const handleUpload = async () => {
    try {
      const file = await pickSingle({
        ...defaultOptions,
      });

      setUpload(file);
      return file;
    } catch (error) {
      handleError(error);
    }

    return;
  };

  const color = isUndefined(upload) ? border(colorGray._2, sw1, sw8, "dashed") : border(colorBlue._3, sw1, sw8, "solid");

  const uploadContainerStyle: ViewStyle = {
    ...centerHV,
    paddingHorizontal: sw8,
    paddingVertical: sh50,
    ...color,
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      ...uploadContainerStyle,
      paddingVertical: paddingAnimated.value,
    };
  }, [upload]);

  const defaultIconStyle: IconProps =
    isUndefined(upload) || upload === null
      ? {
          name: "icon_file",
          color: colorOrange._1,
        }
      : { name: "icon_in-memory", color: colorBlue._4 };

  const scaleDownUI = () => {
    runOnUI(() => {
      "worklet";
      const measurement = measure(animatedRef);

      if (measurement === null) {
        return;
      }
      runOnJS(setHeight)(Math.floor(measurement.height));
    })();

    paddingAnimated.value = withSpring(upload !== undefined ? paddingAnimated.value - sh32 : sh40, {
      mass: 3.1,
      damping: 10,
      stiffness: 40,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 2,
      reduceMotion: ReduceMotion.System,
    });
  };

  const handleOnPress = async () => {
    const file = await handleUpload();
    onPressAction(file);
  };
  const fileNameLabel = isUndefined(upload) || upload === null ? label : (upload as DocumentPickerResponse).name;

  const attachmentLabel = isUndefined(upload) || upload === null ? subLabel : "Remove Attachment";

  useEffect(() => {
    scaleDownUI();

    if (upload !== undefined && height <= 152 && paddingAnimated.value !== sh40) {
      return cancelAnimation(paddingAnimated);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [upload]);

  return (
    <Fragment>
      <TouchableOpacity onPress={handleOnPress} onPressIn={handleOnPress}>
        <Animated.View style={animatedStyle} ref={animatedRef}>
          <Icon {...defaultIconStyle} />
          <Text style={{ ...fs14RegGray1, ...labelStyle }}>{fileNameLabel}</Text>
          <Text style={fs10RegGray4}>{subLabel === undefined ? "" : attachmentLabel}</Text>
          {upload ? (
            <View style={alignSelfEnd}>
              <Pressable onPress={() => setUpload(undefined)}>
                <Icon name="checkmark-done-circle" size={sw16} color={colorGreen._1} />
              </Pressable>
            </View>
          ) : null}
        </Animated.View>
      </TouchableOpacity>
    </Fragment>
  );
};
