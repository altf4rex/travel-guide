import CountryMap from "@/components/CountryMap";
import Image from "next/image";
import { destinations } from "@/constants";
import DestinationsCart from "@/components/DestinationCart";

export default function Home() {
  return (
    <main className="container my-10">
      <div className="relative">
        <Image 
        className="rounded-xl"
          src="/japan-main.jpg"
          alt="japan"
          width={928}
          height={480}
        />
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
          <h1 className="text-5xl text-primaryLight ">Explore Japan</h1>
          <p className="text-lg text-primaryLight ">Discover the best of Japan's cities and landmarks</p>
        </div>
      </div>
      <div className="mt-7">
        <CountryMap />
      </div>
      <div>
        {
          destinations.map((d) => <DestinationsCart img={d.img} name={d.name} id={d.id} link={d.link}/>)
        }
      </div>
    </main>
  );
}
