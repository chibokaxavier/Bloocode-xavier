"use client";
import Ads from "@/components/Ads";
import Spinner from "@/components/Spinner";
import axios from "axios";
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

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [furnitureProducts, setFurnitureProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://dummyjson.com/products");
        setProducts(res.data.products);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const furnitures = products.filter(
        (furniture) => furniture.category === "furniture"
      );
      setFurnitureProducts(furnitures);
    }
  }, [products]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>{error}</div>;
  }


  return (
    <main className=" container">
      {/* <div className="">
        <Ads />
      </div> */}
      <div className="flex  flex-col gap-[100px] justify-center items-center mb-20">
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 gap-4 pt-10 ">
          {furnitureProducts.map((product: Product) => (
            <div key={product.id} className="">
              <Link href={`/furnitures/${product.id}`}>
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
      </div>
    </main>
  );
}
