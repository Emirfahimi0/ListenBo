import { FunctionComponent, useState, Fragment } from "react";
import { TouchableOpacity, Text, View, ViewStyle, TextStyle } from "react-native";
import {
  fs12BoldWhite1,
  alignItemsStart,
  flexRowSbSb,
  sw12,
  sw18,
  centerVertical,
  colorJet,
  sw8,
  sh8,
  border,
  sw2,
  fs12BoldBlack2,
  colorGray,
  sh4,
  colorRose,
  sh100,
  fullWidth,
  sw4,
  fs12SemiBoldJett3,
  sh40,
} from "../../styles";
import { Icon } from "../Icons";
import { CustomSpacer } from "../spacer";
import { ScrollView } from "react-native-gesture-handler";
import Animated, { FadeInDown, ReduceMotion, measure, useAnimatedRef } from "react-native-reanimated";

interface DropdownPickerProps<T> {
  dropBackgroundColor?: string;
  label?: string;
  labelTextStyle?: TextStyle;
  onSelect: (options: IDropdownOptions<T>) => void;
  options: IDropdownOptions<T>[];
  optionStyle?: ViewStyle;
  required?: boolean;
  selected: IDropdownOptions<T> | undefined;
  spaceBottomLabel?: number;
  spaceToTop?: number;
}

export const DropdownPicker: FunctionComponent<DropdownPickerProps<unknown>> = <T,>({
  dropBackgroundColor,
  label,
  labelTextStyle,
  onSelect,
  options,
  optionStyle,
  required,
  selected,
  spaceBottomLabel,
  spaceToTop,
}: DropdownPickerProps<T>) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const animatedRef = useAnimatedRef();

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const dropDownStyle: ViewStyle = {
    ...border(required === true && selected === undefined ? colorRose._1 : colorGray._3, sw2),
    paddingVertical: sh8,
    paddingHorizontal: sw8,
    borderRadius: sw12,
  };

  const optionContainerStyle: ViewStyle = {
    ...alignItemsStart,
    backgroundColor: dropBackgroundColor === undefined ? colorJet._1 : dropBackgroundColor,
    maxHeight: sh100,
    borderRadius: sw12,
    paddingVertical: sh8,
  };

  const measurement = measure(animatedRef);

  const animationEntering = FadeInDown.duration(600)
    .springify(measurement?.y)
    .reduceMotion(ReduceMotion.System)
    .damping(10)
    .withInitialValues({ transform: [{ translateY: measurement === null ? -sh40 / 2 : measurement.y }] });

  return (
    <Fragment>
      <View style={{ marginTop: spaceToTop !== undefined ? spaceToTop : sh8 }}>
        {label === undefined ? null : (
          <View style={{ marginBottom: spaceBottomLabel === undefined ? sw4 : spaceBottomLabel }}>
            <Text suppressHighlighting={true} style={{ ...fs12SemiBoldJett3, paddingLeft: sw8, ...labelTextStyle }}>
              {label}
            </Text>
          </View>
        )}

        <TouchableOpacity onPress={toggleOptions} style={dropDownStyle}>
          <View style={{ ...flexRowSbSb, ...centerVertical }}>
            <Text style={fs12BoldBlack2}>{selected === undefined ? "Select an option" : (selected.value as string)}</Text>

            <Icon name={showOptions === true ? "arrow-down-circle" : "arrow-up-circle"} size={sw18} color={colorGray._2} />
          </View>
        </TouchableOpacity>
        <CustomSpacer space={sh4} />
        {showOptions === false ? null : (
          <Animated.View style={optionContainerStyle} entering={animationEntering} ref={animatedRef}>
            <ScrollView style={fullWidth}>
              {options.map((option, index) => {
                const handleSelect = () => {
                  onSelect(option);
                  setShowOptions(false);
                };
                return (
                  <Fragment key={index}>
                    <TouchableOpacity onPress={handleSelect}>
                      <View key={index} style={{ paddingVertical: sh8, paddingLeft: sw8, ...optionStyle }}>
                        <Text style={fs12BoldWhite1}>{option.value as string}</Text>
                      </View>
                    </TouchableOpacity>
                  </Fragment>
                );
              })}
            </ScrollView>
          </Animated.View>
        )}
      </View>
    </Fragment>
  );
};
