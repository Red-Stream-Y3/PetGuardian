import React from "react";
import { StyleSheet, View, Modal, Pressable, Dimensions } from "react-native";

const ThemeOverlay = ({ visible, children, onPressBg, transparent }) => {
    const styles = StyleSheet.create({
        overlay: {
            position: "absolute",
            width: "100%",
            height: "100%",
            flex: 1,
            zIndex: 5,
            backgroundColor: !transparent ? "rgba(0, 0, 0, 0.5)" : null,
            justifyContent: "center",
            alignItems: "center",
        },
        itemContainer: {
            position: "absolute",
            alignSelf: "center",
            top: 0,
            bottom: 0,
            zIndex: 10,
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
        },
    });

    const handleModalClose = () => {
        if (Platform.OS === "web") {
            return;
        }
        onPressBg();
    };

    return (
        <Modal
            visible={visible}
            animationType='fade'
            transparent
            onRequestClose={handleModalClose}>
            <View style={styles.itemContainer}>{children}</View>
            <Pressable style={styles.overlay} onPressOut={onPressBg} />
        </Modal>
    );
};

export default ThemeOverlay;
