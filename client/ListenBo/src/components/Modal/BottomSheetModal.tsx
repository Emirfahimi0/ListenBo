import { BottomSheetModal, BottomSheetBackdrop, BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import React, { FunctionComponent, RefObject, useCallback, useMemo } from "react";
import { Platform, TouchableOpacity, View, ViewStyle } from "react-native";
import { colorGray, colorTransparent, colorWhite, flexChild, flexRow, justifyContentStart, sw16, sw24, sw40, sw8 } from "../../styles";
import { Icon } from "../Icons";

interface IBottomSheetModalComponentProps {
  bottomSheetModalRef: RefObject<TBottomModalSheetProps>;
  children?: JSX.Element;
  hideModal: () => void;
}

export const BottomSheetModalComponent: FunctionComponent<IBottomSheetModalComponentProps> = ({
  bottomSheetModalRef,
  children,
  hideModal,
}: IBottomSheetModalComponentProps) => {
  const snapPoints = useMemo(() => {
    if (Platform.OS === "ios") {
      return ["93%"];
    } else {
      return ["60%"];
    }
  }, []);

  const renderBackDrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.3} pressBehavior="none" />
    ),
    [],
  );

  return (
    <BottomSheetModal
      backgroundStyle={backgroundStyle}
      snapPoints={snapPoints}
      ref={bottomSheetModalRef}
      backdropComponent={renderBackDrop}
      handleComponent={() => {
        return <View />;
      }}
      enablePanDownToClose={false}>
      <View style={modalStyle}>
        <View style={{ ...flexRow, ...justifyContentStart }}>
          <TouchableOpacity style={arrowStyle} onPress={hideModal}>
            <Icon color={colorGray._1} name="arrow-back-circle" size={sw24} />
          </TouchableOpacity>
        </View>
        {children === undefined ? null : children}
      </View>
    </BottomSheetModal>
  );
};

const backgroundStyle: ViewStyle = {
  borderRadius: 0,
  backgroundColor: colorTransparent,
};

const modalStyle: ViewStyle = {
  borderTopLeftRadius: sw40,
  borderTopRightRadius: sw40,
  backgroundColor: colorWhite._1,
  ...flexChild,
};

const arrowStyle: ViewStyle = {
  padding: sw16,
  borderTopRightRadius: sw8,
  borderBottomLeftRadius: sw8,
};
