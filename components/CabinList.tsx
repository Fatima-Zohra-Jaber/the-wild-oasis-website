import CabinCard from "./CabinCard";
import { getCabins } from "@/lib/data.service";

export interface Cabin {
  id: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string;
}


interface CabinListProps {
  filter: string;
}

async function CabinList({ filter }: CabinListProps) {
  const cabins: Cabin[] = await getCabins();

  if (!cabins?.length) return null;

  const filteredCabins = cabins.filter((cabin) => {
    if (filter === "small") {
      return cabin.maxCapacity <= 3;
    }
    if (filter === "medium") {
      return cabin.maxCapacity > 3 && cabin.maxCapacity <= 7;
    }
    if (filter === "large") {
      return cabin.maxCapacity > 7;
    }
    return true;
  });

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {filteredCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}
export default CabinList;
