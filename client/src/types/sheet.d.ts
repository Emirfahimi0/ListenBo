declare type TBottomModalSheetProps = import("@gorhom/bottom-sheet/lib/typescript/types").BottomSheetModalMethods;

declare type CurrentContentModal = "RecoverEmail" | "OTPEvent";

interface IModalRef {
  showModal: () => void;
  hideModal: () => void;
}
