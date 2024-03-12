import { DestinationsCartProps } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function DestinationsCart({img, name, id, link}: DestinationsCartProps) {
    return (
        <Link href={link} key={id}>
            <Image 
                className="rounded-xl"
                src={img}
                alt={name}
                width={176}
                height={99}
            />
            <p className="mt-3 text-base font-bold text-primaryDark dark:text-primaryLight">{name}</p>
        </Link>
    );
}