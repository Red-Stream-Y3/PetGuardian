import React, { Suspense, useState, useEffect } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  ScrollView,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ImagePicker from '../../common/ImagePicker';
import Header from '../../common/Header';
import getThemeContext from '../../../context/ThemeContext';
import { getAppContext } from '../../../context/AppContext';
import ThemeTextInput from '../../common/ThemeTextInput';
import MapLocation from '../../common/MapLocation';
import { createPost } from '../../../services/PostServices';

const FoundPost = () => {
  const { theme } = getThemeContext();
  const { user } = getAppContext();
  const [images, setImages] = useState([]);
  const [content, setContent] = useState('');
  const [markerTitle, setMarkerTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [datePicker, setDatePicker] = useState({
    show: false,
    mode: 'date',
    date: new Date(Date.now()),
    inputCallback: () => {},
  });

  const handleMarkerChange = (title) => {
    setMarkerTitle(title);
  };

  const [input, setInput] = useState({
    userId: user._id,
    date: selectedDate,
    content: content,
  });

  const date = new Date();
  const formData = new FormData();

  const uploadImages = (images) => {
    images.forEach((image, index) => {
      formData.append('images', {
        uri: image,
        name: `${index}${date.getFullYear()}${date.getMonth()}${date.getDate()}${date.getHours()}${date.getMinutes()}.jpeg`,
        type: 'image/jpeg',
      });
    });
  };

  uploadImages(images);

  const foundPost = {
    user: user._id,
    date: input.selectedDate,
    content: input.content,
    pet: '6522b7514d3b800a2ea76621',
    location: markerTitle,
    images: formData,
    type: 'Found',
  };

  const handleSave = async () => {
    try {
      await createPost(foundPost, user.token);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <View style={{ flex: 1 }}>
        <Header title="New Post" onSavePress={handleSave} />

        <Suspense fallback={<ActivityIndicator />}>
          <ImagePicker images={images} setImages={setImages} />
          <View style={styles.container}>
            <View
              style={{
                width: '100%',
                paddingHorizontal: 20,
              }}
            >
              <Text
                style={{
                  color: theme.colors.text,
                  ...styles.details,
                }}
              >
                {'Enter found pet details'}
              </Text>
              <ThemeTextInput
                editable={false}
                onPressIcon={() => {
                  setDatePicker({
                    show: true,
                    mode: 'date',
                    inputCallback: (date) => {
                      setInput({ ...input, date: date });
                    },
                  });
                }}
                value={input.date.toLocaleDateString()}
                icon={
                  <Entypo name="calendar" size={24} color={theme.colors.icon} />
                }
              />

              <ThemeTextInput
                placeholder={'Special notes...'}
                value={input.content}
                multiline={true}
                numOfLines={3}
                maxLength={200}
                onChange={(text) => {
                  setInput({ ...input, content: text });
                }}
              />
            </View>
          </View>
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
          <MapLocation onMarkerChange={handleMarkerChange} />
        </Suspense>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  details: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default FoundPost;
