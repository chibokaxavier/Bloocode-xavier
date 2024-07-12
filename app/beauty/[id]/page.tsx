"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosHeart } from "react-icons/io";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Product {
  title?: string;
  description?: string;
  price?: number;
  thumbnail?: string;
  id: number;
  category?: String;
  rating?: number;
  brand?: String;
  sku?: String;
  tags?: [];
  stock?: number;
  availabilityStatus?: String;
  discountPercentage?: number;
  warrantyInformation: String;
  shippingInformation: String;
  returnPolicy: String;
  minimumOrderQuantity: String;
  reviews: [];
}
interface Review {
  rating: number;
  comment: String;
  date: String;
  reviewerName: String;
}

export default function Home({ params }: { params: { id: String } }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [beauty, setBeauty] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [price, setPrice] = useState(0);

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
          <span key={`full-${index}`} className="text-3xl">
            &#9733;
          </span> // &#9733; is the HTML entity for a filled star
        ))}
        {Array.from({ length: emptyStars }, (_, index) => (
          <span key={`empty-${index}`} className="text-3xl">
            &#9734;
          </span> // &#9734; is the HTML entity for an empty star
        ))}
      </>
    );
  };
  const renderReviewStars = (rating: any) => {
    const totalStars = 5;
    const fullStars = Math.floor(rating);
    const emptyStars = totalStars - fullStars;

    return (
      <>
        {Array.from({ length: fullStars }, (_, index) => (
          <span key={`full-${index}`} className="text-3xl">
            &#9733;
          </span> // &#9733; is the HTML entity for a filled star
        ))}
        {Array.from({ length: emptyStars }, (_, index) => (
          <span key={`empty-${index}`} className="text-3xl">
            &#9734;
          </span> // &#9734; is the HTML entity for an empty star
        ))}
      </>
    );
  };
  useEffect(() => {
    const calcPrice = () => {
      if (
        beauty?.discountPercentage !== undefined &&
        beauty?.price !== undefined
      ) {
        const discount = (beauty?.discountPercentage / 100) * beauty?.price;
        const mainPrice = beauty?.price - discount;
        setPrice(Math.round((mainPrice + Number.EPSILON) * 100) / 100);
      } else if (beauty?.price !== undefined) {
        setPrice(Math.round((beauty.price + Number.EPSILON) * 100) / 100);
      }
    };
    calcPrice();
  }, [beauty]);

  return (
    <main className=" container">
      <div className="flex  flex-col gap-[100px] justify-center items-center mb-20">
        <div key={beauty?.id} className="flex gap-10">
          <div className=" bg-gray-200 rounded-lg ">
            <div className="text-black mt-5 mx-5 ">
              .{beauty?.availabilityStatus}
            </div>

            <img
              src={beauty?.thumbnail}
              alt={beauty?.title}
              className="h-[500px] w-[450px]"
            />
          </div>
          <div className="flex flex-col  gap-5 pt-5">
            <h2 className="text-4xl font-bold leading-6">{beauty?.title}</h2>{" "}
            <div className="text-base">
              {renderStars(beauty?.rating)} {beauty?.rating}
            </div>
            <p className="  text-black font-light text-3xl ">
              <span className="mr-4">${price}</span>
              <span className="line-through text-xl text-gray-500">
                ${beauty?.price}
              </span>{" "}
            </p>
            <p className="text-gray-600 max-w-[800px]">{beauty?.description}</p>
            <p>{beauty?.stock} in stock</p>
            <div className="flex  items-center gap-4">
              <div className="flex justify-center items-center gap-2">
                {" "}
                <div className="h-8 w-8 bg-gray-300 rounded-md cursor-pointer  items-center flex justify-center">
                  -
                </div>
                <div className="h-12 w-12 border items-center flex justify-center">
                  0
                </div>
                <div className="h-8 w-8 rounded-md cursor-pointer bg-gray-300 items-center flex justify-center">
                  +
                </div>
              </div>
              <div className=" cursor-pointer h-[60px] w-[200px] border flex justify-center items-center">
                Add to cart
              </div>
              <div className=" cursor-pointer h-[50px] border flex justify-center items-center w-[50px]">
                <IoIosHeart />
              </div>
            </div>
            <p className="font-bold">
              Category:{" "}
              <span className="font-normal capitalize">{beauty?.category}</span>
            </p>
            <p className="font-bold">
              Brand:{" "}
              <span className="font-normal capitalize">{beauty?.brand}</span>
            </p>
            <p className="font-bold">
              SKU: <span className="font-normal capitalize">{beauty?.sku}</span>
            </p>
            <div className="font-bold flex">
              Tags:{" "}
              <p className="font-normal capitalize flex">
                {beauty?.tags?.map((tag) => {
                  return <span>{tag}, </span>;
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto container">
        <Tabs
          defaultValue="Additional information"
          className="flex flex-col xl:flex-row gap-[60px]"
        >
          <TabsList className="flex flex-col max-w-[380px] w-full mx-auto xl:mx-0 gap-6">
            <TabsTrigger value="Additional Information">
              Additional Info
            </TabsTrigger>
            <TabsTrigger value="Reviews">Customer reviews</TabsTrigger>
          </TabsList>

          <div className=" w-full">
            <TabsContent value="Additional Information" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold">Additonal Information</h3>
                <p className="text-black mx-auto xl:mx-0 max-w-[600px]">
                  <ul className="">
                    <li className="font-bold">
                      Availabilty Status:{" "}
                      <span className="font-light">
                        {beauty?.availabilityStatus}
                      </span>
                    </li>
                    <li className="font-bold">
                      Warranty Information:{" "}
                      <span className="font-light">
                        {beauty?.warrantyInformation}
                      </span>
                    </li>
                    <li className="font-bold">
                      Shipping Information:
                      <span className="font-light">
                        {beauty?.shippingInformation}
                      </span>
                    </li>
                    <li className="font-bold">
                      Return policy:
                      <span className="font-light">{beauty?.returnPolicy}</span>
                    </li>
                    <li className="font-bold">
                      Minimum Order Quantity :
                      <span className="font-light">
                        {beauty?.minimumOrderQuantity}
                      </span>
                    </li>
                  </ul>
                </p>
              </div>
            </TabsContent>
            <TabsContent value="Reviews" className="w-full h-full">
              <div className="flex flex-col  gap-[30px]">
                <div className="flex flex-col gap-[30px] text-center xl:text-left">
                  <h3 className="text-4xl font-bold">Reviews</h3>
                  <div className=" mx-auto xl:mx-0 text-black">
                    <div>
                      <div className="flex space-x-10">
                        {beauty?.reviews.map((review: Review, index) => {
                          return (
                            <div key={index}>
                              <div>
                                {renderReviewStars(review.rating)}
                                <span className="text-xl">
                                  ({review.rating})
                                </span>
                              </div>
                              <div className="text-xl">
                                {review.reviewerName}-{" "}
                                <span className="text-xs text-gray-400">
                                  {review.date}
                                </span>
                              </div>
                              <div className="text-gray-600 text-base">
                                {review.comment}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </main>
  );
}
