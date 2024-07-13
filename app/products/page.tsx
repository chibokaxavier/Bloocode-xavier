"use client";
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortOption, setSortOption] = useState<string>("");

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
  const handleSort = (option: string) => {
    let sortedProducts = [...products];
    if (option === "priceAsc") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (option === "priceDesc") {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (option === "title") {
      sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
    }
    setProducts(sortedProducts);
    setSortOption(option);
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <main className=" container pt-2">
      <div className="flex justify-end w-full mb-4">
        <select
          value={sortOption}
          onChange={(e) => handleSort(e.target.value)}
          className="bg-gray-200 p-2 rounded-lg"
        >
          <option value="">Sort By</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
          <option value="title">Title: A-Z</option>
        </select>
      </div>
      <div className="flex  flex-col gap-[100px] justify-center items-center mb-20">
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 gap-4 ">
          {products.map((product: Product) => (
            <div key={product.id} className="">
              <Link href={`/beauty/${product.id}`}>
                <li className=" bg-gray-200 rounded-lg">
                  <img src={product.thumbnail} alt={product.title} />
                </li>
                <div className="flex justify-between gap-5 pt-5">
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
