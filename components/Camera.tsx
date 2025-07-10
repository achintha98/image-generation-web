"use client";

import { useAuth } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ImageCard, { TImage } from "./ImageCard";

const testImages: TImage[] = [
  {
    name: "Mountain",
    imageURL:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600",
    status: "approved",
  },
  {
    name: "Beach",
    imageURL:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600",
    status: "pending",
  },
  {
    name: "City",
    imageURL:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?w=600",
    status: "approved",
  },
  {
    name: "Forest",
    imageURL:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600",
    status: "rejected",
  },
  {
    name: "Desert",
    imageURL:
      "https://images.unsplash.com/photo-1585871218263-9c5582cd5a4c?w=600",
    status: "approved",
  },
  {
    name: "Aurora",
    imageURL:
      "https://images.unsplash.com/photo-1504198458649-3128b932f49b?w=600",
    status: "pending",
  },
  {
    name: "Waterfall",
    imageURL:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600",
    status: "approved",
  },
  {
    name: "Canyon",
    imageURL:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600",
    status: "rejected",
  },
];

const Camera = () => {
  const [images, setImages] = useState<TImage[]>([]);
  const { getToken } = useAuth();

  useEffect(() => {
    (async () => {
      const token = await getToken();
      const response = await axios.get("http://localhost:8080/image/bulk", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setImages(response.data.images);
    })();
  }, []);
  return (
    <div className="p-4 h-screen overflow-y-auto">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {testImages.map((image) => (
          <ImageCard key={image.name} {...image} />
        ))}
      </div>
    </div>
  );
};

export default Camera;
