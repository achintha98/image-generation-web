import React from "react";

import TPack, { TPack } from "./PackCard";
import PackCard from "./PackCard";
import axios from "axios";

async function getPacks(): Promise<TPack[]> {
  return axios.get("localhost:8080");
}

export async function Pack() {
  const packs = await getPacks();
  return (
    <div>
      {packs.map((pack) => (
        <PackCard {...pack} />
      ))}
    </div>
  );
}

export default Pack;
