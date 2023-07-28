// import Image from "next/image";
"use client";
import React, { useState, useEffect } from "react";
import { collection, addDoc, getDoc, QuerySnapshot, onSnapshot, query } from "firebase/firestore";
import { db } from "./Firebase";

export default function Home() {
  const [items, setItems] = useState([
    { name: "Cake", price: 10.99 },
    { name: "Pie", price: 3.99 },
    { name: "coffee", price: 10.99 },
  ]);

  const [newItem, setNewItem] = useState({ name: "", price: "" });
  const [total, setTotal] = useState(0);
 
  const addItem = async (e) => {
    e.preventDefault();
    if (newItem.name !== "" && newItem.price !== "") {
      setItems([...items, newItem]);
      await addDoc(collection(db, "items"), {
        name: newItem.name.trim(),
        price: newItem.price,
      });
      setNewItem({name: '', price: ''})
    }
  };

  useEffect(() => {
const q = query(collection(db, 'items'))
const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
  let itemsArr = []

  QuerySnapshot.forEach((doc) => {
    itemsArr.push((...doc.data(), id: doc.id))
  })
  setItems(itemsArr)


})
  }, []);

  return (
    <main className="flex  justify-between min-h-screen flex-col items-center sm:p-24 p-24">
      <div className="z-10 items-center w-full max-w-5xl font-mono  justify-between text-sm ">
        <h1 className="text-4xl text-center p-4 ">Expense Tracker </h1>
        <div className="bg-slate-800 p-4 rounded-lg">
          <form className="grid grid-cols-6  text-black items-center">
            <input
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="col-span-3 p-3 border"
              type="text"
              placeholder="Enter Item"
            />

            <input
              value={newItem.price}
              onChange={(e) =>
                setNewItem({ ...newItem, price: e.target.value })
              }
              className="col-span-2 p-3 border mx-3"
              type="number"
              placeholder="Enter $"
            />

            <button
              onClick={addItem}
              className="text-white bg-slate-950 hover:bg-slate-900 p-3 text-xl"
              type="submit"
            >
              +
            </button>
          </form>
          <ul>
            {items.map((item, id) => (
              <li
                key={id}
                className="my-4 w-full flex justify-between bg-slate-950"
              >
                <div className="p-3 w-full flex justify-between">
                  <span className="capitalize">{item.name}</span>
                  <span>{item.price}</span>
                </div>
                <button className="ml-8 p-4 border-l-2 border-slate-900 hover:bg-slate-900 w-16">
                  X
                </button>
              </li>
            ))}
          </ul>
          {items.length < 1 ? (
            ""
          ) : (
            <div className="flex justify-between p-3">
              <span>Total</span>
              <span>${total}</span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
