import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  useColorScheme,
  FlatList,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { IconSymbol } from "@/components/ui/IconSymbol";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Client = {
  name: string;
  phone: string;
  date: string;
  carModel: string;
  year: string;
  repairScope: string;
  fuelType: string;
};

export default function HomeScreen() {
  const colorScheme = useColorScheme();
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

  const [clients, setClients] = useState<Client[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      const storedClients = await AsyncStorage.getItem("clients");
      if (storedClients) {
        setClients(JSON.parse(storedClients));
      }
    } catch (error) {
      console.error("Failed to load clients", error);
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const updatedClients =
        editingIndex !== null
          ? clients.map((client, index) =>
              index === editingIndex ? formData : client
            )
          : [...clients, formData];

      await AsyncStorage.setItem("clients", JSON.stringify(updatedClients));
      setClients(updatedClients);
      resetForm();
    } catch (error) {
      console.error("Failed to save client", error);
    }
  };

  const resetForm = () => {
    setModalVisible(false);
    setFormData({
      name: "",
      phone: "",
      date: "",
      carModel: "",
      year: "",
      repairScope: "",
      fuelType: "",
    });
    setEditingIndex(null);
  };

  const onDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(false);
    const formattedDate = currentDate.toLocaleDateString();
    handleInputChange("date", formattedDate);
  };

  const handleEdit = (index: number) => {
    setFormData(clients[index]);
    setEditingIndex(index);
    setModalVisible(true);
  };

  const handleDelete = async (index: number) => {
    const updatedClients = clients.filter((_, i) => i !== index);
    await AsyncStorage.setItem("clients", JSON.stringify(updatedClients));
    setClients(updatedClients);
  };

  const renderClientItem = ({
    item,
    index,
  }: {
    item: Client;
    index: number;
  }) => (
    <ThemedView style={styles.clientItem}>
      <ThemedText>
        {item.name} - {item.phone} - {item.date}
      </ThemedText>
      <ThemedView style={styles.buttonGroup}>
        <Button title="Edytuj" onPress={() => handleEdit(index)} />
        <Button title="Usuń" onPress={() => handleDelete(index)} />
      </ThemedView>
    </ThemedView>
  );

  return (
    <>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Notatnik mechanika samochodowego</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle" style={{ marginLeft: 10 }}>
          Lista klientów:
        </ThemedText>
        <FlatList
          data={clients}
          renderItem={renderClientItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </ThemedView>
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <IconSymbol
          name="plus.circle"
          size={60}
          color={Colors[colorScheme ?? "light"].tint}
        ></IconSymbol>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={resetForm}
      >
        <ThemedView style={styles.modalView}>
          <ThemedText type="title" style={{ marginBottom: 10 }}>
            {editingIndex !== null ? "Edytuj klienta" : "Dodaj klienta"}
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
          <ThemedView style={styles.buttonContainer}>
            <Button
              title={editingIndex !== null ? "Zapisz" : "Dodaj"}
              onPress={handleSubmit}
            />
            <Button title="Anuluj" onPress={resetForm} />
          </ThemedView>
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
    flex: 1,
    gap: 10,
    marginBottom: 8,
  },
  clientItem: {
    marginLeft: 10,
    marginBottom: 5,
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 30,
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
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 10,
  },
});
