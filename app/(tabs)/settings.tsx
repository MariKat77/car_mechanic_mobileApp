import { ThemedView } from "@/components/ThemedView";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

import {
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { ThemedText } from "@/components/ThemedText";

export default function SettingsScreen() {
  const [reminderDate, setReminderDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [reminderTime, setReminderTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [serviceInterval, setServiceInterval] = useState("");

  const onDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || reminderDate;
    setShowDatePicker(false);
    setReminderDate(currentDate);
  };

  const onTimeChange = (event: any, selectedTime: Date | undefined) => {
    const currentTime = selectedTime || reminderTime;
    setShowTimePicker(false);
    setReminderTime(currentTime);
  };

  const handleSave = () => {
    // TODO: implement saving logic
    console.log("Reminder Date:", reminderDate);
    console.log("Reminder Time:", reminderTime);
    console.log("Service Interval:", serviceInterval);
  };

  return (
    <>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Ustawienia</ThemedText>
      </ThemedView>
      <ThemedView style={styles.container}>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <TextInput
            placeholder="Wybierz datę przypomnienia"
            value={reminderDate.toLocaleDateString()}
            style={styles.input}
            editable={false}
          />
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={reminderDate}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}

        <TouchableOpacity onPress={() => setShowTimePicker(true)}>
          <TextInput
            placeholder="Wybierz godzinę przypomnienia"
            value={reminderTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
            style={styles.input}
            editable={false}
          />
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            value={reminderTime}
            mode="time"
            display="default"
            onChange={onTimeChange}
          />
        )}

        <Picker
          selectedValue={serviceInterval}
          onValueChange={(itemValue) => setServiceInterval(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Wybierz interwał serwisowy" value="" />
          <Picker.Item label="Co 0.5 roku" value="halfYear" />
          <Picker.Item label="Co rok" value="year" />
          <Picker.Item label="Co 2 lata" value="twoYears" />
        </Picker>

        <Button title="Zapisz" onPress={handleSave} />
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 60,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  picker: {
    height: 60,
    width: "100%",
    marginBottom: 15,
    backgroundColor: "#fff",
  },
});
