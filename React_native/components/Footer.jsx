import React from 'react';
import { View, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={() => Linking.openURL('https://github.com/username')}>
        <FontAwesome name="github" size={24} color="#333" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Linking.openURL('mailto:email@example.com')}>
        <MaterialIcons name="email" size={24} color="#333" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Linking.openURL('https://linkedin.com/in/username')}>
        <FontAwesome name="linkedin" size={24} color="#0077B5" style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },
  icon: {
    paddingHorizontal: 10,
  },
});

export default Footer;
