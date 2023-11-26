import { TextStyle } from "react-native";
import { colorBlack, colorGray, colorJet, colorRose, colorWhite } from "./color";
import { NunitoBold, NunitoRegular, NunitoSemiBold } from "../constants";
import { scaleHeight } from "../utils";
import { sh10, sh12, sh14, sh16, sh18, sh20, sh24, sh32, sh36, sh40, sh48, sh8 } from "./size";

export const fsAlignCenter: TextStyle = { textAlign: "center" };
export const fsAlignLeft: TextStyle = { textAlign: "left" };
export const fsAlignRight: TextStyle = { textAlign: "right" };

export const fsCapitalize: TextStyle = {
  textTransform: "capitalize",
};

export const fsNoLineHeight: TextStyle = {
  lineHeight: undefined,
};

export const fsTransformNone: TextStyle = {
  textTransform: "none",
};

export const fsUnderline: TextStyle = {
  textDecorationLine: "underline",
};

export const fsUppercase: TextStyle = {
  textTransform: "uppercase",
};

export const fs10BoldGray3: TextStyle = {
  color: colorGray._3,
  fontFamily: NunitoBold,
  fontSize: sh10,
  lineHeight: scaleHeight(10 * 1.6),
};

export const fs8BoldGray1: TextStyle = {
  color: colorGray._1,
  fontFamily: NunitoBold,
  fontSize: sh8,
  lineHeight: scaleHeight(10 * 1.6),
};
export const fs10BoldGray1: TextStyle = {
  color: colorGray._1,
  fontFamily: NunitoBold,
  fontSize: sh10,
  lineHeight: scaleHeight(10 * 1.6),
};

export const fs10BoldWhite1: TextStyle = {
  color: colorWhite._1,
  fontFamily: NunitoBold,
  fontSize: sh10,
  lineHeight: scaleHeight(10 * 1.6),
};

export const fs10RegBlack2: TextStyle = {
  color: colorBlack._2,
  fontFamily: NunitoRegular,
  fontSize: sh10,
  lineHeight: scaleHeight(10 * 1.6),
};

export const fs10RegRose2: TextStyle = {
  color: colorRose._2,
  fontFamily: NunitoRegular,
  fontSize: sh10,
  lineHeight: scaleHeight(10 * 1.6),
};

export const fs10RegWhite2: TextStyle = {
  color: colorWhite._2,
  fontFamily: NunitoRegular,
  fontSize: sh10,
  lineHeight: scaleHeight(10 * 1.6),
};

export const fs10RegGray3: TextStyle = {
  color: colorGray._3,
  fontFamily: NunitoRegular,
  fontSize: sh10,
  lineHeight: scaleHeight(10 * 1.6),
};

export const fs10RegGray4: TextStyle = {
  color: colorGray._2,
  fontFamily: NunitoRegular,
  fontSize: sh10,
  lineHeight: scaleHeight(10 * 1.6),
};

export const fs12BoldBlack2: TextStyle = {
  color: colorBlack._2,
  fontFamily: NunitoBold,
  fontSize: sh12,
  lineHeight: scaleHeight(12 * 1.3),
};

export const fs12BoldGray1: TextStyle = {
  color: colorJet._2,
  fontFamily: NunitoBold,
  fontSize: sh12,
  lineHeight: scaleHeight(12 * 1.3),
};

export const fs12BoldGray2: TextStyle = {
  color: colorJet._2,
  fontFamily: NunitoBold,
  fontSize: sh12,
  lineHeight: scaleHeight(12 * 1.3),
};

export const fs12BoldGray3: TextStyle = {
  color: colorGray._3,
  fontFamily: NunitoBold,
  fontSize: sh12,
  lineHeight: scaleHeight(12 * 1.3),
};

export const fs12BoldWhite1: TextStyle = {
  color: colorWhite._1,
  fontFamily: NunitoBold,
  fontSize: sh12,
  lineHeight: scaleHeight(12 * 1.3),
};

export const fs12RegBlack2: TextStyle = {
  color: colorBlack._2,
  fontFamily: NunitoRegular,
  fontSize: sh12,
  lineHeight: scaleHeight(12 * 1.3),
};

export const fs12RegGray3: TextStyle = {
  color: colorGray._3,
  fontFamily: NunitoRegular,
  fontSize: sh12,
  lineHeight: scaleHeight(12 * 1.3),
};

export const fs12RegRose2: TextStyle = {
  color: colorRose._2,
  fontFamily: NunitoRegular,
  fontSize: sh12,
  lineHeight: scaleHeight(10 * 1.6),
};

export const fs12RegJett2: TextStyle = {
  color: colorJet._1,
  fontFamily: NunitoRegular,
  fontSize: sh12,
  lineHeight: scaleHeight(10 * 1.6),
};
export const fs12RegWhite1: TextStyle = {
  color: colorWhite._1,
  fontFamily: NunitoRegular,
  fontSize: sh12,
  lineHeight: scaleHeight(12 * 1.3),
};

export const fs12SemiBoldGray3: TextStyle = {
  color: colorGray._3,
  fontFamily: NunitoSemiBold,
  fontSize: sh12,
  lineHeight: scaleHeight(12 * 1.3),
};

export const fs12SemiBoldJett3: TextStyle = {
  color: colorJet._3,
  fontFamily: NunitoSemiBold,
  fontSize: sh12,
  lineHeight: scaleHeight(12 * 1.3),
};

export const fs14BoldBlack2: TextStyle = {
  color: colorBlack._2,
  fontFamily: NunitoBold,
  fontSize: sh14,
  lineHeight: scaleHeight(14 * 1.3),
};

export const fs14BoldGray3: TextStyle = {
  color: colorGray._3,
  fontFamily: NunitoBold,
  fontSize: sh14,
  lineHeight: scaleHeight(14 * 1.3),
};

export const fs14RegBlack1: TextStyle = {
  color: colorBlack._1,
  fontFamily: NunitoRegular,
  fontSize: sh14,
  lineHeight: scaleHeight(14 * 1.3),
};

export const fs14RegBlack2: TextStyle = {
  color: colorBlack._2,
  fontFamily: NunitoRegular,
  fontSize: sh14,
  lineHeight: scaleHeight(14 * 1.3),
};

export const fs14RegGray2: TextStyle = {
  color: colorGray._2,
  fontFamily: NunitoRegular,
  fontSize: sh14,
  lineHeight: scaleHeight(14 * 1.3),
};

export const fs14RegGray1: TextStyle = {
  color: colorGray._1,
  fontFamily: NunitoRegular,
  fontSize: sh14,
  lineHeight: scaleHeight(14 * 1.3),
};

export const fs16BoldBlack1: TextStyle = {
  color: colorBlack._1,
  fontFamily: NunitoBold,
  fontSize: sh16,
  lineHeight: scaleHeight(16 * 1.48),
};

export const fs16BoldBlack2: TextStyle = {
  color: colorBlack._2,
  fontFamily: NunitoBold,
  fontSize: sh16,
  lineHeight: scaleHeight(16 * 1.48),
};

export const fs16BoldGray1: TextStyle = {
  color: colorGray._1,
  fontFamily: NunitoBold,
  fontSize: sh16,
  lineHeight: scaleHeight(16 * 1.48),
};

export const fs16BoldGray3: TextStyle = {
  color: colorGray._3,
  fontFamily: NunitoBold,
  fontSize: sh16,
  lineHeight: scaleHeight(16 * 1.48),
};

export const fs16BoldWhite1: TextStyle = {
  color: colorWhite._1,
  fontFamily: NunitoBold,
  fontSize: sh16,
  lineHeight: scaleHeight(16 * 1.48),
};

export const fs16RegBlack2: TextStyle = {
  color: colorBlack._2,
  fontFamily: NunitoRegular,
  fontSize: sh16,
  lineHeight: scaleHeight(16 * 1.48),
};

export const fs16RegGray3: TextStyle = {
  color: colorGray._3,
  fontFamily: NunitoRegular,
  fontSize: sh16,
  lineHeight: scaleHeight(16 * 1.48),
};

export const fs16RegRose3: TextStyle = {
  color: colorGray._3,
  fontFamily: NunitoRegular,
  fontSize: sh16,
  lineHeight: scaleHeight(16 * 1.48),
};

export const fs16RegRose2: TextStyle = {
  color: colorRose._2,
  fontFamily: NunitoRegular,
  fontSize: sh16,
  lineHeight: scaleHeight(16 * 1.48),
};

export const fs16RegWhite1: TextStyle = {
  color: colorWhite._1,
  fontFamily: NunitoRegular,
  fontSize: sh16,
  lineHeight: scaleHeight(16 * 1.48),
};

export const fs16SemiBoldBlack1: TextStyle = {
  color: colorBlack._1,
  fontFamily: NunitoSemiBold,
  fontSize: sh16,
  lineHeight: scaleHeight(16 * 1.48),
};

export const fs16SemiBoldGray2: TextStyle = {
  color: colorGray._2,
  fontFamily: NunitoSemiBold,
  fontSize: sh16,
  lineHeight: scaleHeight(16 * 1.48),
};

export const fs18BoldBlack2: TextStyle = {
  color: colorBlack._2,
  fontFamily: NunitoBold,
  fontSize: sh18,
  lineHeight: scaleHeight(18 * 1.35),
};

export const fs18BoldWhite2: TextStyle = {
  color: colorWhite._2,
  fontFamily: NunitoBold,
  fontSize: sh18,
  lineHeight: scaleHeight(18 * 1.35),
};
export const fs18BoldGray3: TextStyle = {
  color: colorGray._3,
  fontFamily: NunitoBold,
  fontSize: sh18,
  lineHeight: scaleHeight(18 * 1.35),
};

export const fs20BoldBlack2: TextStyle = {
  color: colorBlack._2,
  fontFamily: NunitoBold,
  fontSize: sh20,
  lineHeight: scaleHeight(20 * 1.4),
};

export const fs20BoldGray1: TextStyle = {
  color: colorGray._1,
  fontFamily: NunitoBold,
  fontSize: sh20,
  lineHeight: scaleHeight(20 * 1.4),
};

export const fs20BoldGray3: TextStyle = {
  color: colorGray._3,
  fontFamily: NunitoBold,
  fontSize: sh20,
  lineHeight: scaleHeight(20 * 1.4),
};

export const fs24BoldBlack2: TextStyle = {
  color: colorBlack._2,
  fontFamily: NunitoBold,
  fontSize: sh24,
  lineHeight: scaleHeight(24 * 1.35),
};

export const fs24BoldGray3: TextStyle = {
  color: colorGray._3,
  fontFamily: NunitoBold,
  fontSize: sh24,
  lineHeight: scaleHeight(24 * 1.35),
};

export const fs24BoldWhite1: TextStyle = {
  color: colorWhite._1,
  fontFamily: NunitoBold,
  fontSize: sh24,
  lineHeight: scaleHeight(24 * 1.35),
};

export const fs24RegGray2: TextStyle = {
  color: colorGray._2,
  fontFamily: NunitoRegular,
  fontSize: sh24,
  lineHeight: scaleHeight(24 * 1.35),
};

export const fs36BoldBlack2: TextStyle = {
  color: colorBlack._2,
  fontFamily: NunitoBold,
  fontSize: sh36,
  lineHeight: scaleHeight(36 * 1.22),
};

export const fs32BoldWhite1: TextStyle = {
  color: colorWhite._1,
  fontFamily: NunitoBold,
  fontSize: sh32,
  lineHeight: scaleHeight(36 * 1.22),
};

export const fs36BoldWhite1: TextStyle = {
  color: colorWhite._1,
  fontFamily: NunitoBold,
  fontSize: sh36,
  lineHeight: scaleHeight(36 * 1.22),
};

export const fs40BoldGray3: TextStyle = {
  color: colorGray._3,
  fontFamily: NunitoBold,
  fontSize: sh40,
  lineHeight: sh48,
};
