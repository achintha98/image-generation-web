import React from "react";

export interface TImage {
  name: string;
  imageURL: string;
  status: string;
}

const ImageCard = (props: TImage) => {
  console.log(props);
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img
        src={props.imageURL}
        alt={props.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-2 text-sm text-center">
        <p className="font-semibold">{props.name}</p>
        <p className="text-gray-500">{props.status}</p>
      </div>
    </div>
  );
};

export default ImageCard;
