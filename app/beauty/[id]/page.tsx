"use client";
import Ads from "@/components/Ads";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Product {
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  id: number;
  category: String;
  rating: number;
  // Add other properties as per your actual API response
}

export default function Home({ params }: { params: { id: String } }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [beauty, setBeauty] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://dummyjson.com/products");
        const result = await res.json();
        setProducts(result.products);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    console.log("params.id:", params.id); // Debugging statement
    console.log("products:", products); // Debugging statement
    if (products.length > 0) {
      const beautyProduct = products.find(
        (item) => item.id.toLocaleString() === params.id
      );
      console.log("beautyProduct:", beautyProduct);
      setBeauty(beautyProduct || null);
      console.log(beautyProduct);
    }
  }, [products, params.id]);
  const renderStars = (rating: any) => {
    const totalStars = 5;
    const fullStars = Math.floor(rating);
    const emptyStars = totalStars - fullStars;

    return (
      <>
        {Array.from({ length: fullStars }, (_, index) => (
          <span key={`full-${index}`} className="text-3xl">&#9733;</span> // &#9733; is the HTML entity for a filled star
        ))}
        {Array.from({ length: emptyStars }, (_, index) => (
          <span key={`empty-${index}`} className="text-3xl">&#9734;</span> // &#9734; is the HTML entity for an empty star
        ))}
      </>
    );
  };

  return (
    <main className=" container">
      <div className="flex  flex-col gap-[100px] justify-center items-center mb-20">
        <div key={beauty?.id} className="flex gap-10">
          <li className=" bg-gray-200 rounded-lg">
            <img
              src={beauty?.thumbnail}
              alt={beauty?.title}
              className="h-[550px] w-[450px]"
            />
          </li>
          <div className="flex flex-col  gap-5 pt-5">
            <h2 className="text-4xl font-bold leading-6">{beauty?.title}</h2>{" "}
            <div  className="text-base">{renderStars(beauty?.rating)} {beauty?.rating}</div>
            <p className="text-gray-500 font-light text-3xl">
              ${beauty?.price}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
