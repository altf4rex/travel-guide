"use client"
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { destinations } from "@/constants";
import { DestinationsCartProps } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function Carousel() {
    gsap.registerPlugin(useGSAP, ScrollTrigger);
    
    const containerRef = useRef();
    
    useGSAP(() => {
        const cards = gsap.utils.toArray(containerRef.current.children);

        cards.forEach((card, index) => {
            gsap.to(
                card,
                {
                    scale: 1.3, // увеличиваем масштаб до 1.3 при достижении середины
                    duration: 2,
                    scrollTrigger: {
                        trigger: card, // используем карточку в качестве триггера
                        scroller: containerRef.current, // используем контейнер в качестве скроллера
                        start: "top center", // начало активации триггера при прокрутке до середины контейнера
                        end: "80% center", // конец активации триггера при прокрутке до середины контейнера
                        scrub: true, // плавное обновление анимации при прокрутке
                        markers: true, // для отладки (можно удалить)
                        onLeave: () => gsap.to(card, { scale: 1, duration: 0.5 }),
                        onEnter: () => console.log(`Animation started for card with Id: ${destinations[index].id}`)
                    }
                }
            );
        });
      
    }, {scope: containerRef}); 

    return (
        <div className="Flipped carousel flex flex-col w-fit max-h-[423px] overflow-y-scroll overflow-x-auto" ref={containerRef}>
            
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
    );
}
// "use client"

// import { useRef, useEffect } from "react";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { destinations } from "@/constants";
// import { DestinationsCartProps } from "@/types";
// import Image from "next/image";
// import Link from "next/link";

// export default function Carousel() {
//   const containerRef = useRef();

//   useEffect(() => {
//     gsap.registerPlugin(ScrollTrigger);

//     let iteration = 0; 
//     gsap.set('.cards li', {xPercent: 400, opacity: 0, scale: 0});
  
//     const spacing = 0.1,
//       snapTime = gsap.utils.snap(spacing),
//       cards = gsap.utils.toArray('.cards li'),
//       animateFunc = element => {
//         const tl = gsap.timeline();
//         tl.fromTo(element, {scale: 0, opacity: 0}, {scale: 1, opacity: 1, zIndex: 100, duration: 0.5, yoyo: true, repeat: 1, ease: "power1.in", immediateRender: false})
//           .fromTo(element, {xPercent: 400}, {xPercent: -400, duration: 1, ease: "none", immediateRender: false}, 0);
//         return tl;
//       },
//       seamlessLoop = buildSeamlessLoop(cards, spacing, animateFunc),
//       playhead = {offset: 0},
//       wrapTime = gsap.utils.wrap(0, seamlessLoop.duration()),
//       scrub = gsap.to(playhead, {
//         offset: 0,
//         onUpdate() {
//           seamlessLoop.time(wrapTime(playhead.offset));
//         },
//         duration: 0.5,
//         ease: "power3",
//         paused: true
//       }),
//       trigger = ScrollTrigger.create({
//         start: 0,
//         onUpdate(self) {
//           let scroll = self.scroll();
//           if (scroll > self.end - 1) {
//             wrap(1, 2);
//           } else if (scroll < 1 && self.direction < 0) {
//             wrap(-1, self.end - 2);
//           } else {
//             scrub.vars.offset = (iteration + self.progress) * seamlessLoop.duration();
//             scrub.invalidate().restart();
//           }
//         },
//         end: "+=3000",
//         markers: true,
//         pin: ".gallery"
//       }),
//       progressToScroll = progress => gsap.utils.clamp(1, trigger.end - 1, gsap.utils.wrap(0, 1, progress) * trigger.end),
//       wrap = (iterationDelta, scrollTo) => {
//         iteration += iterationDelta;
//         trigger.scroll(scrollTo);
//         trigger.update();
//       };
  
//     ScrollTrigger.addEventListener("scrollEnd", () => scrollToOffset(scrub.vars.offset));
  
//     function scrollToOffset(offset) {
//       let snappedTime = snapTime(offset),
//           progress = (snappedTime - seamlessLoop.duration() * iteration) / seamlessLoop.duration(),
//           scroll = progressToScroll(progress);
//       if (progress >= 1 || progress < 0) {
//         return wrap(Math.floor(progress), scroll);
//       }
//       trigger.scroll(scroll);
//     }
  
//     document.querySelector(".next").addEventListener("click", () => scrollToOffset(scrub.vars.offset + spacing));
//     document.querySelector(".prev").addEventListener("click", () => scrollToOffset(scrub.vars.offset - spacing));
  
//     function buildSeamlessLoop(items, spacing, animateFunc) {
//       let rawSequence = gsap.timeline({paused: true}),
//           seamlessLoop = gsap.timeline({
//             paused: true,
//             repeat: -1,
//             onRepeat() {
//               this._time === this._dur && (this._tTime += this._dur - 0.01);
//             },
//             onReverseComplete() {
//               this.totalTime(this.rawTime() + this.duration() * 100);
//             }
//           }),
//           cycleDuration = spacing * items.length,
//           dur;

//       items.concat(items).concat(items).forEach((item, i) => {
//         let anim = animateFunc(items[i % items.length]);
//         rawSequence.add(anim, i * spacing);
//         dur || (dur = anim.duration());
//       });

//       seamlessLoop.fromTo(rawSequence, {
//         time: cycleDuration + dur / 2
//       }, {
//         time: "+=" + cycleDuration,
//         duration: cycleDuration,
//         ease: "none"
//       });
//       return seamlessLoop;
//     }
//   }, []);
//   return (
//     <div className="Flipped carousel flex flex-col w-fit max-h-[423px] overflow-y-scroll overflow-x-auto" ref={containerRef}>
//       <ul className="cards"> {/* Added */}
//         {destinations.map((d: DestinationsCartProps, i: number) => (
//           <li key={d.id} className={`Content slide ml-20 pt-10 flex items-center ${i === 0 ? 'mt-40' : ''} ${i === destinations.length - 1 ? 'mb-40' : ''}`}>
//             <Link href={d.link}>
 
//                 <Image 
//                   className="rounded-3xl"
//                   src={d.img}
//                   alt={d.name}
//                   width={277}
//                   height={155}
//                 />
//                 <p className="title text-base font-bold text-primaryLight">{d.name}</p>

//             </Link>
//           </li>
//         ))}
//       </ul>
//       <button className="prev">Previous</button> {/* Added */}
//       <button className="next">Next</button> {/* Added */}
//     </div>
//   );
// }