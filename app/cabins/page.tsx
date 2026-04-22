import type { Metadata } from "next";
import { Suspense } from "react";

import CabinList from "@/components/CabinList";
import Filter from "@/components/Filter";
import Loading from "./loading";
import ReservationReminder from "@/components/ReservationReminder";

export const metadata: Metadata = {
  title: "Cabins",
};

export default async function Cabins({
  searchParams,
}: {
  searchParams: Promise<{ capacity?: string }>;
}) {
  const { capacity } = await searchParams;
  const filter = capacity ?? "all";

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
      <div className="flex justify-end mb-6">
        <Filter />
      </div>
      <Suspense fallback={<Loading />} key={filter}>
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
}
