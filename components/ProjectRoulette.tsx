"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { projects } from "@/lib/projects";

const LAST_INDEX = projects.length - 1;
const PX_PER_CARD = 75;

const OFFSET_X = 18;
const OFFSET_Y = -12;
const SCALE_STEP = 0.06;
const VISIBLE_BEHIND = 3;
const THROW_X = 260;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function cardStyle(offset: number) {
  if (offset < 0) {
    return {
      transform: `translateX(${offset * THROW_X}px) rotate(${offset * 10}deg)`,
      opacity: clamp(1 + offset, 0, 1),
      zIndex: projects.length + 1,
    };
  }
  return {
    transform: `translate(${offset * OFFSET_X}px, ${offset * OFFSET_Y}px) scale(${1 - offset * SCALE_STEP})`,
    opacity: clamp(VISIBLE_BEHIND - offset, 0, 1) * (1 - offset * 0.2),
    zIndex: Math.round(projects.length - offset),
  };
}

export default function ProjectRoulette() {
  const [activeIndex, setActiveIndex] = useState(0);
  const positionRef = useRef(0);
  const settleRef = useRef(false);
  const frameRef = useRef(0);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const dragRef = useRef({ dragging: false, captured: false, pointerId: 0, startX: 0, startPosition: 0, moved: 0 });

  const writeTransforms = () => {
    frameRef.current = 0;
    const transition = settleRef.current
      ? "transform 500ms var(--ease-fluid), opacity 500ms var(--ease-fluid)"
      : "none";
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const style = cardStyle(i - positionRef.current);
      card.style.transition = transition;
      card.style.transform = style.transform;
      card.style.opacity = String(style.opacity);
      card.style.zIndex = String(style.zIndex);
      card.style.pointerEvents = style.opacity < 0.05 ? "none" : "";
    });
    setActiveIndex(clamp(Math.round(positionRef.current), 0, LAST_INDEX));
  };

  const applyPosition = (position: number, settle = false) => {
    positionRef.current = position;
    settleRef.current = settle;
    if (frameRef.current === 0) frameRef.current = requestAnimationFrame(writeTransforms);
  };

  useEffect(() => {
    return () => {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = 0;
    };
  }, []);

  const goTo = (index: number) => {
    applyPosition(clamp(index, 0, LAST_INDEX), true);
  };

  const step = (direction: number) => {
    goTo(Math.round(positionRef.current) + direction);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current = {
      dragging: true,
      captured: false,
      pointerId: e.pointerId,
      startX: e.clientX,
      startPosition: positionRef.current,
      moved: 0,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag.dragging) return;
    const delta = e.clientX - drag.startX;
    drag.moved = Math.abs(delta);
    if (!drag.captured && drag.moved > 6) {
      drag.captured = true;
      e.currentTarget.setPointerCapture(drag.pointerId);
    }
    applyPosition(clamp(drag.startPosition - delta / PX_PER_CARD, 0, LAST_INDEX));
  };

  const handlePointerUp = () => {
    if (!dragRef.current.dragging) return;
    dragRef.current.dragging = false;
    goTo(Math.round(positionRef.current));
    setTimeout(() => {
      dragRef.current.moved = 0;
    }, 0);
  };

  const handlePointerLeave = () => {
    if (!dragRef.current.captured) handlePointerUp();
  };

  const handleCardClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (dragRef.current.moved > 6) {
      e.preventDefault();
    }
  };

  const arrowClass =
    "w-10 h-10 flex items-center justify-center rounded-full border border-secondary/30 text-foreground transition-[border-color,color,opacity] duration-signature ease-signature hover:border-accent hover:text-accent disabled:opacity-30 disabled:pointer-events-none";

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <div className="w-full flex items-center justify-center" style={{ height: 260 }}>
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerLeave}
          onPointerCancel={handlePointerUp}
          className="relative cursor-grab active:cursor-grabbing touch-none"
          style={{ width: 220, height: 220 }}
        >
          {projects.map((project, i) => {
            return (
              <Link
                key={project.slug}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                href={`/projects/${project.slug}`}
                onClick={handleCardClick}
                onDragStart={(e) => e.preventDefault()}
                className="absolute inset-0 flex flex-col justify-center p-5 rounded-2xl border border-secondary/30 bg-background hover:border-accent transition-colors select-none"
                style={{ ...cardStyle(i), transition: "none" }}
              >
                <h3 className="font-display text-base font-semibold text-foreground mb-3">
                  {project.title}
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-xs px-2 py-1 rounded-full bg-secondary/20 text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => step(-1)}
          disabled={activeIndex === 0}
          aria-label="Previous project"
          className={arrowClass}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          disabled={activeIndex === LAST_INDEX}
          aria-label="Next project"
          className={arrowClass}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="flex gap-2">
        {projects.map((project, i) => (
          <span
            key={project.slug}
            className={`w-1.5 h-1.5 rounded-full transition-colors duration-signature ease-signature ${
              i === activeIndex ? "bg-accent" : "bg-secondary/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
