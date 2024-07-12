"use client";
import Ads from "@/components/Ads";
import axios from "axios";
import { Anybody } from "next/font/google";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Product {
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  id: number;
  // Add other properties as per your actual API response
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [randomProducts, setRandomProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
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
    if (products.length > 0) {
      const shuffleArray = (products: any) => {
        for (let i = products.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [products[i], products[j]] = [products[j], products[i]];
        }
        return products;
      };

      const shuffledProducts = shuffleArray([...products]);
      const selectedProducts = shuffledProducts.slice(0, 8);
      setRandomProducts(selectedProducts);
    }
  }, [products]);

  return (
    <main className=" container">
      <div className="">
        <Ads />
      </div>
      <div className="flex  flex-col gap-[100px] justify-center items-center mb-20">
        <p className="text-5xl font-semibold">Featured Products</p>
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 ">
          {randomProducts.map((product: Product) => (
            <div key={product.id} className="">
              <Link href={""}>
                <li className=" bg-gray-200 rounded-lg">
                  <img src={product.thumbnail} alt={product.title} />
                </li>
                <div className="flex justify-between pt-5">
                  <h2 className="text-xl font-bold leading-6">
                    {product.title}
                  </h2>{" "}
                  <p className="text-gray-500 font-light">
                    Price:${product.price}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </ul>
        <button className="bg-black text-white p-4 rounded-lg shadow-2xl w-[250px] h-[60px]">View all products</button>
      </div>
    </main>
  );
}
