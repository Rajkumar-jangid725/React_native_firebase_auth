import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  title: string;
}

export default function CustomHeader({ title }: Props) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: "#2196F3",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    marginLeft: 10,
  },
});
