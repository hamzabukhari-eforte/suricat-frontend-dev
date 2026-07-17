"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

const AUTOPLAY_MS = 4000;
const MOBILE_MAX_WIDTH = 1023;
const DRAG_THRESHOLD_RATIO = 0.12;
const DRAG_START_PX = 6;

type MobileAutoplayCardSliderProps = {
  children: ReactNode[];
  gridClassName?: string;
  id?: string;
};

export function MobileAutoplayCardSlider({
  children,
  gridClassName = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 px-4 py-2",
  id,
}: MobileAutoplayCardSliderProps) {
  const [active, setActive] = useState(0);
  const [isSlider, setIsSlider] = useState(
    () => typeof window !== "undefined" && window.innerWidth <= MOBILE_MAX_WIDTH,
  );
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const pausedRef = useRef(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const dragStartXRef = useRef(0);
  const dragStartedRef = useRef(false);
  const dragSessionRef = useRef(false);
  const count = children.length;
  const safeActive = count > 0 ? Math.min(active, count - 1) : 0;

  useEffect(() => {
    activeRef.current = safeActive;
  }, [safeActive]);

  useEffect(() => {
    const onResize = () => {
      setIsSlider(window.innerWidth <= MOBILE_MAX_WIDTH);
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!isSlider || count <= 1) return;

    const timer = window.setInterval(() => {
      if (!pausedRef.current && !dragSessionRef.current) {
        setActive((index) => (index + 1) % count);
      }
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [isSlider, count]);

  const pause = () => {
    pausedRef.current = true;
  };

  const resume = () => {
    pausedRef.current = false;
  };

  const clampDragOffset = (delta: number, width: number, current: number) => {
    if (current === 0 && delta > 0) return delta * 0.35;
    if (current === count - 1 && delta < 0) return delta * 0.35;
    return Math.max(-width * 0.45, Math.min(width * 0.45, delta));
  };

  const endDragSession = (clientX: number) => {
    if (!dragSessionRef.current || !trackRef.current) return;

    const width = trackRef.current.offsetWidth;
    const delta = clientX - dragStartXRef.current;
    const threshold = width * DRAG_THRESHOLD_RATIO;
    const wasDragging = dragStartedRef.current;
    const current = activeRef.current;

    dragSessionRef.current = false;
    dragStartedRef.current = false;
    setIsDragging(false);
    setDragOffset(0);
    resume();

    if (!wasDragging) return;

    if (delta < -threshold && current < count - 1) {
      setActive(current + 1);
    } else if (delta > threshold && current > 0) {
      setActive(current - 1);
    }
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isSlider || count <= 1 || event.button !== 0) return;

    dragSessionRef.current = true;
    dragStartedRef.current = false;
    dragStartXRef.current = event.clientX;
    setIsDragging(false);
    setDragOffset(0);
    pause();

    const onPointerMove = (moveEvent: PointerEvent) => {
      if (!dragSessionRef.current || !trackRef.current) return;

      const width = trackRef.current.offsetWidth;
      const delta = moveEvent.clientX - dragStartXRef.current;

      if (!dragStartedRef.current) {
        if (Math.abs(delta) < DRAG_START_PX) return;
        dragStartedRef.current = true;
        setIsDragging(true);
      }

      setDragOffset(clampDragOffset(delta, width, activeRef.current));
    };

    const onPointerEnd = (endEvent: PointerEvent) => {
      endDragSession(endEvent.clientX);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerEnd);
      window.removeEventListener("pointercancel", onPointerEnd);
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerEnd);
    window.addEventListener("pointercancel", onPointerEnd);
  };

  if (!isSlider) {
    return (
      <div id={id} className={gridClassName}>
        {children}
      </div>
    );
  }

  return (
    <div
      id={id}
      className="relative px-4 py-2"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
    >
      <div
        ref={trackRef}
        className="overflow-hidden"
        onPointerDown={onPointerDown}
        style={{ touchAction: "pan-y pinch-zoom" }}
      >
        <div
          className={`flex ${isDragging ? "" : "transition-transform duration-500 ease-in-out"}`}
          style={{
            transform: `translateX(calc(-${safeActive * 100}% + ${dragOffset}px))`,
            cursor: isDragging ? "grabbing" : "grab",
          }}
        >
          {children.map((child, index) => (
            <div
              key={index}
              className={`w-full shrink-0 ${isDragging ? "select-none" : ""}`}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex justify-center gap-2">
        {children.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Go to card ${index + 1}`}
            aria-current={index === safeActive ? "true" : undefined}
            className={`h-2 rounded-full transition-all ${
              index === safeActive ? "w-6 bg-teal" : "w-2 bg-white/40"
            }`}
            onClick={() => setActive(index)}
          />
        ))}
      </div>
    </div>
  );
}
