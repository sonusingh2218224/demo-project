"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function WhyChooseUs() {
  const [data, setData] = useState(null);
  const [selectedOption, setSelectedOption] = useState(0);
  const [features, setFeatures] = useState([]);
  console.log(features);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://abe1-49-47-130-108.ngrok-free.app/api/whychoose?populate=*"
        );
        const responses = await fetch(
          "https://abe1-49-47-130-108.ngrok-free.app/api/features"
        );

        if (!response.ok) throw new Error("Network response was not ok");
        const result = await response.json();
        setData(result.data);

        if (!responses.ok) throw new Error("Network response was not ok");
        const results = await responses.json();
        setFeatures(results.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  if (!data) return <p>Loading...</p>;

  const handleOptionClick = (index) => {
    setSelectedOption(index);
  };

  return (
    <section className="container mx-auto p-6 text-center">
      <h3 className="text-gray-500 text-sm uppercase">Why Choose Us</h3>
      <h1 className="text-3xl font-bold my-4">{data.heading}</h1>
      <p className="text-gray-700 max-w-2xl mx-auto">
        {data.description[0]?.children[0]?.text}
      </p>

      <div className="flex flex-col md:flex-row mt-10 items-center justify-center">
        {/* Left side with image and overlay */}
        <div className="relative md:w-1/2 w-full flex items-center justify-center mb-8 md:mb-0">
          <div className="rounded-full overflow-hidden h-64 w-64 relative">
            {/* Add image here */}
            <Image
              src="/1.jpeg"
              alt="Why Choose Us"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="absolute top-0 left-0 bg-red-600 opacity-80 rounded-full h-64 w-64 flex flex-col items-center justify-center p-6 text-white">
            <h4 className="text-xl font-semibold">{data.secondheading}</h4>
            <p className="text-sm">
              {data.seconddescription[0]?.children[0]?.text}
            </p>
          </div>
        </div>

        {/* Right side with options list */}
        <div className="md:w-1/2 w-full">
          {features.map((feature, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(index)}
              className={`w-full text-left p-4 border rounded-lg my-2 
                ${
                  index === selectedOption
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }
              `}
            >
              {feature.title}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
