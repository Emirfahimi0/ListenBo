import { Fragment, FunctionComponent } from "react";
import { View, Text } from "react-native";
import { flexRowSbSb, sw2, sh12, fs14BoldBlack2, fs12BoldOrange2, flexChild, sw12 } from "../../styles";
import { CustomSpacer } from "../spacer";
import { isUndefined } from "lodash";
import Animated, { BounceInUp, LightSpeedInRight } from "react-native-reanimated";

interface ListItemsProps<T> {
  content?: (item: T) => JSX.Element;
  data: T[];
  headerContent?: JSX.Element;
  isHorizontal?: boolean;
  leftLabel: string;
  rightLabel: string;
}

export const ListItems: FunctionComponent<ListItemsProps<unknown>> = <T,>({
  data,
  content,
  leftLabel,
  rightLabel,
  isHorizontal,
}: ListItemsProps<T>) => {
  const renderContent = (item: T) => {
    return isUndefined(content) ? <View /> : content(item);
  };
  return (
    <Fragment>
      <View style={{ ...flexRowSbSb, paddingHorizontal: sw2, paddingVertical: sh12 }}>
        <Text style={fs14BoldBlack2}>{leftLabel}</Text>
        <Text style={fs12BoldOrange2}> {rightLabel}</Text>
      </View>
      {isHorizontal === true ? (
        <Animated.FlatList
          entering={LightSpeedInRight.delay(500)}
          contentContainerStyle={flexChild}
          data={data}
          horizontal={isUndefined(isHorizontal) ? undefined : isHorizontal}
          ItemSeparatorComponent={({}) => <CustomSpacer isHorizontal={isUndefined(isHorizontal) ? undefined : isHorizontal} space={sw12} />}
          renderItem={({ item, index }) => {
            return <Fragment key={index}>{renderContent(item)}</Fragment>;
          }}
        />
      ) : (
        <Fragment>
          <Animated.View entering={BounceInUp.delay(500).springify(10)}>
            {data.map((item, index) => {
              return (
                <Fragment key={index}>
                  <CustomSpacer space={sh12} />
                  {renderContent(item)}
                </Fragment>
              );
            })}
          </Animated.View>
        </Fragment>
      )}
    </Fragment>
  );
};
