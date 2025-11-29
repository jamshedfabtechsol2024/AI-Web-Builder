"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import TypeAnimation from "@/components/ui/typeanimation";
import { cn } from "@/lib/utils";

const ModernLoader = ({
  words = [
    "Setting things up...",
    "Initializing modules...",
    "Almost ready...",
  ],
}) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);
  const containerRef = useRef(null);

  const colors = useMemo(
    () => [
      "bg-gray-500",
      "bg-teal-500",
      "bg-blue-500",
      "bg-gray-600",
      "bg-pink-500",
    ],
    []
  );
  const BUFFER = 20;
  const MAX_LINES = 100;

  const generateLines = useCallback(
    (count = 20) =>
      Array.from({ length: count }, (_, idx) => ({
        id: Date.now() + idx,
        segments: Array.from(
          { length: Math.floor(Math.random() * 4) + 1 },
          () => ({
            width: `${Math.floor(Math.random() * 80) + 50}px`,
            color: colors[Math.floor(Math.random() * colors.length)],
            isCircle: Math.random() > 0.93,
            indent: Math.random() > 0.7 ? 1 : 0,
          })
        ),
      })),
    [colors]
  );

  const [lines, setLines] = useState(() => generateLines());

  const getVisibleRange = () => {
    const start = Math.max(0, currentLine - BUFFER);
    const end = Math.min(lines.length, currentLine + BUFFER);
    return { start, end };
  };

  const { start: visibleStart, end: visibleEnd } = getVisibleRange();

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [currentLine]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentLine((prev) => {
        const nextLine = prev + 1;
        if (nextLine >= lines.length - 10)
          setLines((old) => [...old, ...generateLines(50)]);
        return nextLine;
      });
    }, 200);
    return () => clearTimeout(timer);
  }, [currentLine, lines.length, generateLines]);

  useEffect(() => {
    const interval = setInterval(() => setCursorVisible((prev) => !prev), 530);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const cleanup = () => {
      if (lines.length > MAX_LINES && currentLine > BUFFER * 2) {
        setLines((oldLines) => {
          const safeIndex = currentLine - BUFFER * 2;
          if (safeIndex > 0) {
            setCurrentLine((prev) => prev - safeIndex);
            return oldLines.slice(safeIndex);
          }
          return oldLines;
        });
      }
    };
    const interval = setInterval(cleanup, 5000);
    return () => clearInterval(interval);
  }, [currentLine, lines.length]);

  const visibleLines = lines.slice(visibleStart, visibleEnd);

  return (
    <div className="mx-auto w-full max-w-md p-8">
      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        className="relative h-[300px] overflow-hidden rounded-2xl border border-[var(--border)] bg-background shadow-2xl"
        initial={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative z-10 flex items-center px-4 py-3">
          {/* <div className="flex items-center gap-1.5">
            <motion.div className="w-2 xs:w-2.5 sm:w-3 h-2 xs:h-2.5 sm:h-3 rounded-full bg-red-500" />
            <motion.div className="w-2 xs:w-2.5 sm:w-3 h-2 xs:h-2.5 sm:h-3 rounded-full bg-yellow-500" />
            <motion.div className="w-2 xs:w-2.5 sm:w-3 h-2 xs:h-2.5 sm:h-3 rounded-full bg-green-500" />
          </div> */}

          <motion.div
            animate={{ opacity: 1 }}
            className="flex-1 text-center"
            initial={{ opacity: 0 }}
            transition={{ delay: 0.2 }}
          >
            <TypeAnimation
              className="font-mono text-muted-foreground text-xs"
              deletingSpeed="slow"
              pauseDuration={2000}
              typingSpeed="slow"
              words={words}
            />
          </motion.div>
        </div>

        <div
          className="relative h-[calc(100%-48px)] overflow-y-hidden px-5 py-4 font-mono text-sm"
          ref={containerRef}
        >
          <div className="relative z-10 space-y-2">
            <AnimatePresence mode="sync">
              {visibleLines.map((line, idx) => {
                const actualIndex = visibleStart + idx;
                if (actualIndex >= currentLine) return null;
                const extraMargin = (idx + 1) % 4 === 0 ? "mt-2" : "";
                const paddingClass = line.segments[0]?.indent ? "pl-4" : "";
                return (
                  <React.Fragment key={line.id}>
                    <motion.div
                      animate={{ opacity: 1, x: 0 }}
                      className={cn(
                        "flex h-5 items-center gap-2",
                        extraMargin,
                        paddingClass
                      )}
                      exit={{ opacity: 0 }}
                      initial={{ opacity: 0, x: -5 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      {line.segments.map((seg, i) =>
                        seg.isCircle ? (
                          <motion.div
                            animate={{ scale: 1 }}
                            className={cn(
                              "h-4 w-4 rounded-full opacity-50",
                              seg.color
                            )}
                            initial={{ scale: 0 }}
                            key={i}
                            transition={{ duration: 0.2, delay: 0.05 }}
                          />
                        ) : (
                          <motion.div
                            animate={{ width: seg.width }}
                            className={cn(
                              "h-3 rounded-sm opacity-50",
                              seg.color
                            )}
                            initial={{ width: 0 }}
                            key={i}
                            style={{ width: seg.width }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                          />
                        )
                      )}
                    </motion.div>
                    {(actualIndex + 1) % 6 === 0 && (
                      <motion.div
                        animate={{ opacity: 1 }}
                        className="h-1 w-full rounded-sm bg-background opacity-30"
                        exit={{ opacity: 0 }}
                        initial={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </AnimatePresence>

            {currentLine < lines.length && (
              <motion.div
                animate={{ opacity: 1 }}
                className="flex h-5 items-center"
                initial={{ opacity: 0 }}
                style={{
                  paddingLeft: `${
                    lines[currentLine]?.segments[0]?.indent ? 16 : 0
                  }px`,
                }}
              >
                <motion.div
                  animate={{ opacity: cursorVisible ? 1 : 0 }}
                  className="h-3.5 w-0.5 bg-blue-500"
                  transition={{ duration: 0.1 }}
                />
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ModernLoader;
