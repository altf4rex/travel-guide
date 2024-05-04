
"use client"
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { destinations } from "@/constants";
import { DestinationsCartProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import JapanMap from "./JapanMap";

function RoadMap({ id }: { id: number }) {
    return (
        <div className="absolute top-0 right-0">
            <JapanMap id={id}/>
        </div>
    );
}



export default function Carousel() {
    gsap.registerPlugin(ScrollTrigger);

    const containerRef = useRef(null);
    const containerCards = useRef(null);
    const [id, setId] = useState(0);

    useGSAP(() => {
        const cards = gsap.utils.toArray(containerCards.current.children);
        const container = containerRef.current;

        cards.forEach((card, index) => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: card,
                    scroller: container,
                    start: "top center+=100", // Adjust 100px to fine-tune when the animation starts
                    end: "bottom center-=100", // Adjust 100px to fine-tune when the animation ends
                    scrub: 1.5, // Smooth out the transition, 1.5 seconds of lag
                    markers: true,
                    onEnter: () => setId(destinations[index].id),
                    onLeaveBack: () => setId(destinations[index].id)
                }
            });

            tl.to(card, { scale: 1.2, ease: "none" })
              .to(card, { scale: 1, ease: "none" });
        });
    }, [containerRef, containerCards]);

  return (
      <>
          <div className="overlay"></div>
          <div className="Flipped carousel relative z-50 flex flex-col w-fit max-h-[423px] overflow-y-scroll overflow-x-auto" ref={containerRef}>
            <div className="wrapper" ref={containerCards}>
              {
                  destinations.map((d:DestinationsCartProps, i:number) => (
                      <Link href={d.link} key={d.id} className={`Content slide ml-20 pt-10 flex items-center ${i === 0 ? 'mt-40' : ''} ${i === destinations.length - 1 ? 'mb-40' : ''}`}>
                          <Image 
                              className="rounded-3xl"
                              src={d.img}
                              alt={d.name}
                              width={277}
                              height={155}
                          />
                          <p className="title text-base font-bold text-primaryLight">{d.name}</p>
                      </Link>
                  ))
              }
              </div>
          </div>
          <RoadMap id={id}/>
      </>
  );
}



// export default function Carousel() {
//   gsap.registerPlugin(useGSAP, ScrollTrigger);
  
//   const containerRef = useRef();
//   const [id, setId] = useState(0);

//   useGSAP(() => {
//       const cards = gsap.utils.toArray(containerRef.current.children);

//       cards.forEach((card, index) => {
//           gsap.to(
//               card,
//               {
//                   scale: 1.2, // Adjust scale factor for vertical animation
//                   duration: 2,
//                   scrollTrigger: {
//                       trigger: card,
//                       scroller: containerRef.current,
//                       start: "top center", // Adjust trigger zone as needed (e.g., "top 70%")
//                       end: "bottom center", // Adjust trigger zone as needed (e.g., "bottom 30%")
//                       scrub: true,
//                       scrubDirection: "y", // Ensure scrubDirection is set to "y" for vertical scrolling
//                       markers: true, // for debugging (can be removed)
//                       onToggle: (self) => {
//                           const scrollDirection = self.direction;
//                           if (scrollDirection === 1) {
//                               // Scrolling down - start animation from "top center"
//                               startCardAnimation(card, "top center");
//                           } else if (scrollDirection === -1) {
//                               // Scrolling up - start animation from "bottom center"
//                               startCardAnimation(card, "bottom center");
//                           }
//                       },
//                       onLeave: () => gsap.to(card, { scale: 1, duration: 0.5 }),
//                       toggleActions: "play none none none", // Reset animation on scroll direction change
//                   },
//               }
//           );
//       });
//   }, { scope: containerRef });

//   function startCardAnimation(card, triggerPosition) {
//       gsap.to(card, {
//           scale: 1.2,
//           duration: 2,
//           scrollTrigger: {
//               trigger: card,
//               scroller: containerRef.current,
//               start: triggerPosition,
//               end: triggerPosition === "top center" ? "bottom center" : "top center",
//               scrub: true,
//               scrubDirection: "y",
//               onLeave: () => gsap.to(card, { scale: 1, duration: 0.5 }),
//           },
//       });
//   }

//   return (
//       <>
//           <div className="overlay"></div>
//           <div className="Flipped carousel flex flex-col w-fit max-h-[423px] overflow-y-scroll overflow-x-auto" ref={containerRef}>
//               {
//                   destinations.map((d:DestinationsCartProps, i:number) => (
//                       <Link href={d.link} key={d.id} className={`Content slide ml-20 pt-10 flex items-center ${i === 0 ? 'mt-40' : ''} ${i === destinations.length - 1 ? 'mb-40' : ''}`}>
//                           <Image 
//                               className="rounded-3xl"
//                               src={d.img}
//                               alt={d.name}
//                               width={277}
//                               height={155}
//                           />
//                           <p className="title text-base font-bold text-primaryLight">{d.name}</p>
//                       </Link>
//                   ))
//               }
//           </div>
//           <RoadMap id={id}/>
//       </>
//   );
// }
