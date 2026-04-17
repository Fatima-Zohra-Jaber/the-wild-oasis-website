import { getCountries } from "@/lib/data.service";

interface SelectCountryProps {
  name: string;
  id: string;
  className?: string;
}

async function SelectCountry({ name, id, className }: SelectCountryProps) {
  const countries = await getCountries();

  return (
    <select name={name} id={id} className={className}>
      <option value="">Select country...</option>
      {countries.map((c: { name: string }) => (
        <option key={c.name} value={c.name}>
          {c.name}
        </option>
      ))} 
    </select>
  );
}

export default SelectCountry;
