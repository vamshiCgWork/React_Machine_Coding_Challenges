import { useEffect, useState } from "react";
import Accordion from "./components/AccordianDataDriven";
import APIUserDirectory from "./components/ApiFetching";
import CharacterCounter from "./components/CharacterCounter";
import DebouncedApiSearch from "./components/DebouncedApiSearch";
import DigitalClock from "./components/DigitalClock";
import StarRating from "./components/StarRating";
import TodoApp from "./components/Todo";
import "./styles.css";

export default function App() {
  const [list, setList] = useState(["list1", "list2", "list3"]);
  const handleDelete = (index) => {
    console.log("value", index);
    const newList = list.filter((val) => val.index != index);
    console.log("newlist", newList);
  };
  return (
    <div className="App">
      <DigitalClock />
      <TodoApp />
      <DebouncedApiSearch />
      <APIUserDirectory />

      <CharacterCounter />
      <StarRating />
      <Accordion />
    </div>
  );
}
