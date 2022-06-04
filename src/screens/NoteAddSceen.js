import { useState, useEffect } from "react";
import { Box, Text } from "native-base";
import { useTheme } from "@react-navigation/native";

import {
  InputWithTitle,
  InputWithDateTimePicker,
  TextAreaWithNotes,
  InputOptionWithCategory,
} from "../utils";

const NoteAddScreen = ({ Navigation }) => {
  // Title
  const [title, setTitle] = useState("");
  // Notes
  const [notes, setNotes] = useState("");
  // Date and Time
  const [dateText, setDateText] = useState("");
  const [timeText, setTimeText] = useState("");
  // Category
  const [category, setCategory] = useState("");
  // Divide
  const [divide, setDivide] = useState("low");
  // color
  const { colors } = useTheme();

  return (
    <Box flex={1} bgColor={colors.Background} p={10}>
      <InputWithTitle title={title} setTitle={setTitle} />
      <TextAreaWithNotes notes={notes} setNotes={setNotes} />
      <InputWithDateTimePicker
        dateText={dateText}
        setDateText={setDateText}
        timeText={timeText}
        setTimeText={setTimeText}
      />
      <InputOptionWithCategory category={category} setCategory={setCategory} />
    </Box>
  );
};

export default NoteAddScreen;
