import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { styled } from "nativewind";

import { Ionicons } from "@expo/vector-icons";

const StyledSafeAreaView = styled(SafeAreaView);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledText = styled(Text);
const StyledView = styled(View);

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const inputRef = useRef(null);

  const addTask = () => {
    if (taskText.trim() !== "") {
      setTasks([
        ...tasks,
        { id: Date.now(), text: taskText, completed: false },
      ]);
      setTaskText("");
      inputRef.current.blur();
    }
  };
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const renderItem = ({ item }) => (
    <StyledView className="flex-row items-center p-2 bg-white border-b border-gray-200">
      <StyledTouchableOpacity
        onPress={() => toggleTask(item.id)}
        className="flex-1 flex-row items-center"
      >
        <View className="mr-3">
          <Ionicons
            name={item.completed ? "checkbox" : "square-outline"}
            size={24}
            color={item.completed ? "green" : "black"}
          />
        </View>
        <StyledText
          className={`flex-1 text-lg ${
            item.completed ? "line-through text-gray-500" : "text-black"
          }`}
        >
          {item.text}
        </StyledText>
      </StyledTouchableOpacity>
      <StyledTouchableOpacity
        onPress={() => deleteTask(item.id)}
        className="mr-2 p-2 bg-red-100 rounded-md"
      >
        <Ionicons name="trash-outline" size={24} color="red" />
      </StyledTouchableOpacity>
    </StyledView>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <StyledSafeAreaView className="flex-1 bg-gray-100">
        <StatusBar style="auto" />
        <StyledView className="pt-12 flex-1">
          <FlatList
            data={tasks}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            className="flex-1"
          />
        </StyledView>
        <StyledView className="flex-row items-center p-4 bg-white border-t border-gray-200">
          <StyledTextInput
            ref={inputRef}
            value={taskText}
            onChangeText={setTaskText}
            onSubmitEditing={addTask}
            placeholder="Add a new task"
            className="flex-1 p-2 h-12 mr-2 border border-gray-300 rounded"
          />
          <StyledTouchableOpacity
            onPress={addTask}
            className="bg-blue-500 h-12 w-14 flex items-center justify-center   rounded"
          >
            <StyledText className="text-white font-bold text-xl">
              Add
            </StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      </StyledSafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default TodoApp;
