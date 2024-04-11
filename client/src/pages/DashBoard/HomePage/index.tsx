import React, { FunctionComponent } from "react";
import { Image, ImageBackground, ScrollView, Text, View, ViewStyle } from "react-native";
import { CustomSpacer, CustomFlexSpacer, Icon, CustomButton, ListItems } from "../../../components";
import {
  sh18,
  sw12,
  flexRow,
  sw32,
  sh32,
  sw40,
  colorGray,
  sw2,
  sw8,
  spaceBetweenHV,
  fs12BoldGray1,
  fs16BoldBlack2,
  colorOrange,
  sw24,
  sh12,
  spaceAroundVertical,
  fs16BoldWhite1,
  fs12RegWhite2,
  sh8,
  fs12BoldOrange2,
  colorWhite,
  sw120,
  sw100,
  sh100,
  flexChild,
  fs10BoldGray1,
  sw80,
  sw16,
  fs10BoldWhite1,
  sh120,
  spaceBetweenHorizontal,
  rowCenterVertical,
  colorJet,
  sh80,
} from "../../../styles";
import { TouchableOpacity } from "react-native-gesture-handler";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IHomeProps {}

export const Home: FunctionComponent<IHomeProps> = ({}: IHomeProps) => {
  interface podcastProps {
    id: number;
    title: string;
    url: string;
    description: string;
  }
  const dummyData: podcastProps[] = [
    {
      id: 1,
      title: "927: Deep Dive | How to Quit Your Job the Right Way",
      description: "Apple Talk | 52.7 mins",
      url: "https://podsauce.com/wp-content/uploads/2021/07/modernlove-1-2048x2048.jpeg",
    },
    {
      id: 2,
      title: "875: Should I Marry My Dying Girlfriend? | FeedBack Friday",
      description: "Apple Talk | 52.7 mins",
      url: "https://99designs-blog.imgix.net/blog/wp-content/uploads/2018/01/attachment_91625055-e1515419927311.jpeg?auto=format&q=60&fit=max&w=930",
    },
    {
      id: 3,
      title: "739: Rick Ross | How to Boss Up and Build Empire",
      description: "Apple Talk | 52.7 mins",
      url: "https://blackeffect.com/wp-content/uploads/2023/09/TheBreakfastClub-LogoV3-FINAL1000x1000.jpg",
    },
    {
      id: 4,
      title: "653: Paxton Cruz | Finance Talk",
      description: "Apple Talk | 52.7 mins",
      url: "https://images.prismic.io/buzzsprout/63b8b04a-bc44-449b-9e12-b450a7922efe_CleanShot+2024-03-05+at+15.34.54%402x.png?auto=compress,format",
    },
  ];

  const premiumImageStyle: ViewStyle = {
    backgroundColor: colorOrange._1,
    borderRadius: sw12,
    paddingVertical: sh12,
    paddingHorizontal: sw8,
    ...spaceAroundVertical,
  };

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: sh80, paddingVertical: sh18, paddingHorizontal: sw12 }}
      stickyHeaderHiddenOnScroll
      snapToAlignment="center"
      snapToStart
      showsVerticalScrollIndicator={false}>
      <View style={flexChild}>
        <View style={flexRow}>
          <Image
            source={require("../../../assets/images/pp.jpg")}
            style={{ width: sw32, height: sh32, borderRadius: sw40, borderColor: colorGray._1, borderWidth: sw2 }}
            resizeMode="contain"
          />
          <CustomSpacer isHorizontal={true} space={sw8} />
          <View style={spaceBetweenHV}>
            <Text style={fs12BoldGray1}>Good Morning 👋</Text>
            <Text style={fs16BoldBlack2}>Emir Fahimi</Text>
          </View>
          <CustomFlexSpacer />
          <Icon name="md-notifications" color={colorGray._1} size={sw24} />
        </View>
        <CustomSpacer space={sh18} />
        <ImageBackground
          source={require("../../../assets/images/Premium.jpeg")}
          imageStyle={{ borderRadius: sw12 }}
          resizeMode="cover"
          style={premiumImageStyle}>
          <Text style={fs16BoldWhite1}>Enjoy all Benefits!</Text>
          <Text style={{ ...fs12RegWhite2, paddingVertical: sh8 }}>
            Enjoy listening to podcast with better audio without restrictions and without ads
          </Text>
          <CustomButton
            onPress={() => {}}
            textStyle={fs12BoldOrange2}
            text={"Get Premium"}
            buttonStyle={{ backgroundColor: colorWhite._1, borderRadius: sw12, borderWidth: 0, maxWidth: sw120 }}
          />
        </ImageBackground>

        <ListItems
          data={dummyData as podcastProps[]}
          isHorizontal={true}
          content={(item: podcastProps) => (
            <TouchableOpacity
              onPress={() => {
                console.log("wow");
              }}>
              <Image source={{ uri: item.url }} style={{ borderRadius: sw12, width: sw100, height: sh100 }} resizeMode="cover" />
            </TouchableOpacity>
          )}
          leftLabel={"Recently Played"}
          rightLabel={"See All"}
        />
        <ListItems
          data={dummyData}
          isHorizontal={false}
          content={(item: podcastProps) => (
            <View style={{ ...flexRow, maxHeight: sh120 }}>
              {/* left layout */}
              <Image
                source={{ uri: item.url }}
                style={{ borderRadius: sw12, width: sw120, height: sh120, aspectRatio: 1 }}
                resizeMode="cover"
              />
              {/* left layout */}
              {/* right layout */}
              <View style={{ ...flexChild, paddingHorizontal: sh8 }}>
                <Text style={fs16BoldBlack2} numberOfLines={2} ellipsizeMode="tail">
                  {item.title}
                </Text>
                <CustomFlexSpacer />
                <Text style={fs10BoldGray1}>{item.description}</Text>
                <CustomFlexSpacer />
                <View style={{ ...spaceBetweenHorizontal, ...rowCenterVertical }}>
                  <CustomButton
                    onPress={() => {}}
                    withDebounce
                    text="Play"
                    icon="play-circle"
                    iconSize={sw12}
                    buttonStyle={{ maxWidth: sw80, borderRadius: sw16, maxHeight: sh32, backgroundColor: colorOrange._5, borderWidth: 0 }}
                    textStyle={fs10BoldWhite1}
                  />
                  <Icon name="md-add-circle" size={sw16} color={colorJet._4} />
                  <Icon name="download" size={sw16} color={colorJet._4} />
                  <Icon name="ellipsis-vertical" size={sw16} color={colorJet._4} />
                </View>
              </View>
              {/* right layout */}
            </View>
          )}
          leftLabel={"New Updates"}
          rightLabel={"See All"}
        />
      </View>
    </ScrollView>
  );
};
