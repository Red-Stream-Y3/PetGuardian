import { ScrollView, StyleSheet, Switch, Text, TextInput, View } from "react-native";
import getThemeContext from "../../context/ThemeContext";
import ThemebackButton from "../common/ThemeBackButton";
import { useState } from "react";
import ThemeChipList from "../common/ThemeChipList";
import RNDateTimePicker, {
    DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { getAppContext } from "../../context/AppContext";
import ThemeTextInput from "../common/ThemeTextInput";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import ThemeButton from "../common/ThemeButton";
import { Ionicons } from '@expo/vector-icons';

const BOOKING_TYPES = ["ONE_TIME", "DAILY", "WEEKLY"];

const ServiceBooking = ({ navigation, route }) => {
    const { theme } = getThemeContext();
    const { tabColor } = getAppContext();
    const { service } = route.params;
    const [bookingType, setBookingType] = useState(BOOKING_TYPES[0]);

    //input data
    const [input, setInput] = useState({
        startDate: new Date(Date.now()),
        endDate: new Date(Date.now()),
        startTime: new Date(Date.now()),
        endTime: new Date(Date.now()),
        pets: [],
        paymentMethod: null,
        notes: "",
    });

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center",
        },
        textTitle: {
            color: theme.colors.text,
            fontSize: 20,
            fontWeight: "bold",
        },
        textH1: {
            color: theme.colors.text,
            fontSize: 18,
            fontWeight: "bold",
        },
        textBody: {
            color: theme.colors.text,
            fontSize: 14,
            fontWeight: "normal",
        },
    });

    const chipList = [
        {
            text: "One Time",
            onClick: () => setBookingType(BOOKING_TYPES[0]),
        },
        {
            text: "Daily",
            onClick: () => setBookingType(BOOKING_TYPES[1]),
        },
        {
            text: "Weekly",
            onClick: () => setBookingType(BOOKING_TYPES[2]),
        },
    ];

    return (
        <View
            style={{
                ...styles.container,
                backgroundColor: theme.colors.background,
            }}>
            <ThemebackButton navigation={navigation} />

            <Text style={styles.textTitle}>
                {"Hire "}
                {service?.firstName}
            </Text>

            <View style={{ marginVertical: 5 }}>
                <ThemeChipList data={chipList} />
            </View>

            <ScrollView
                style={{
                    flex: 1,
                    width: "100%",
                }}
                contentContainerStyle={{
                    alignItems: "center",
                }}>
                <View
                    style={{
                        width: "100%",
                        paddingHorizontal: 20,
                    }}>
                    <Text style={styles.textH1}>{"Date"}</Text>
                    <ThemeTextInput
                        title="From"
                        value={input.startDate.toLocaleDateString()}
                        icon={
                            <Entypo
                                name="calendar"
                                size={24}
                                color={theme.colors.icon}
                            />
                        }
                    />
                    <ThemeTextInput
                        title="To"
                        value={input.endDate.toLocaleDateString()}
                        icon={
                            <Entypo
                                name="calendar"
                                size={24}
                                color={theme.colors.icon}
                            />
                        }
                    />

                    <View
                        style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={styles.textBody}>{"One Day"}</Text>
                        <Switch value={false} onChange={() => {}} />
                    </View>

                    <Text style={styles.textH1}>{"Time"}</Text>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}>
                        <ThemeTextInput
                            title="From"
                            value={input.startTime.toLocaleTimeString()}
                            width={"45%"}
                            icon={
                                <FontAwesome5
                                    name="clock"
                                    size={24}
                                    color={theme.colors.icon}
                                />
                            }
                        />
                        <Text style={styles.textBody}>{" _ "}</Text>
                        <ThemeTextInput
                            title="To"
                            width={"45%"}
                            value={input.endTime.toLocaleTimeString()}
                            icon={
                                <FontAwesome5
                                    name="clock"
                                    size={24}
                                    color={theme.colors.icon}
                                />
                            }
                        />
                    </View>
                    <View
                        style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={styles.textBody}>{"All Day"}</Text>
                        <Switch value={false} onChange={() => {}} />
                    </View>

                    <Text style={styles.textH1}>{"Pets"}</Text>

                    <Text style={styles.textH1}>{"Notes"}</Text>
                    <ThemeTextInput
                        placeholder={"Special notes..."}
                        value={input.notes}
                        multiline={true}
                        numOfLines={5}
                        maxLength={200}
                        onChange={(e) => {
                            setInput({ ...input, notes: e.target.value });
                        }}
                    />
                </View>

                <ThemeButton title={"Hire"} textSize={16}>
                    <Ionicons
                        name="add-circle-outline"
                        size={24}
                        color={theme.colors.primaryIcon}
                    />
                </ThemeButton>

                {/* <RNDateTimePicker 
                    testID="dateTimePicker"
                    value={input.startDate}
                    mode="date"
                    is24Hour={false}
                    onChange={(e, date)=>{setInput({...input, startDate: date})}} /> */}
            </ScrollView>
        </View>
    );
};

export default ServiceBooking;
