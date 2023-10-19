import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Entypo } from '@expo/vector-icons';
import getThemeContext from '../../../context/ThemeContext';

import ThemeTextInput from '../../common/ThemeTextInput';

const LostDetails = () => {
  const { theme } = getThemeContext();
  const [specialNotes, setSpecialNotes] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [datePicker, setDatePicker] = useState({
    show: false,
    mode: 'date',
    date: new Date(Date.now()),
    inputCallback: () => {}
  });

  const [input, setInput] = useState({
    startDate: new Date(Date.now()),
    notes: ''
  });

  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            width: '100%',
            paddingHorizontal: 20
          }}
        >
          <Text
            style={{
              color: theme.colors.text,
              ...styles.textH1
            }}
          >
            {'Details'}
          </Text>
          <ThemeTextInput
            editable={false}
            onPressIcon={() => {
              setDatePicker({
                show: true,
                mode: 'date',
                inputCallback: (date) => {
                  setInput({ ...input, startDate: date });
                }
              });
            }}
            value={input.startDate.toLocaleDateString()}
            icon={
              <Entypo name="calendar" size={24} color={theme.colors.icon} />
            }
          />

          <ThemeTextInput
            placeholder={'Special notes...'}
            value={input.notes}
            multiline={true}
            numOfLines={3}
            maxLength={200}
            onChange={(e) => {
              setInput({ ...input, notes: e.target.value });
            }}
          />

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
      </View>
    </>
  );
};

const styles = StyleSheet.create({});

export default LostDetails;
