import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Switch } from "react-native";
import { ImageItemCard, ThemeButton } from "../../components";
import getThemeContext from "../../context/ThemeContext";

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
                <View>
                    <Text style={{ fontWeight: "bold", color:theme.colors.text }}>
                        Body Example Title
                    </Text>
                    <Text style={{ color:theme.colors.text }}>Body</Text>
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
              </View>
          }
            style={"side"}
            onClick={()=>console.debug("Test component click")}
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
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
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
            </ScrollView>
        </View>
    );
};

export default HomeScreen;
