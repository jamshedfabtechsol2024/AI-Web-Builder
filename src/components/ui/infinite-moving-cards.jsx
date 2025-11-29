import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

export const InfiniteMovingCards = ({
  items,
  direction = "right",
  speed = "normal",
  pauseOnHover = true,
  className,
}) => {
  const containerRef = React.useRef(null);
  const scrollerRef = React.useRef(null);

  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      for (const item of scrollerContent) {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      }

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  useEffect(() => {
    addAnimation();
  }, []);

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      className={cn(
        "scroller relative z-20 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
      ref={containerRef}
    >
      <ul
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        ref={scrollerRef}
      >
        {items.map((item) => (
          <li
            className="glass-bg  relative h-[140px] w-[90vw] max-w-full shrink-0 rounded-4xl p-2 sm:h-[160px] sm:w-[300px] sm:p-3 md:h-[200px] md:w-[350px] md:p-4 lg:w-[400px] xl:w-[450px]"
            key={item.name}
          >
            <blockquote className="h-full w-full">
              <div
                aria-hidden="true"
                className="user-select-none -top-0.5 -left-0.5 -z-1 pointer-events-none absolute h-[calc(100%_+_4px)] w-[calc(100%_+_4px)] rounded-4xl"
              />
              <div className="flex h-full w-full flex-col">
                <div className="flex items-center justify-between rounded px-1 py-2 sm:px-2 sm:py-4">
                  <div className="flex items-center gap-2 sm:gap-4">
                    <Avatar className="h-8 w-8 sm:h-12 sm:w-12 flex-shrink-0">
                      <AvatarImage src={item.img} alt={item.name} />
                      <AvatarFallback>{item.name?.[0]}</AvatarFallback>
                    </Avatar>
                    <span className="flex flex-col">
                      <span className="font-normal text-white text-xs leading-[1.4] sm:text-sm">
                        {item.name}
                      </span>
                      <span className="font-normal text-white text-xs leading-[1.4] sm:text-sm">
                        @{item.username}
                      </span>
                    </span>
                  </div>
                </div>
                <span className="relative z-20 line-clamp-3 px-1 pb-2 font-normal text-white text-xs leading-[1.6] sm:px-2 sm:pb-3 sm:text-sm md:line-clamp-8">
                  {item.quote}
                </span>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
