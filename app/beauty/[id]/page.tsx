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
      const beautyProduct = products.find((item) => item.id.toLocaleString() === params.id);
      console.log("beautyProduct:", beautyProduct)
      setBeauty(beautyProduct || null);
      console.log(beautyProduct);
    }
  }, [products, params.id]);

  return (
    <main className=" container">
      <div className="flex  flex-col gap-[100px] justify-center items-center mb-20">
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 gap-4 ">
          <div key={beauty?.id} className="">
            <li className=" bg-gray-200 rounded-lg">
              <img src={beauty?.thumbnail} alt={beauty?.title} />
            </li>
            <div className="flex justify-between gap-5 pt-5">
              <h2 className="text-xl font-bold leading-6">{beauty?.title}</h2>{" "}
              <p className="text-gray-500 font-light">Price:${beauty?.price}</p>
            </div>
          </div>
        </ul>
      </div>
    </main>
  );
}
