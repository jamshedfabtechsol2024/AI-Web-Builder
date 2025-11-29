import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const InfiniteMovingPartner = ({
  items = [],
  direction = "right",
  speed = "normal",
  pauseOnHover = true,
  className,
}) => {
  const containerRef = React.useRef(null);
  const scrollerRef = React.useRef(null);

  const [start, setStart] = useState(false);

  const addAnimation = () => {
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
  };

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
          "flex w-max min-w-full shrink-0 flex-nowrap gap-10 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        ref={scrollerRef}
      >
        {items?.map((item, idx) => (
          <li className="" key={item.content || idx}>
            <blockquote className="partner-item h-full w-full">
              <div
                aria-hidden="true"
                className="user-select-none -top-0.5 -left-0.5 -z-1 pointer-events-none absolute h-[calc(100%_+_4px)] w-[calc(100%_+_4px)] select-none rounded-3xl"
              />
              <div>{item.content}</div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
