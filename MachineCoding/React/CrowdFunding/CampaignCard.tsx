import { useState } from "react";
import type { Campaign } from "./App";

type Props = {
  campaign: Campaign;
  onContribute: (campaignId: number, name: string, amount: number) => void;
  onWithdraw: (campaignId: number, contributorId: number) => void;
};

function CampaignCard({ campaign, onContribute, onWithdraw }: Props) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const { id, title, description, goal, raised, contributors } = campaign;
  const progress = Math.min((raised / goal) * 100, 100);
  const remaining = goal - raised;
  const isFunded = raised >= goal;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
    <div className="card">
      <h2 className="card-title">{title}</h2>
      <p className="card-desc">{description}</p>

      <div className="progress-bar-wrap">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="progress-stats">
        <span>
          <strong>${raised.toLocaleString()}</strong> raised
        </span>
        <span>Goal: ${goal.toLocaleString()}</span>
      </div>

      {isFunded ? (
        <div className="funded-badge">Fully Funded!</div>
      ) : (
        <p className="remaining-text">
          ${remaining.toLocaleString()} remaining
        </p>
      )}

      {!isFunded && (
        <form className="contribute-form" onSubmit={handleSubmit}>
          <h3>Join this campaign</h3>
          <div className="form-row">
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
          {error && <p className="form-error">{error}</p>}
        </form>
      )}

      {contributors.length > 0 && (
        <div className="contributors">
          <h3>Contributors</h3>
          <ul>
            {contributors.map((c) => (
              <li key={c.id}>
                <span className="contributor-name">{c.name}</span>
                <span className="contributor-amount">
                  ${c.amount.toLocaleString()}
                </span>
                <button
                  className="withdraw-btn"
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
