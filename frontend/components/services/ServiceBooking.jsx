import { ScrollView, StyleSheet, Text, View } from "react-native";
import getThemeContext from "../../context/ThemeContext";
import ThemebackButton from "../common/ThemeBackButton";
import { useState } from "react";
import ThemeChipList from "../common/ThemeChipList";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { getAppContext } from "../../context/AppContext";
import ThemeButton from "../common/ThemeButton";
import { Ionicons } from "@expo/vector-icons";
import OneTimeBooking from "./OneTimeBooking";
import Animated, {
    FadeInDown,
    FadeOutDown,
    SlideInLeft,
    SlideInRight,
    SlideOutLeft,
    SlideOutRight,
} from "react-native-reanimated";
import DailyBooking from "./DailyBooking";
import WeeklyBooking from "./WeeklyBooking";

const BOOKING_TYPES = ["ONE_TIME", "DAILY", "WEEKLY"];

const ServiceBooking = ({ navigation, route }) => {
    const { theme } = getThemeContext();
    const { tabColor } = getAppContext();
    const { service } = route.params;
    const [bookingType, setBookingType] = useState(BOOKING_TYPES[0]);
    const [prevType, setPrevType] = useState(BOOKING_TYPES[0]); //for animation [0,1,2]
    const [allDay, setAllDay] = useState(false);
    const [oneDay, setOneDay] = useState(false);
    const [datePicker, setDatePicker] = useState({
        show: false,
        mode: "date",
        date: new Date(Date.now()),
        inputCallback: () => {},
    });

    //input data
    const [input, setInput] = useState({
        startDate: new Date(Date.now()),
        endDate: new Date(Date.now()),
        startTime: new Date(Date.now()),
        endTime: new Date(Date.now()),
        pets: [],
        paymentMethod: null,
        notes: "",
        days: new Array(7).fill(false),
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

    const chipOnPress = (index) => {
        setPrevType(bookingType);
        setBookingType(BOOKING_TYPES[index]);
    };

    const chipList = [
        {
            text: "One Time",
            onClick: () => chipOnPress(0),
        },
        {
            text: "Daily",
            onClick: () => chipOnPress(1),
        },
        {
            text: "Weekly",
            onClick: () => chipOnPress(2),
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
                {bookingType === BOOKING_TYPES[0] && (
                    <Animated.View
                        entering={SlideInLeft}
                        exiting={SlideOutLeft}>
                        <OneTimeBooking
                            styles={styles}
                            setDatePicker={setDatePicker}
                            input={input}
                            setInput={setInput}
                            allDay={allDay}
                            setAllDay={setAllDay}
                            theme={theme}
                        />
                    </Animated.View>
                )}

                {bookingType === BOOKING_TYPES[1] && (
                    <Animated.View
                        entering={prevType===BOOKING_TYPES[2] ? SlideInLeft : SlideInRight}
                        exiting={prevType===BOOKING_TYPES[0] ? SlideOutLeft : SlideOutRight}>
                        <DailyBooking
                            styles={styles}
                            setDatePicker={setDatePicker}
                            input={input}
                            setInput={setInput}
                            oneDay={oneDay}
                            setOneDay={setOneDay}
                            allDay={allDay}
                            setAllDay={setAllDay}
                            theme={theme}
                        />
                    </Animated.View>
                )}

                {bookingType === BOOKING_TYPES[2] && (
                    <Animated.View
                        entering={SlideInRight}
                        exiting={SlideOutRight}>
                        <WeeklyBooking
                            styles={styles}
                            setDatePicker={setDatePicker}
                            input={input}
                            setInput={setInput}
                            allDay={allDay}
                            setAllDay={setAllDay}
                            theme={theme}
                        />
                    </Animated.View>
                )}
            </ScrollView>

            <Animated.View
                entering={FadeInDown}
                exiting={FadeOutDown}
                style={{marginBottom:10}}>
                <ThemeButton title={"Hire"} textSize={16}>
                    <Ionicons
                        name="add-circle-outline"
                        size={24}
                        color={theme.colors.primaryIcon}
                    />
                </ThemeButton>
            </Animated.View>

            <DateTimePickerModal
                isVisible={datePicker.show}
                mode={datePicker.mode}
                themeVariant={theme.mode}
                onConfirm={(date) => {
                    datePicker.inputCallback(date);
                    setDatePicker({ ...datePicker, show: false });
                }}
                date={datePicker.date}
                onCancel={() => setDatePicker({ ...datePicker, show: false })}
            />
        </View>
    );
};

export default ServiceBooking;
