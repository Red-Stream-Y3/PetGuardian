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

const HomeScreen = () => {
  const { theme } = getThemeContext();
  const { user, selectedTab, setSelectedTab } = getAppContext();
  const [scroll, setScroll] = useState(0);
  const heroScroll = useRef(null);

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
  });

  const WIDTH = Dimensions.get('window').width * 0.95;
  const HEIGHT = Dimensions.get('window').height * 0.3;
  const IMAGE_HEIGHT = Dimensions.get('window').height * 0.2;

  const [images, setImages] = useState([]);

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
            scrollEnabled={false}
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

        <ImagePicker images={images} setImages={setImages} />

        <ScrollView
          style={{ width: '100%' }}
          contentContainerStyle={{ alignItems: 'center' }}
        >
          <ThemeCard>
            <ThemeButton title={'Find Service Providers'} />
            <ThemeButton title={'Create a Play Date'} />
            <ThemeButton title={'Adopt a Pet'} />
            <ThemeButton title={'Find a Lost Pet'} />
          </ThemeCard>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
