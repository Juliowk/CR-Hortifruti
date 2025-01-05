import React from "react";

interface ExampleCarouselImageProps {
  text: string;
}

const ExampleCarouselImage: React.FC<ExampleCarouselImageProps> = ({
  text,
}) => {
  return (
    <div
      style={{
        height: "400px",
        backgroundColor: "gray",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontSize: "24px",
      }}
    >
      {text}
    </div>
  );
};

export default ExampleCarouselImage;
