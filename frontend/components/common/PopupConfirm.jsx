import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Modal } from 'react-native';

import getThemeContext from '../../context/ThemeContext';

const PopupConfirm = ({
  confirmationModalVisible,
  setConfirmationModalVisible,
  title,
  action,
  themeColor,
  noBorder,
  noBg,
  yesBorder,
  yesBg,
  noTextColor,
  yesTextColor,
}) => {
  const { theme } = getThemeContext();

  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: 'white',
      paddingHorizontal: 18,
      paddingVertical: 20,
      borderRadius: 10,
      width: '88%',
      borderWidth: 4,
      borderColor: themeColor,
      borderRadius: 25,
    },
    modalOption: {
      paddingHorizontal: 20,
      paddingVertical: 5.5,
      borderWidth: 2,
      borderColor: themeColor,
      alignItems: 'center',
      borderRadius: 10,
      marginVertical: 8,
    },
    modalOptionText: {
      fontSize: 17,
      fontWeight: '600',
    },
  });

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={confirmationModalVisible}
      onRequestClose={() => setConfirmationModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalOptionText}>{title}</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 25,
            }}
          >
            <TouchableOpacity
              style={[
                styles.modalOption,
                {
                  borderColor: noBorder,
                  backgroundColor: noBg,
                  color: theme.colors.text,
                },
              ]}
              onPress={() => setConfirmationModalVisible(false)}
            >
              <Text
                style={[
                  styles.modalOptionText,
                  {
                    borderColor: noBorder,
                    fontWeight: 'bold',
                    color: noTextColor,
                  },
                ]}
              >
                No
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.modalOption,
                {
                  borderColor: yesBorder,
                  backgroundColor: yesBg,
                  color: theme.colors.text,
                },
              ]}
              onPress={action}
            >
              <Text
                style={[
                  styles.modalOptionText,
                  {
                    borderColor: yesBorder,
                    fontWeight: 'bold',
                    color: yesTextColor,
                  },
                ]}
              >
                Yes
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PopupConfirm;
