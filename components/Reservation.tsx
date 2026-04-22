import { getSettings, getBookedDatesByCabinId } from "@/lib/data.service";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import { Cabin } from "./CabinList";

async function Reservation({ cabin }: { cabin: Cabin }) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(Number(cabin.id)),
  ]);

  return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-100">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      <ReservationForm cabin={cabin} />
    </div>
  );
}

export default Reservation;
