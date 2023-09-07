import "./styles.css";

import { useState } from "react";

import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { useNavigate } from "react-router-dom";

import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";

export const ExpenseTracker = () => {
  const { addTransaction } = useAddTransaction();
  const { transactions, transactionTotals } = useGetTransactions();
  const { name, profilePhoto } = useGetUserInfo();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");

  const { balance, income, expenses } = transactionTotals;

  const onSubmit = async (e) => {
    e.preventDefault();
    addTransaction({
      description: description,
      transactionAmount: transactionAmount,
      transactionType: transactionType,
    });
  };

  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="expense-tracker">
        <div className="container">
          <h1 className="text-center uppercase">
            {name}&apos;s Expense Tracker
          </h1>
          <div className="flex gap-7 items-center">
            {profilePhoto && (
              <div className="profile flex flex-col gap-2">
                <img src={profilePhoto} alt="" />
                <button onClick={signUserOut} className="py-2 px-3">
                  Sign Out
                </button>
              </div>
            )}
            <div>
              <div className="flex gap-5">
                <div className="balance">
                  <h3>Your Balance</h3>
                  {balance >= 0 ? (
                    <h2>₱{balance}</h2>
                  ) : (
                    <h2>-₱{balance * -1}</h2>
                  )}
                </div>
                <div className="summary gap-5">
                  <div className="income">
                    <h4>Income</h4>
                    <p>₱ {income}</p>
                  </div>
                  <div className="expenses">
                    <h4>Expenses</h4>
                    <p>₱ {expenses}</p>
                  </div>
                </div>
              </div>
              <form action="" className="add-transaction" onSubmit={onSubmit}>
                <input
                  type="text"
                  placeholder="Description"
                  required
                  onChange={(e) => setDescription(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Amount"
                  required
                  onChange={(e) => setTransactionAmount(e.target.value)}
                />
                <div>
                  <div className="gap-2 flex">
                    <input
                      type="radio"
                      name="transactionType"
                      id="expense"
                      value="expense"
                      defaultChecked
                      onChange={(e) => setTransactionType(e.target.value)}
                    />
                    <label htmlFor="expense">Expense</label>
                  </div>
                  <div className="gap-2 flex">
                    <input
                      type="radio"
                      name="transactionType"
                      id="income"
                      value="income"
                      onChange={(e) => setTransactionType(e.target.value)}
                    />
                    <label htmlFor="income">Income</label>
                  </div>
                </div>
                <button type="submit" className="bg-green-600">
                  Add Transaction
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="transactions">
        <h2>Transactions History</h2>
        <hr />
        <ul className="p-5">
          {transactions.map((transaction) => {
            const { description, transactionAmount, transactionType } =
              transaction;
            return (
              <li
                key={crypto.randomUUID()}
                className="flex justify-between my-5"
              >
                <p className="font-bold">{description}</p>
                <p
                  className="font-bold"
                  style={{
                    color: transactionType === "expense" ? "red" : "green",
                  }}
                >
                  {transactionType === "expense" ? "-" : "+"} ₱
                  {transactionAmount}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
