import { Switch, Text, View } from "react-native";
import ThemeTextInput from "../common/ThemeTextInput";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const OneTimeBooking = ({
    styles,
    setDatePicker,
    input,
    setInput,
    allDay,
    setAllDay,
    theme,
}) => {
    return (
        <View
            style={{
                width: "100%",
                paddingHorizontal: 20,
            }}>
            <Text style={styles.textH1}>{"Date"}</Text>
            <ThemeTextInput
                title="On"
                editable={false}
                onPressIcon={() => {
                    setDatePicker({
                        show: true,
                        mode: "date",
                        inputCallback: (date) => {
                            setInput({ ...input, startDate: date });
                        },
                        date: input.startDate,
                    });
                }}
                value={input.startDate.toLocaleDateString()}
                icon={
                    <Entypo
                        name="calendar"
                        size={24}
                        color={theme.colors.icon}
                    />
                }
            />

            <Text style={styles.textH1}>{"Time"}</Text>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}>
                <ThemeTextInput
                    title="From"
                    onPressIcon={() => {
                        setDatePicker({
                            show: true,
                            mode: "time",
                            inputCallback: (date) => {
                                setInput({ ...input, startTime: date });
                            },
                            date: input.startTime,
                        });
                    }}
                    value={
                        allDay
                            ? "12:00:00 AM"
                            : input.startTime.toLocaleTimeString()
                    }
                    width={"45%"}
                    editable={false}
                    disabled={allDay}
                    icon={
                        <FontAwesome5
                            name="clock"
                            size={24}
                            color={allDay ? "#888" : theme.colors.icon}
                        />
                    }
                />
                <Text style={styles.textBody}>{" _ "}</Text>
                <ThemeTextInput
                    title="To"
                    width={"45%"}
                    editable={false}
                    disabled={allDay}
                    onPressIcon={() => {
                        setDatePicker({
                            show: true,
                            mode: "time",
                            inputCallback: (date) => {
                                setInput({ ...input, endTime: date });
                            },
                            date: input.endTime,
                        });
                    }}
                    value={
                        allDay
                            ? "11:59:59 PM"
                            : input.endTime.toLocaleTimeString()
                    }
                    icon={
                        <FontAwesome5
                            name="clock"
                            size={24}
                            color={allDay ? "#888" : theme.colors.icon}
                        />
                    }
                />
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.textBody}>{"All Day"}</Text>
                <Switch
                    value={allDay}
                    onChange={() => {
                        setAllDay(!allDay);
                    }}
                />
            </View>

            <Text style={styles.textH1}>{"Pets"}</Text>
            <View>
                <Text style={styles.textBody}>
                    {"Pet selection component here"}
                </Text>
            </View>

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
    );
};

export default OneTimeBooking;
