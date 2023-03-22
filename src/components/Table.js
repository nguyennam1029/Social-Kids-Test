import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddExpense from "./AddExpense";
import "./styles/table.css";

const Table = () => {
  const [expenses, setExpenses] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const response = await axios("http://localhost:3000/expenses");
    setExpenses(response.data);
  };
  const handleRemove = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/expenses/${id}`
      );
      if (response.status) toast.success("Xóa thành công");
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (values) => {
    try {
      const response = await axios.post("http://localhost:3000/expenses", {
        ...values,
      });
      if (response.status) toast.success("Thêm thành công");
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="table-wp">
        <AddExpense onSubmit={onSubmit}></AddExpense>

        <h3>Danh sách phụ phí</h3>
        <table>
          <thead>
            <tr>
              <th>Stt</th>
              <th>Tên phụ phí</th>
              <th>Thành tiền</th>
              <th>Tỉ lệ</th>
              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>
            {expenses.length > 0 &&
              expenses.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.Title}</td>
                  <td>{item.Price}</td>
                  <td>{item.Ratio}</td>
                  <td>
                    <button onClick={() => handleRemove(item.id)}>Xóa</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
