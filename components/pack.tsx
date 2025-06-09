import React from "react";

import TPack, { TPack } from "./PackCard";
import PackCard from "./PackCard";
import axios from "axios";

async function getPacks(): Promise<TPack[]> {
  return axios.get("http://localhost:8080/pack/bulk");
}

export async function Pack() {
  const packs = await getPacks();
  console.log(packs.data);
  return (
    <div>
      {packs.data.map((pack) => (
        <PackCard {...pack} />
      ))}
    </div>
  );
}

export default Pack;
