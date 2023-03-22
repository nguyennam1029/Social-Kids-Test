import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { toast } from "react-toastify";
import "./styles/add.css";

const AddExpense = ({ onSubmit }) => {
  const { register, handleSubmit, reset } = useForm();

  const options = [
    { value: "", text: "--Choose an option--" },
    { value: "Price", text: "Price" },
    { value: "Ratio", text: "Ratio" },
  ];
  const [selected, setSelected] = useState(options[0].value);

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  const handleGetValue = async (data) => {
    const dataNew = {
      ...data,
      id: uuidv4(),
    };
    onSubmit(dataNew);

    reset();
  };

  return (
    <div>
      <h1>Thêm Phụ Phí</h1>
      <form onSubmit={handleSubmit(handleGetValue)}>
        <div>
          <label htmlFor="">Tên</label>
          <input type="text" {...register("Title")} />
        </div>
        <div>
          <select value={selected} onChange={handleChange}>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        </div>
        <div>
          {selected === "Price" ? (
            <input type="number" {...register("Price")} />
          ) : selected === "Ratio" ? (
            <div>
              <select {...register("Ratio")}>
                <option value="pp1">pp1</option>
                <option value="pp2">pp2</option>
                <option value="pp3">pp3</option>
              </select>
            </div>
          ) : (
            <span></span>
          )}
        </div>

        <button type="submit">Thêm</button>
      </form>
    </div>
  );
};

export default AddExpense;
