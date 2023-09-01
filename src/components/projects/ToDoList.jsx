import React from "react";
import { nanoid } from "nanoid";
import { FaTrash } from "react-icons/fa";
import TickBox from "./TickBox";

const ToDoList = ({ todos }) => {
  const todoList = todos.map((todo) => {
    return (
      <div key={nanoid()} className="flex justify-between items-start gap-3">
        <span className="flex justify-start items-center gap-3">
          <TickBox />
          <span className="font-medium text-sm text-slate-400">{todo}</span>
        </span>
        <FaTrash className="text-red-600" />
      </div>
    );
  });
  return <div className="grid grid-cols-1 gap-2 mt-2">{todoList}</div>;
};

export default ToDoList;