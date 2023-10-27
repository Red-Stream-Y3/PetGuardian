import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Switch,
  Dimensions,
  FlatList,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Image,
  Pressable,
  ImageBackground,
  BackHandler,
} from 'react-native';
import {
  FloatingMenuButton,
  ImageItemCard,
  ImagePicker,
  ThemeButton,
  ThemeCard,
} from '../../components';
import getThemeContext from '../../context/ThemeContext';
import { MaterialIcons } from '@expo/vector-icons';
import { getAppContext } from '../../context/AppContext';
import { useNavigationState } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const HomeScreen = ({ navigation }) => {
  const { theme } = getThemeContext();
  const { user, selectedTab, setSelectedTab, notifyUser } = getAppContext();
  const [scroll, setScroll] = useState(0);
  const heroScroll = useRef(null);
  const navigationState = useNavigationState((state) => state.index);

  const WIDTH = Dimensions.get('window').width * 0.95;
  const HEIGHT = Dimensions.get('window').height * 0.3;
  const IMAGE_HEIGHT = Dimensions.get('window').height * 0.2;
  const BNT_ICON_NAME = 'arrow-forward';

  //set selected tab to 2 when pressing back button
  useEffect(() => {
    if (selectedTab !== 2 && navigationState === 0) {
      setSelectedTab(2);
    }
  }, [navigationState]);

  useEffect(() => {
    if (selectedTab !== 2) {
      setSelectedTab(2);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scroll === 3) {
        setScroll(0);
      } else setScroll(scroll + 1);
      heroScroll.current.scrollTo({
        x: scroll * Dimensions.get('window').width,
        y: 0,
        animated: true,
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [scroll]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    innerContainer: {
      flex: 1,
      marginTop: StatusBar.currentHeight,
    },
    titleContainer: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingHorizontal: '5%',
    },
    titleText: {
      color: theme.colors.text,
      fontWeight: 'bold',
      fontSize: 18,
      marginTop: 10,
    },
    scrollContentContainer: {},
    scrollStyle: {
      height: 250,
    },
    subtitle: {
      color: theme.colors.text,
      fontSize: 16,
      fontWeight: 'bold',
    },
    text: {
      color: theme.colors.text,
      fontSize: 14,
    },
    pressableStyle: {
      borderRadius: 10,
      height: HEIGHT / 2,
      width: HEIGHT / 2,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    pressableContainer: {
      overflow: 'hidden',
      borderRadius: 10,
      margin: 5,
      backgroundColor: theme.colors.surface,
      elevation: 3,
    },
    ripple: {
      color: theme.colors.ripple,
    },
    boldCenteredText: {
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 14,
    },
    flexRowWrap: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
        hidden={false}
      />
      <View style={styles.innerContainer}>
        <FloatingMenuButton />
        <View style={styles.titleContainer}>
          <Image
            source={require('../../assets/icon.png')}
            height={1}
            width={1}
            style={{ width: 50, height: 50, borderRadius: 25 }}
          />
          <Text style={styles.titleText}>{`Welcome! ${user.username}`}</Text>
        </View>

        <View>
          <ScrollView
            ref={heroScroll}
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            style={styles.scrollStyle}
            contentContainerStyle={styles.scrollContentContainer}
          >
            <ImageItemCard
              uri={
                'https://static.seekingalpha.com/cdn/s3/uploads/getty_images/1345672917/image_1345672917.jpg?io=getty-c-w750'
              }
              width={WIDTH}
              height={HEIGHT}
              imageHeight={IMAGE_HEIGHT}
              title={'Looking for a pet sitter?'}
              subtitle={'Find various pet service providers in your area!'}
              sideTag={
                <MaterialIcons
                  name="pets"
                  size={18}
                  color={theme.colors.text}
                />
              }
            />
            <ImageItemCard
              uri={
                'https://img.freepik.com/premium-photo/2-dogs-lying-dry-leaves_362549-1.jpg'
              }
              width={WIDTH}
              height={HEIGHT}
              imageHeight={IMAGE_HEIGHT}
              title={'Find friends for your pet!'}
              subtitle={'Make a date and find friends to play with!'}
              sideTag={
                <MaterialIcons
                  name="pets"
                  size={18}
                  color={theme.colors.text}
                />
              }
            />
            <ImageItemCard
              uri={
                'https://media.istockphoto.com/id/837572972/photo/lost-and-homeless-abandoned-dog.jpg?s=612x612&w=0&k=20&c=eN1O0_oSgK1K15LEofqxQJAVDJPNne4QsiaxKg3RIOI='
              }
              width={WIDTH}
              height={HEIGHT}
              imageHeight={IMAGE_HEIGHT}
              title={'Lookin for a home!'}
              subtitle={'Find the perfect new friend for you!'}
              sideTag={
                <MaterialIcons
                  name="pets"
                  size={18}
                  color={theme.colors.text}
                />
              }
            />
            <ImageItemCard
              uri={
                'https://media.istockphoto.com/id/518012153/photo/dog-on-the-railway-platform.jpg?s=612x612&w=0&k=20&c=YPZVV2vtsyeA8agttpfro6Z7dQfmI9pJ1wq2vysvzVs='
              }
              width={WIDTH}
              height={HEIGHT}
              imageHeight={IMAGE_HEIGHT}
              title={'Find your dog!'}
              subtitle={
                'Post a picture of your dog and someone will help find it!'
              }
              sideTag={
                <MaterialIcons
                  name="pets"
                  size={18}
                  color={theme.colors.text}
                />
              }
            />
          </ScrollView>
        </View>

        <ScrollView
          style={{ width: '100%' }}
          contentContainerStyle={{ alignItems: 'center' }}
        >
          <ThemeCard>
            <Text style={styles.subtitle}>What would you like to do?</Text>
            <View style={styles.flexRowWrap}>
              <ImageBackground
                src="https://i.pinimg.com/originals/23/e7/6b/23e76b9437ea6d9ed105dce1bc4d061c.jpg"
                style={styles.pressableContainer}
              >
                <Pressable
                  style={styles.pressableStyle}
                  android_ripple={styles.ripple}
                  onPress={() => setSelectedTab(0)}
                >
                  <Text style={styles.boldCenteredText}>
                    Find Service Providers
                  </Text>
                  <MaterialIcons
                    name={BNT_ICON_NAME}
                    size={18}
                    color={theme.colors.text}
                  />
                </Pressable>
              </ImageBackground>

              <ImageBackground
                src="https://png.pngtree.com/thumb_back/fh260/background/20210420/pngtree-simple-cute-pet-dog-background-image_645354.jpg"
                style={styles.pressableContainer}
              >
                <Pressable
                  style={styles.pressableStyle}
                  android_ripple={styles.ripple}
                  onPress={() => setSelectedTab(1)}
                >
                  <Text style={styles.boldCenteredText}>
                    Check Lost and Found Pets
                  </Text>
                  <MaterialIcons
                    name={BNT_ICON_NAME}
                    size={18}
                    color={theme.colors.text}
                  />
                </Pressable>
              </ImageBackground>
              <ImageBackground
                src="https://img.freepik.com/free-vector/dog-background-vector-with-cute-pets-illustration_53876-127697.jpg"
                style={styles.pressableContainer}
              >
                <Pressable
                  style={styles.pressableStyle}
                  android_ripple={styles.ripple}
                  onPress={() => setSelectedTab(3)}
                >
                  <Text style={styles.boldCenteredText}>
                    Find Pets to Adopt
                  </Text>
                  <MaterialIcons
                    name={BNT_ICON_NAME}
                    size={18}
                    color={theme.colors.text}
                  />
                </Pressable>
              </ImageBackground>
              <ImageBackground
                src="https://image.slidesdocs.com/responsive-images/background/cute-animal-colorful-nature-animal-decoration-cartoon-animals-powerpoint-background_0e8dfc2564__960_540.jpg"
                style={styles.pressableContainer}
              >
                <Pressable
                  style={styles.pressableStyle}
                  android_ripple={styles.ripple}
                  onPress={() => setSelectedTab(4)}
                >
                  <Text style={styles.boldCenteredText}>
                    Arrange Play Dates
                  </Text>
                  <MaterialIcons
                    name={BNT_ICON_NAME}
                    size={18}
                    color={theme.colors.text}
                  />
                </Pressable>
              </ImageBackground>
            </View>
          </ThemeCard>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
