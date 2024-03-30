import { Fragment } from "react";
import { View, Text, FlatList } from "react-native";
import { flexRowSbSb, sw2, sh12, fs14BoldBlack2, fs12BoldOrange2, flexChild, sw12 } from "../../styles";
import { CustomSpacer } from "../spacer";

interface ListItemsProps<T> {
  content: (item: T) => JSX.Element;
  data: T[];
  headerContent?: JSX.Element;
  isHorizontal?: boolean;
  leftLabel: string;
  rightLabel: string;
}

export const ListItems = <T,>({ data, content, leftLabel, rightLabel, isHorizontal }: ListItemsProps<T>) => {
  return (
    <Fragment>
      <View style={{ ...flexRowSbSb, paddingHorizontal: sw2, paddingVertical: sh12 }}>
        <Text style={fs14BoldBlack2}>{leftLabel}</Text>
        <Text style={fs12BoldOrange2}> {rightLabel}</Text>
      </View>
      {isHorizontal === true ? (
        <FlatList
          contentContainerStyle={flexChild}
          data={data}
          horizontal={isHorizontal === undefined ? true : isHorizontal}
          ItemSeparatorComponent={({}) => <CustomSpacer isHorizontal={isHorizontal === undefined ? true : isHorizontal} space={sw12} />}
          renderItem={({ item, index }) => {
            return <Fragment key={index}>{content(item)}</Fragment>;
          }}
        />
      ) : (
        <Fragment>
          {data.map((item, index) => {
            return (
              <Fragment key={index}>
                <CustomSpacer space={sh12} />
                {content(item)}
              </Fragment>
            );
          })}
        </Fragment>
      )}
    </Fragment>
  );
};
