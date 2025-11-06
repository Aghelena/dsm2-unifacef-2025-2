import React, { useState } from "react";
import { View, Text, Button, Image, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function App() {
  const [avatarUri, setAvatarUri] = useState(null);

  async function tirarFoto() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") return;

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) setAvatarUri(result.assets[0].uri);
  }

  async function escolherDaGaleria() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") return;

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) setAvatarUri(result.assets[0].uri);
  }

  function removerFoto() {
    setAvatarUri(null);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil do Usuário</Text>

      {/* Se tiver foto -> mostra Image; senão -> mostra círculo com ícone */}
      {avatarUri ? (
        <Image source={{ uri: avatarUri }} style={styles.avatar} />
      ) : (
        <View style={[styles.avatar, styles.avatarPlaceholder]}>
          <MaterialCommunityIcons name="account" size={80} />
        </View>
      )}

      <View style={styles.buttons}>
        <Button title="Tirar Foto" onPress={tirarFoto} />
      </View>
      <View style={styles.buttons}>
        <Button title="Escolher da Galeria" onPress={escolherDaGaleria} />
      </View>
      {avatarUri && (
        <View style={styles.buttons}>
          <Button title="Remover Foto" onPress={removerFoto} />
        </View>
      )}
    </View>
  );
}

const AVATAR_SIZE = 150;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    marginVertical: 12,
  },
  avatarPlaceholder: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EFEFEF",
    borderWidth: 1,
    borderColor: "#DDD",
  },
  buttons: {
    alignSelf: "stretch",
    marginTop: 6,
    width: 120,
    alignSelf: "center",
  },
});
