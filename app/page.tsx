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
  category: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [randomProducts, setRandomProducts] = useState<Product[]>([]);
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

  useEffect(() => {
    if (products.length > 0) {
      const shuffleArray = (arr: Product[]) => {
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
      };

      const shuffledProducts = shuffleArray([...products]);
      const selectedProducts = shuffledProducts.slice(0, 8);
      setRandomProducts(selectedProducts);
    }
  }, [products]);

  const handleSort = (option: string) => {
    let sortedProducts = [...randomProducts];
    if (option === "priceAsc") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (option === "priceDesc") {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (option === "title") {
      sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
    }
    setRandomProducts(sortedProducts);
    setSortOption(option);
  };
  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <main className="container">
      <Ads />
      <div className="flex flex-col gap-[100px] justify-center items-center mb-20">
        <p className="text-5xl font-semibold">Featured Products</p>
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
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {randomProducts.map((product) => (
            <div key={product.id}>
              <li className="bg-gray-200 rounded-lg hover:scale-105 transition ease-in-out ">
                <Link href={`/${product.category}/${product.id}`}>
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="rounded-t-lg"
                  />
                </Link>
              </li>
              <div className="flex justify-between pt-5 px-4">
                <h2 className="text-xl font-bold leading-6">{product.title}</h2>
                <p className="text-gray-500 font-light">
                  Price: ${product.price}
                </p>
              </div>
            </div>
          ))}
        </ul>
        <Link href={'/products'}>
          <button className="bg-black text-white p-4 rounded-lg shadow-2xl w-[250px] h-[60px]">
            View all products
          </button>
        </Link>
      </div>
    </main>
  );
}
