declare type TBottomModalSheetProps = import("@gorhom/bottom-sheet/lib/typescript/types").BottomSheetModalMethods;

declare type CurrentContentModal = "recoverEmail" | "OTPEvent";

interface IModalRef {
  showModal: () => void;
  hideModal: () => void;
}
