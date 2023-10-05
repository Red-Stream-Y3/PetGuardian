import { StyleSheet, Text, TextInput, View } from "react-native";
import getThemeContext from "../../context/ThemeContext";
import ThemebackButton from "../common/ThemeBackButton";
import { useState } from "react";
import ThemeChipList from "../common/ThemeChipList";
import RNDateTimePicker, { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { getAppContext } from "../../context/AppContext";
import ThemeTextInput from "../common/ThemeTextInput";
import { Entypo } from "@expo/vector-icons";

const BOOKING_TYPES = ['ONE_TIME', 'DAILY', 'WEEKLY'];

const ServiceBooking = ({ navigation, route }) => {
    const { theme } = getThemeContext();
    const { tabColor } = getAppContext();
    const { service } = route.params;
    const [ bookingType, setBookingType ] = useState(BOOKING_TYPES[0]);

    //input data
    const [ input, setInput ] = useState({
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

            <View style={{ marginVertical:5 }}>
                <ThemeChipList data={chipList} />
            </View>

            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    width: "100%",
                }}>

                <View style={{
                    width: "100%",
                    paddingHorizontal: 20,
                }}>
                    <Text style={styles.textH1}>{"Date"}</Text>
                    <ThemeTextInput 
                        title="From" 
                        value={input.startDate.toLocaleDateString()}
                        icon={<Entypo
                            name="calendar"
                            size={24}
                            color={theme.colors.icon}
                        />} />
                </View>

                {/* <RNDateTimePicker 
                    testID="dateTimePicker"
                    value={input.startDate}
                    mode="date"
                    is24Hour={false}
                    onChange={(e, date)=>{setInput({...input, startDate: date})}} /> */}

            </View>

        </View>
    );
};

export default ServiceBooking;