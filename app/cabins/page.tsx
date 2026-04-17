import type { Metadata } from "next";
import CabinCard from "@/components/CabinCard";

export const metadata: Metadata = {
  title: "Cabins",
};

interface Cabin {
  id: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string;
}

export default function Cabins() {
  const cabins: Cabin[] = [
    {
      id: 1,
      name: "A",
      maxCapacity: 4,
      regularPrice: 200,
      discount: 50,
      image: "/cabin-a.jpg",
    },
    {
      id: 2,
      name: "B",
      maxCapacity: 6,
      regularPrice: 300,
      discount: 0,
      image: "/cabin-b.jpg",
    },
  ];

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>

      {cabins.length > 0 && (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
          {cabins.map((cabin) => (
            <CabinCard cabin={cabin} key={cabin.id} />
          ))}
        </div>
      )}
    </div>
  );
}
