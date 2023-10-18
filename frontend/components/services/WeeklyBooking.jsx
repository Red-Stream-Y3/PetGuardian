import { Switch, Text, View } from "react-native";
import ThemeTextInput from "../common/ThemeTextInput";
import { FontAwesome5 } from "@expo/vector-icons";
import ThemeWeekDaySelector from "../common/ThemeWeekDaySelector";

const WeeklyBooking = ({
    styles,
    setDatePicker,
    input,
    setInput,
    allDay,
    setAllDay,
    theme,
}) => {
    const setDays = (daylist) => {
        setInput({ ...input, days: daylist });
    };

    return (
        <View
            style={{
                width: '100%',
                paddingHorizontal: 20,
            }}>
            <Text style={styles.textH1}>{"Days of the week"}</Text>
            <ThemeWeekDaySelector days={input.days} setDays={setDays} />

            <Text style={styles.textH1}>{'Time'}</Text>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <ThemeTextInput
                    title="From"
                    onPressIcon={() => {
                        setDatePicker({
                            show: true,
                            mode: 'time',
                            inputCallback: (date) => {
                                setInput({ ...input, startDateTime: date });
                            },
                            date: input.startDateTime,
                        });
                    }}
                    value={allDay ? '12:00:00 AM' : input.startDateTime.toLocaleTimeString()}
                    width={'45%'}
                    editable={false}
                    disabled={allDay}
                    icon={<FontAwesome5 name="clock" size={24} color={allDay ? '#888' : theme.colors.icon} />}
                />
                <Text style={styles.textBody}>{' _ '}</Text>
                <ThemeTextInput
                    title="To"
                    width={'45%'}
                    editable={false}
                    disabled={allDay}
                    onPressIcon={() => {
                        setDatePicker({
                            show: true,
                            mode: 'time',
                            inputCallback: (date) => {
                                setInput({ ...input, endDateTime: date });
                            },
                            date: input.endDateTime,
                        });
                    }}
                    value={allDay ? '11:59:59 PM' : input.endDateTime.toLocaleTimeString()}
                    icon={<FontAwesome5 name="clock" size={24} color={allDay ? '#888' : theme.colors.icon} />}
                />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.textBody}>{'All Day'}</Text>
                <Switch
                    value={allDay}
                    onChange={() => {
                        setAllDay(!allDay);
                    }}
                />
            </View>

            <Text style={styles.textH1}>{'Notes'}</Text>
            <ThemeTextInput
                placeholder={'Special notes...'}
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

export default WeeklyBooking;
