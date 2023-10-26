import axios from 'axios';

export const sendNotification = async (userID, title, message) => {
  if (!userID) {
    throw new Error('userID is required');
  }
  await axios.post(`https://app.nativenotify.com/api/indie/notification`, {
    subID: userID,
    appId: 14016,
    appToken: 'SBCCyNEJCwfgYrkVTwmNut',
    title: title || 'put your push notification title here as a string',
    message: message || 'put your push notification message here as a string'
  });
};
