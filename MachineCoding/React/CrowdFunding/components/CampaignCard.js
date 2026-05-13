import React, { useState } from "react";
import styles from "./CampaignCard.module.css";

function CampaignCard({ campaign, onContribute, onWithdraw }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const { id, title, description, goal, raised, contributors } = campaign;
  const progress = Math.min((raised / goal) * 100, 100);
  const remaining = goal - raised;
  const isFunded = raised >= goal;

  const handleSubmit = (e) => {
    e.preventDefault();
    const amt = Number(amount);
    if (!name.trim()) return setError("Name is required.");
    if (!amt || amt <= 0) return setError("Enter a valid amount.");
    if (amt > remaining)
      return setError(
        `Max you can contribute is $${remaining.toLocaleString()}.`,
      );
    setError("");
    onContribute(id, name.trim(), amt);
    setName("");
    setAmount("");
  };

  return (
    <div className={styles.card}>
      <h2 className={styles["card-title"]}>{title}</h2>
      <p className={styles["card-desc"]}>{description}</p>

      <div className={styles["progress-bar-wrap"]}>
        <div
          className={styles["progress-bar-fill"]}
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className={styles["progress-stats"]}>
        <span>
          <strong>${raised.toLocaleString()}</strong> raised
        </span>
        <span>Goal: ${goal.toLocaleString()}</span>
      </div>

      {isFunded ? (
        <div className={styles["funded-badge"]}>Fully Funded!</div>
      ) : (
        <p className={styles["remaining-text"]}>
          ${remaining.toLocaleString()} remaining
        </p>
      )}

      {!isFunded && (
        <form className={styles["contribute-form"]} onSubmit={handleSubmit}>
          <h3>Join this campaign</h3>
          <div className={styles["form-row"]}>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Amount ($)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="1"
            />
            <button type="submit">Contribute</button>
          </div>
          {error && <p className={styles["form-error"]}>{error}</p>}
        </form>
      )}

      {contributors.length > 0 && (
        <div className={styles.contributors}>
          <h3>Contributors</h3>
          <ul>
            {contributors.map((c) => (
              <li key={c.id}>
                <span className={styles["contributor-name"]}>{c.name}</span>
                <span className={styles["contributor-amount"]}>
                  ${c.amount.toLocaleString()}
                </span>
                <button
                  className={styles["withdraw-btn"]}
                  onClick={() => onWithdraw(id, c.id)}
                >
                  Withdraw
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CampaignCard;
