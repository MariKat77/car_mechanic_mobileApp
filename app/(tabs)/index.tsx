import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { IconSymbol } from "@/components/ui/IconSymbol";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    carModel: "",
    year: "",
    repairScope: "",
    fuelType: "",
  });

  const handleInputChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    // TODO: implement data saving logic
    console.log(formData);
    setModalVisible(false);
  };

  const onDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(false);
    const formattedDate = currentDate.toLocaleDateString();
    handleInputChange("date", formattedDate);
  };

  return (
    <>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Notatnik mechanika samochodowego</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle" style={{ marginLeft: 10 }}>
          Lista klientów:
        </ThemedText>
      </ThemedView>
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <IconSymbol name="plus.circle" size={60} color="#fff"></IconSymbol>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <ThemedView style={styles.modalView}>
          <ThemedText type="title" style={{ marginBottom: 10 }}>
            Dodaj klienta
          </ThemedText>
          <TextInput
            placeholder="Imię i nazwisko"
            value={formData.name}
            onChangeText={(value) => handleInputChange("name", value)}
            style={styles.input}
          />
          <TextInput
            placeholder="Telefon"
            value={formData.phone}
            onChangeText={(value) => handleInputChange("phone", value)}
            style={styles.input}
          />
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={styles.input}
          >
            <ThemedText style={{ color: "gray", marginTop: 5 }}>
              {formData.date ? formData.date : "Wybierz datę"}
            </ThemedText>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={new Date()}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}
          <TextInput
            placeholder="Marka/Model"
            value={formData.carModel}
            onChangeText={(value) => handleInputChange("carModel", value)}
            style={styles.input}
          />
          <TextInput
            placeholder="Rok produkcji"
            value={formData.year}
            onChangeText={(value) => handleInputChange("year", value)}
            style={styles.input}
          />
          <Picker
            selectedValue={formData.repairScope}
            onValueChange={(itemValue) =>
              handleInputChange("repairScope", itemValue)
            }
            style={styles.picker}
          >
            <Picker.Item label="Wybierz zakres naprawy" value="" />
            <Picker.Item label="Serwis olejowy" value="serwis olejowy" />
            <Picker.Item label="Silnik" value="silnik" />
            <Picker.Item label="Zawieszenie" value="zawieszenie" />
            <Picker.Item label="Skrzynia biegów" value="skrzynia biegów" />
          </Picker>
          <Picker
            selectedValue={formData.fuelType}
            onValueChange={(itemValue) =>
              handleInputChange("fuelType", itemValue)
            }
            style={styles.picker}
            itemStyle={{ color: "gray" }}
          >
            <Picker.Item label="Wybierz typ paliwa" value="" />
            <Picker.Item label="Benzyna" value="benzyna" />
            <Picker.Item label="Diesel" value="diesel" />
            <Picker.Item
              label="Energia elektryczna"
              value="energia elektryczna"
            />
          </Picker>
          <View style={styles.buttonContainer}>
            <Button title="Zapisz" onPress={handleSubmit} />
            <Button title="Anuluj" onPress={() => setModalVisible(false)} />
          </View>
        </ThemedView>
      </Modal>
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
  stepContainer: {
    gap: 10,
    marginBottom: 8,
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "grey",
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },
  input: {
    height: 40,
    width: "100%",
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
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 10,
  },
});
