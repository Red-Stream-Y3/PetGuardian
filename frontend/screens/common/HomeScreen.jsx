import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Switch, Dimensions, FlatList, StatusBar, SafeAreaView } from "react-native";
import { ImageItemCard, ThemeButton } from "../../components";
import getThemeContext from "../../context/ThemeContext";
import { AntDesign } from '@expo/vector-icons';

const HomeScreen = () => {
    const { theme, toggleTheme } = getThemeContext();
    const [themeSwitch, setThemeSwitch] = useState(false);

    useEffect(() => {
      if (theme.mode === "dark") setThemeSwitch(true);
    }, []);

    //example with a body element
    //can provide local image or uri
    //local image has precedence over uri if both are provided
    const body = (
        <ImageItemCard
            uri={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToPtWIfv5-l3Q1GRBnlJ0H4jCVK2DEz63oSIx92b7FmYpPfx0FqvG7UVj8JcyPNAAlImE&usqp=CAU"
            }
            body={
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                    <View>
                      <Text style={{ fontWeight: "bold", color:theme.colors.text }}>
                          Body Example Title
                      </Text>
                      <Text style={{ color:theme.colors.text }}>Body</Text>
                    </View>
                    <ThemeButton title="Button" onPress={()=>console.debug("Test button")} variant={'clear'}>
                      <AntDesign name="addfile" size={24} color={theme.colors.icon} />
                    </ThemeButton>
                </View>
            }
        />
    );

    //example with no body element
    const noBody = (
        <ImageItemCard
            uri={"https://wallpapercave.com/wp/wp4928162.jpg"}
            title={"Example Title"}
        />
    );

    //example with style=side
    const side = (
        <ImageItemCard
            uri={"https://cdn.wallpapersafari.com/9/81/yaqGvs.jpg"}
            body={
              <View>
                  <Text style={{ fontWeight: "bold", color:theme.colors.text }}>
                      Body Example Title
                  </Text>
                  <Text style={{ color:theme.colors.text }}>Body</Text>
                  <ThemeButton title="Button" onPress={()=>console.debug("Test button")} />
                  <ThemeButton title="Button" onPress={()=>console.debug("Test button")} variant={'outlined'} />
              </View>
          }
            style={"side"}
            onClick={()=>console.debug("Test component click")}
        />
    );

    //example with small width
    const smallWidth = (
        <ImageItemCard
            uri={"https://wallpaperbat.com/img/609256-anime-boy-power-up-wallpaper.jpg"}
            title={"Example Title"}
            width={"45%"}
        />
    );

    const changeTheme = () => {
        try {
          setThemeSwitch(!themeSwitch);
          toggleTheme();
        } catch (error) {
          console.debug(error);
        }
    };

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.background}}>
        <StatusBar barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'} hidden={false} />
        <View style={{flex: 1, marginTop:StatusBar.currentHeight }}>
            <View
                style={{
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: '5%',
                }}>
                <Text style={{ color: theme.colors.text }}>Feed</Text>
                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                    <Text style={{ color: theme.colors.text }}>Dark Mode</Text>
                    <Switch onValueChange={changeTheme} value={themeSwitch} />
                </View>
                
            </View>
            <ScrollView
                style={{ width: "100%" }}
                contentContainerStyle={{ alignItems: "center" }}>
                {Array(2).fill(body)}
                {Array(2).fill(noBody)}
                {Array(2).fill(side)}
                <ScrollView horizontal={true} style={{width:'100%', marginBottom:10}}>
                  {Array(5).fill(smallWidth)}
                </ScrollView>

                {/* <View style={{width:"100%", height:'auto', alignItems:'center'}}>
                  <FlatList
                    data={[1,2,3,4,5]}
                    renderItem={(item, i)=>(smallWidth)}
                    numColumns={2} />
                </View> */}
                
            </ScrollView>
        </View></SafeAreaView>
    );
};

export default HomeScreen;
