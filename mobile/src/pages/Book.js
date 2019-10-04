import React, { useState } from "react";
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    Platform,
    StatusBar,
    AsyncStorage,
    TextInput,
    TouchableOpacity,
    Alert
} from "react-native";

import api from "./../services/api";

export default function Book({ navigation }) {
    const id = navigation.getParam("id");
    const [date, setDate] = useState("");

    async function handleSubmit() {
        const user_id = await AsyncStorage.getItem("use");

        console.log(`/spots/${id}/bookings`);
        console.log(id);
        console.log(user_id);

        await api.post(
            `/spots/${id}/bookings`,
            { date },
            {
                headers: { user_id }
            }
        );

        Alert.alert("Solicitaçãode reserva enviada!");
        navigation.navigate("List");
    }

    function handleCancel() {
        navigation.navigate("List");
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.label}>DATA DE INTERESSE*</Text>
            <TextInput
                style={styles.input}
                placeholder="Data de interesse"
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
                value={date}
                onChangeText={text => setDate(text)}
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Solicitar Spot</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={handleCancel}
            >
                <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        margin: 30
    },

    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        paddingHorizontal: 20,
        fontSize: 16,
        color: "#444",
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },

    label: {
        fontWeight: "bold",
        color: "#444",
        marginBottom: 8,
        marginTop: 30
    },

    buttonText: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 16
    },

    button: {
        height: 42,
        backgroundColor: "#f05a5b",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 2
    },

    cancelButton: {
        backgroundColor: "#ccc",
        marginTop: 10
    }
});
