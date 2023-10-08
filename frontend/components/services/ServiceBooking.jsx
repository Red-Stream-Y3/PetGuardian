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
import axios from "axios";

const BOOKING_TYPES = ["ONE_TIME", "DAILY", "WEEKLY"];
//TODO: remove temp user
const USER = {
    _id: "6519178b1a22eacde138ed61",
};

const ServiceBooking = ({ navigation, route }) => {
    const { theme } = getThemeContext();
    const { service } = route.params;
    const { SERVER_URL } = getAppContext();
    const [bookingType, setBookingType] = useState(BOOKING_TYPES[0]);
    const [prevType, setPrevType] = useState(BOOKING_TYPES[0]); //for animation [0,1,2]
    const [allDay, setAllDay] = useState(false);
    const [continuous, setContinuous] = useState(false); //for daily booking [0,1
    const [oneDay, setOneDay] = useState(false);
    const [datePicker, setDatePicker] = useState({
        show: false,
        mode: "date",
        date: new Date(Date.now()),
        inputCallback: () => {},
    });

    //input data
    const [input, setInput] = useState({
        startDateTime: new Date(Date.now()),
        endDateTime: new Date(Date.now()),
        pets: [],
        paymentMethod: "credit",
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

    const handleHirePress = async () => {
        //calculate fees
        const fee = service.services.fees.find(
            (fee) => fee.tag === bookingType
        ).price;
        const totalFee = calculateFees(
            input,
            bookingType,
            allDay,
            fee,
            continuous,
            oneDay
        );

        const reqData = {
            user: USER._id,
            serviceProvider: service._id,
            involvedPets: [], //TODO: input.pets.map((pet) => pet._id),
            startDate: input.startDateTime.toLocaleDateString(),
            endDate: oneDay
                ? "continuous"
                : input.endDateTime.toLocaleDateString(),
            startTime: allDay
                ? "12:00:00 AM"
                : input.startDateTime.toLocaleTimeString(),
            endTime: allDay
                ? "11:59:59 PM"
                : input.endDateTime.toLocaleTimeString(),
            daily: bookingType === BOOKING_TYPES[1],
            weekly: bookingType === BOOKING_TYPES[2],
            days: input.days,
            oneDay: oneDay,
            continuous: continuous,
            totalFee: totalFee,
            notes: input.notes,
            paymentMethod: input.paymentMethod,
        };
        
        //const response = await axios.post(`${SERVER_URL}/api/v1/hire`, reqData);
    };

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
                            oneDay={oneDay}
                            setOneDay={setOneDay}
                            allDay={allDay}
                            setAllDay={setAllDay}
                            theme={theme}
                        />
                    </Animated.View>
                )}

                {bookingType === BOOKING_TYPES[1] && (
                    <Animated.View
                        entering={
                            prevType === BOOKING_TYPES[2]
                                ? SlideInLeft
                                : SlideInRight
                        }
                        exiting={
                            prevType === BOOKING_TYPES[0]
                                ? SlideOutLeft
                                : SlideOutRight
                        }>
                        <DailyBooking
                            styles={styles}
                            setDatePicker={setDatePicker}
                            input={input}
                            setInput={setInput}
                            oneDay={continuous}
                            setOneDay={setContinuous}
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
                style={{ marginBottom: 10 }}>
                <ThemeButton
                    title={"Hire"}
                    textSize={16}
                    onPress={handleHirePress}>
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

const calculateFees = (input, bookingType, allDay, fee, continuous, oneDay) => {
    let totalFee;
    let oneDayTime = new Date(
        input.startDateTime.toISOString().split("T")[0] +
            "T" +
            input.endDateTime.toISOString().split("T")[1]
    );

    let sameDayTimeDifference = (oneDayTime - input.startDateTime) / 3600000;
    let timeRangeDateDifference =
        Math.floor(
            (new Date(input.endDateTime.toISOString().split("T")[0]) -
                new Date(input.startDateTime.toISOString().split("T")[0])) /
                86400000
        ) + 1;

    if (bookingType === BOOKING_TYPES[2]) {
        let numDays = input.days.filter((day) => day).length;
        if (allDay) {
            totalFee = numDays * 24 * fee;
        } else {
            totalFee =
                numDays * ((oneDayTime - input.startDateTime) / 3600000) * fee;
        }
    } else if (bookingType === BOOKING_TYPES[1]) {
        if (allDay) {
            if (continuous) {
                totalFee = fee * 24;
            } else {
                totalFee = timeRangeDateDifference * 24 * fee;
            }
        } else {
            if (continuous) {
                totalFee = fee * sameDayTimeDifference;
            } else {
                totalFee =
                    timeRangeDateDifference * sameDayTimeDifference * fee;
            }
        }
    } else {
        if (allDay) {
            if (oneDay) {
                totalFee = fee * 24;
            } else {
                totalFee = fee * 24 * timeRangeDateDifference;
            }
        } else {
            if (oneDay) {
                totalFee = fee * sameDayTimeDifference;
            } else {
                totalFee =
                    fee * sameDayTimeDifference * timeRangeDateDifference;
            }
        }
    }

    return totalFee;
};
