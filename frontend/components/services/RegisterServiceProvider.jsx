import {
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    Platform,
    ScrollView,
    Dimensions,
    ActivityIndicator,
} from "react-native";
import getThemeContext from "../../context/ThemeContext";
import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated";
import ThemeButton from "./../common/ThemeButton";
import { useState } from "react";
import ThemeTextInput from "./../common/ThemeTextInput";
import ThemeWeekDaySelector from "../common/ThemeWeekDaySelector";
import { FontAwesome5 } from "@expo/vector-icons";
import ThemeChipList from "../common/ThemeChipList";
import Toast from "react-native-toast-message";
import { createServiceProvider } from "../../services/ServiceproviderSerives";
import { getAppContext } from "../../context/AppContext";

const RegisterServiceProvider = ({ navigation, existing }) => {
    const { theme } = getThemeContext();
    const { user, storeUser, setUser } = getAppContext();
    const [showRegister, setShowRegister] = useState(false);
    const [service, setService] = useState("");
    const [serviceList, setServiceList] = useState([]);
    const [petType, setPetType] = useState("");
    const [petTypeList, setPetTypeList] = useState([]);
    const [days, setDays] = useState([
        false,
        false,
        false,
        false,
        false,
        false,
        false,
    ]);
    const [phone, setPhone] = useState("");
    const [phoneList, setPhoneList] = useState([]);
    const [city, setCity] = useState("");
    const [cityList, setCityList] = useState([]);
    const [fees, setFees] = useState([
        {
            tag: "ONE_TIME",
            price: 0,
        },
        {
            tag: "DAILY",
            price: 0,
        },
        {
            tag: "WEEKLY",
            price: 0,
        },
    ]);
    const [description, setDescription] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const DAYS_OF_WEEK = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ];

    const handleServicesChange = (text) => {
        setService(text);
    };

    const handleServiceAdd = () => {
        if (serviceList.includes(service)) return;

        if (service === "") return;

        if (service.includes(",")) {
            Toast.show({
                text1: "Please add one service at a time",
                type: "error",
            });
            return;
        }

        setServiceList([...serviceList, service]);
        setService("");
    };

    const handlePetTypesChange = (text) => {
        setPetType(text);
    };

    const handlePetTypeAdd = () => {
        if (petTypeList.includes(petType)) return;

        if (petType === "") return;

        if (petType.includes(",")) {
            Toast.show({
                text1: "Please add one pet type at a time",
                type: "error",
            });
            return;
        }

        setPetTypeList([...petTypeList, petType]);
        setPetType("");
    };

    const handlePhoneChange = (text) => {
        setPhone(text);
    };

    const handlePhoneAdd = () => {
        if (phoneList.includes(phone)) return;

        if (phone === "") return;

        if (phone.includes(",")) {
            Toast.show({
                text1: "Please add one phone number at a time",
                type: "error",
            });
            return;
        }

        setPhoneList([...phoneList, phone]);
        setPhone("");
    };

    const handleCityChange = (text) => {
        setCity(text);
    };

    const handleCityAdd = () => {
        if (cityList.includes(city)) return;

        if (city === "") return;

        if (city.includes(",")) {
            Toast.show({
                text1: "Please add one city at a time",
                type: "error",
            });
            return;
        }

        setCityList([...cityList, city]);
        setCity("");
    };

    const handleSubmitClick = async () => {
        if (serviceList.length === 0) {
            Toast.show({
                text1: "Please add at least one service",
                type: "error",
            });
            return;
        }

        if (petTypeList.length === 0) {
            Toast.show({
                text1: "Please add at least one pet type",
                type: "error",
            });
            return;
        }

        if (phoneList.length === 0) {
            Toast.show({
                text1: "Please add at least one phone number",
                type: "error",
            });
            return;
        }

        if (cityList.length === 0) {
            Toast.show({
                text1: "Please add at least one city",
                type: "error",
            });
            return;
        }

        if (fees[0].price === 0 && fees[1].price === 0 && fees[2].price === 0) {
            Toast.show({
                text1: "Please add at least one fee",
                type: "error",
            });
            return;
        }

        if (description === "") {
            Toast.show({
                text1: "Please add a description",
                type: "error",
            });
            return;
        }

        const data = {
            serviceTypes: serviceList,
            petTypes: petTypeList,
            workDays: days.map((day, index) => {
                if (day) return DAYS_OF_WEEK[index];
                return null;
            }),
            businessPhone: phoneList,
            activeCities: cityList,
            fees: fees,
            description: description,
        };

        try {
            setSubmitting(true);

            const response = await createServiceProvider(data, user.token);

            const userData = { ...user };

            if (response) {
                userData.services = response.services;
                userData.isServiceProvider = true;
                await storeUser(userData);
                setUser(userData);

                Toast.show({
                    text1: "Success",
                    text2: "Your account has been registered",
                    type: "success",
                });

                setSubmitting(false);
            }
        } catch (error) {
            Toast.show({
                text1: "Error",
                text2: "Something went wrong",
                type:
                    error.response?.data?.message || //axios error
                    error.message || //js error
                    "Unknown error occured", //unknown error
            });
            setSubmitting(false);
        }
    };

    const addIcon = (
        <FontAwesome5 name='plus' size={18} color={theme.colors.icon} />
    );

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
            alignItems: "center",
            justifyContent: "center",
        },
        title: {
            color: theme.colors.text,
            fontSize: 18,
            fontWeight: "bold",
            textAlign: "center",
        },
        subtitle: {
            color: theme.colors.text,
            fontSize: 16,
            marginTop: 10,
            fontWeight: "bold",
            textAlign: "center",
        },
        text: {
            color: theme.colors.text,
            fontSize: 14,
            textAlign: "center",
        },
        boldText: {
            color: theme.colors.text,
            fontSize: 14,
            fontWeight: "bold",
            textAlign: "center",
        },
        registerContainer: {
            padding: 20,
            justifyContent: "center",
            elevation: 5,
            backgroundColor: theme.colors.surface,
            margin: 10,
            borderRadius: 10,
            width: Dimensions.get("window").width * 0.9,
        },
        scrollContentStyle: {
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
        },
    });

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            style={styles.container}>
            <ScrollView
                keyboardShouldPersistTaps='handled'
                contentContainerStyle={styles.scrollContentStyle}>
                {!showRegister && (
                    <Animated.View
                        entering={FadeInDown}
                        exiting={FadeOutUp}
                        style={styles.registerContainer}>
                        <Text style={styles.text}>
                            Do you provide any pet services?{" "}
                        </Text>
                        <Text style={styles.text}>
                            Register here to start advertising!
                        </Text>
                        <ThemeButton
                            title='Register'
                            variant={"outlined"}
                            onPress={() => setShowRegister(!showRegister)}
                        />
                    </Animated.View>
                )}
                {showRegister && (
                    <Animated.View
                        entering={FadeInDown}
                        exiting={FadeOutUp}
                        style={styles.registerContainer}>
                        <FontAwesome5
                            name='times'
                            size={18}
                            color={theme.colors.icon}
                            style={{ alignSelf: "flex-end" }}
                            onPress={() => setShowRegister(!showRegister)}
                        />
                        {/* service types */}
                        <ThemeTextInput
                            title={"Services"}
                            placeholder='(e.g. Walking)'
                            onChange={handleServicesChange}
                            value={service}
                            icon={addIcon}
                            onPressIcon={handleServiceAdd}
                        />
                        <ThemeChipList
                            allActive={true}
                            data={serviceList.map((item) => ({
                                text: item,
                                onClick: () => {},
                                children: (
                                    <FontAwesome5
                                        name='times'
                                        size={14}
                                        color={theme.colors.icon}
                                        onPress={() => {
                                            const newServiceList = [
                                                ...serviceList,
                                            ];
                                            newServiceList.splice(
                                                serviceList.indexOf(item),
                                                1
                                            );
                                            setServiceList(newServiceList);
                                        }}
                                    />
                                ),
                            }))}
                        />
                        {/* description */}
                        <ThemeTextInput
                            multiline={true}
                            numOfLines={5}
                            title={"Description"}
                            placeholder='Describe your services'
                            onChange={(text) => setDescription(text)}
                            value={description}
                        />

                        {/* pet types */}
                        <ThemeTextInput
                            title={"Pet Types"}
                            placeholder='What types of pets do you serve?'
                            onChange={handlePetTypesChange}
                            value={petType}
                            icon={addIcon}
                            onPressIcon={handlePetTypeAdd}
                        />
                        <ThemeChipList
                            allActive={true}
                            data={petTypeList.map((item) => ({
                                text: item,
                                onClick: () => {},
                                children: (
                                    <FontAwesome5
                                        name='times'
                                        size={14}
                                        color={theme.colors.icon}
                                        onPress={() => {
                                            const newPetTypeList = [
                                                ...petTypeList,
                                            ];
                                            newPetTypeList.splice(
                                                petTypeList.indexOf(item),
                                                1
                                            );
                                            setPetTypeList(newPetTypeList);
                                        }}
                                    />
                                ),
                            }))}
                        />

                        {/* phone number */}
                        <ThemeTextInput
                            title={"Phone Number(s)"}
                            placeholder='Your phone number'
                            onChange={handlePhoneChange}
                            value={phone}
                            icon={addIcon}
                            onPressIcon={handlePhoneAdd}
                        />
                        <ThemeChipList
                            allActive={true}
                            data={phoneList.map((item) => ({
                                text: item,
                                onClick: () => {},
                                children: (
                                    <FontAwesome5
                                        name='times'
                                        size={14}
                                        color={theme.colors.icon}
                                        onPress={() => {
                                            const newPhoneList = [...phoneList];
                                            newPhoneList.splice(
                                                phoneList.indexOf(item),
                                                1
                                            );
                                            setPhoneList(newPhoneList);
                                        }}
                                    />
                                ),
                            }))}
                        />

                        {/* city active */}
                        <ThemeTextInput
                            title={"City"}
                            placeholder='Your city / town'
                            onChange={handleCityChange}
                            value={city}
                            icon={addIcon}
                            onPressIcon={handleCityAdd}
                        />
                        <ThemeChipList
                            allActive={true}
                            data={cityList.map((item) => ({
                                text: item,
                                onClick: () => {},
                                children: (
                                    <FontAwesome5
                                        name='times'
                                        size={14}
                                        color={theme.colors.icon}
                                        onPress={() => {
                                            const newCityList = [...cityList];
                                            newCityList.splice(
                                                cityList.indexOf(item),
                                                1
                                            );
                                            setCityList(newCityList);
                                        }}
                                    />
                                ),
                            }))}
                        />

                        {/* actyive days of the week */}
                        <Text style={styles.subtitle}>
                            Select the days your are active
                        </Text>
                        <ThemeWeekDaySelector days={days} setDays={setDays} />

                        {/* fees */}
                        <Text style={styles.subtitle}>{`Fees (Rs.)`}</Text>
                        {fees.map((fee, index) => (
                            <ThemeTextInput
                                key={index}
                                title={fee.tag}
                                placeholder='0'
                                keyboardType='numeric'
                                onChange={(text) => {
                                    if (text === "") return;
                                    const newFees = [...fees];
                                    newFees[index].price = parseInt(text);
                                    setFees(newFees);
                                }}
                                value={`${fee.price}`}
                            />
                        ))}

                        {/* submit */}
                        <ThemeButton
                            title={!submitting && "Confirm & Register"}
                            onPress={handleSubmitClick}>
                            {submitting && (
                                <ActivityIndicator
                                    color={theme.colors.primaryText}
                                />
                            )}
                        </ThemeButton>
                    </Animated.View>
                )}
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default RegisterServiceProvider;