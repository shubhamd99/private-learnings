import { useState } from "react";
import CampaignCard from "./CampaignCard";
import { INITIAL_CAMPAIGNS } from "./data";
import "./App.css";

export type Contributor = {
  id: number;
  name: string;
  amount: number;
};

export type Campaign = {
  id: number;
  title: string;
  description: string;
  goal: number;
  raised: number;
  contributors: Contributor[];
};

function App() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(INITIAL_CAMPAIGNS);

  const handleContribute = (
    campaignId: number,
    name: string,
    amount: number,
  ) => {
    setCampaigns((prev) =>
      prev.map((c) => {
        if (c.id !== campaignId) return c;
        const newContributor: Contributor = { id: Date.now(), name, amount };
        return {
          ...c,
          raised: Math.min(c.raised + amount, c.goal),
          contributors: [...c.contributors, newContributor],
        };
      }),
    );
  };

  const handleWithdraw = (campaignId: number, contributorId: number) => {
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
