import { getCountries } from "@/lib/data.service";

interface SelectCountryProps {
  name: string;
  id: string;
  className?: string;
  defaultCountry?: string;
}

async function SelectCountry({ name, id, className , defaultCountry}: SelectCountryProps) {
  const countries = await getCountries();
  const flag =
    countries.find((country: { name: string; flag?: string }) => country.name === defaultCountry)?.flag ?? "";

  return (
    <select name={name} id={id} className={className} defaultValue={`${defaultCountry}%${flag}`}>
      <option value="">Select country...</option>
      {countries.map((c: { name: string; flag?: string }) => (
        <option key={c.name} value={`${c.name}%${c.flag}`}>
          {c.name}
        </option>
      ))} 
    </select>
  );
}

export default SelectCountry;
