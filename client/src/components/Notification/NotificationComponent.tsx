import { Fragment, type FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { globalState } from "../../store/global";
import { Animated, Text, type TextStyle, type ViewStyle } from "react-native";
import { centerHV, fs10BoldOrange1, fs14RegGray2, sw100 } from "../../styles";
import { colorBlue } from "../../styles";
import { colorGreen } from "../../styles";

export const AppNotification: FunctionComponent = () => {
  const global = useSelector(globalState);
  const { messageNotification } = global;

  const { message, type } = messageNotification;

  const colourMsg: TextStyle = type === "error" ? fs14RegGray2 : fs10BoldOrange1;

  const containerStyle: ViewStyle = {
    width: sw100,
    backgroundColor: type === "error" ? colorBlue._2 : colorGreen._2,
    ...centerHV,
  };

  return (
    <Fragment>
      <Animated.View style={containerStyle}>
        <Text style={colourMsg}>{message}</Text>
      </Animated.View>
    </Fragment>
  );
};
