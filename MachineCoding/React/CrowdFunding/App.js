import React, { useState } from "react";
import CampaignCard from "./components/CampaignCard";
import { INITIAL_CAMPAIGNS } from "./constants/data";
import "./App.css";

function App() {
  const [campaigns, setCampaigns] = useState(INITIAL_CAMPAIGNS);

  const handleContribute = (campaignId, name, amount) => {
    setCampaigns((prev) =>
      prev.map((c) => {
        if (c.id !== campaignId) return c;
        const newContributor = { id: Date.now(), name, amount };
        return {
          ...c,
          raised: Math.min(c.raised + amount, c.goal),
          contributors: [...c.contributors, newContributor],
        };
      }),
    );
  };

  const handleWithdraw = (campaignId, contributorId) => {
    setCampaigns((prev) =>
      prev.map((c) => {
        if (c.id !== campaignId) return c;
        const contributor = c.contributors.find(
          (con) => con.id === contributorId,
        );
        if (!contributor) return c;
        return {
          ...c,
          raised: Math.max(0, c.raised - contributor.amount),
          contributors: c.contributors.filter(
            (con) => con.id !== contributorId,
          ),
        };
      }),
    );
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>CrowdFund</h1>
        <p>Back projects you believe in</p>
      </header>
      <main className="campaigns-grid">
        {campaigns.map((campaign) => (
          <CampaignCard
            key={campaign.id}
            campaign={campaign}
            onContribute={handleContribute}
            onWithdraw={handleWithdraw}
          />
        ))}
      </main>
    </div>
  );
}

export default App;
