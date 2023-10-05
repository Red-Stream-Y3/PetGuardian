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
    const body = (i) => (
        <ImageItemCard
            key={i}
            index={i}
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
    const noBody = (i) => (
        <ImageItemCard
            key={i}
            index={i}
            uri={"https://wallpapercave.com/wp/wp4928162.jpg"}
            title={"Example Title"}
            subtitle={"Example Subtitle"}
            sideTag={"Example sideTag"}
        />
    );

    //example with style=side
    const side = (i) => (
        <ImageItemCard
            key={i}
            index={i}
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
    const smallWidth = (i) => (
        <ImageItemCard
            key={i}
            uri={"https://wallpaperbat.com/img/609256-anime-boy-power-up-wallpaper.jpg"}
            title={"Example Title"}
            width={"45%"}
            subtitle={"Example Subtitle"}
            sideTag={"sideTag"}
            borderRadius={15}
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
        <SafeAreaView
            style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <StatusBar
                barStyle={
                    theme.mode === "dark" ? "light-content" : "dark-content"
                }
                hidden={false}
            />
            <View style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
                <View
                    style={{
                        flexDirection: "row",
                        width: "100%",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingHorizontal: "5%",
                    }}>
                    <Text style={{ color: theme.colors.text }}>Feed</Text>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}>
                        <Text style={{ color: theme.colors.text }}>
                            Dark Mode
                        </Text>
                        <Switch
                            onValueChange={changeTheme}
                            value={themeSwitch}
                        />
                    </View>
                </View>
                <ScrollView
                    style={{ width: "100%" }}
                    contentContainerStyle={{ alignItems: "center" }}>
                    {Array(8)
                        .fill((i) => body(i),0,2)
                        .fill((i) => noBody(i),3,5)
                        .fill((i) => side(i),6,8)
                        .map((func, i) => func(i))}
                    <ScrollView
                        horizontal={true}
                        contentContainerStyle={{ alignItems: "center" }}
                        style={{ marginBottom: 10, width:Dimensions.get('screen').width }}>
                        {Array(5)
                            .fill(0)
                            .map((_, i) => smallWidth(i))}
                    </ScrollView>

                    {/* <FlatList
                        data={[1, 2, 3, 4, 5]}
                        renderItem={(item, i) => smallWidth(i)}
                        numColumns={2}
                    /> */}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;
