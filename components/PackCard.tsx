import React from "react";

export interface TPack {
  name: string;
  imageURL: string;
  description: string;
}

const PackCard = (prop: TPack) => {
  console.log(prop);
  console.log("prop");
  console.log(prop.imageURL);

  return (
    <div className="border rounded hover:border-red-300 hover:border-2 max-w-[400px] p-2">
      <div className="flex p-4 gap-4 bg-red-200">
        <img src={prop.imageURL} alt="" />
      </div>
      <div className="text-2xl">{prop.name}</div>
      <div className="text-sm break-words overflow-hidden">
        {prop.description}
      </div>
    </div>
  );
};

export default PackCard;
