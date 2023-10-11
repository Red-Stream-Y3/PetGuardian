import React from 'react';
import { StyleSheet, View, Modal, Pressable } from 'react-native';

const ThemeOverlay = ({ visible, children, onPressBg, transparent }) => {
    
    const styles = StyleSheet.create({
        overlay: {
            flex: 1,
            backgroundColor: !transparent ? 'rgba(0, 0, 0, 0.5)' : null,
            justifyContent: 'center',
            alignItems: 'center',
        },
    });
    
    return (
        <Modal 
            visible={visible} 
            animationType='fade'
            transparent
            onRequestClose={onPressBg}>
            <Pressable style={styles.overlay} onPressOut={onPressBg}>
                <View>
                    {children}
                </View>
            </Pressable>
        </Modal>
    );
};

export default ThemeOverlay;
