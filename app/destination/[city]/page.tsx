import { nara } from "@/constants";
import { CityProps } from "@/types";
import Image from "next/image";

export default function Page({ params }: { params: { city: string } }) {

  let city:CityProps = nara; 
  
  return (
    <main className="container my-10">
      <div className="relative background-linear">
      <Image
          className="max-w-[928px] max-h-[480px] object-cover relative -z-10 rounded-xl"
          src={city.img}
          alt={city.name}
          width={928}
          height={480}
        />
        <h1 className="absolute left-10 bottom-10 text-5xl text-primaryLight">{city.name}</h1>
      </div>
        <div className="mt-6">
          <h2 className="text-xl font-bold text-primaryDark dark:text-primaryLight">Overview</h2>
          <p className="mt-3 text-base text-primaryDark dark:text-primaryLight">{city.overview}</p>
        </div>
        <div className="mt-6">
          <h2 className="mb-3 text-xl font-bold text-primaryDark dark:text-primaryLight">Attractions</h2>
          <ul className="list-disc list-inside">
          {
              city.attractions.map((a) => <li className="text-base leading-7 text-primaryDark dark:text-primaryLight">{a}</li>)
          }
          </ul>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-bold text-primaryDark dark:text-primaryLight">Routes</h2>
          <p className="mt-3 text-base text-primaryDark dark:text-primaryLight">{city.routes}</p>
        </div>
    </main>
  );
}