"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { projects } from "@/lib/projects";

const ARC_STEP = 26;
const MAX_ROTATION = ARC_STEP * (projects.length - 1);
const RADIUS = 170;
const DRAG_SENSITIVITY = 0.35;
const MIDDLE_INDEX = Math.floor((projects.length - 1) / 2);

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function cardTransform(angle: number) {
  return `rotateY(${angle}deg) translateZ(${RADIUS}px) rotateY(${-angle}deg)`;
}

function activeIndexFor(rotation: number) {
  return clamp(Math.round(-rotation / ARC_STEP), 0, projects.length - 1);
}

export default function ProjectRoulette() {
  const [activeIndex, setActiveIndex] = useState(0);
  const rotationRef = useRef(0);
  const settleRef = useRef(false);
  const frameRef = useRef(0);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const dragRef = useRef({ dragging: false, captured: false, pointerId: 0, startX: 0, startRotation: 0, moved: 0 });

  const writeTransforms = () => {
    frameRef.current = 0;
    const transition = settleRef.current ? "transform 500ms var(--ease-fluid)" : "none";
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      card.style.transition = transition;
      card.style.transform = cardTransform(i * ARC_STEP + rotationRef.current);
    });
    setActiveIndex(activeIndexFor(rotationRef.current));
  };

  const applyRotation = (deg: number, settle = false) => {
    rotationRef.current = deg;
    settleRef.current = settle;
    if (frameRef.current === 0) frameRef.current = requestAnimationFrame(writeTransforms);
  };

  useEffect(() => {
    if (window.matchMedia("(max-width: 1023px)").matches) {
      applyRotation(-MIDDLE_INDEX * ARC_STEP);
    }
    return () => {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = 0;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current = {
      dragging: true,
      captured: false,
      pointerId: e.pointerId,
      startX: e.clientX,
      startRotation: rotationRef.current,
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
    applyRotation(clamp(drag.startRotation + delta * DRAG_SENSITIVITY, -MAX_ROTATION, 0));
  };

  const handlePointerUp = () => {
    if (!dragRef.current.dragging) return;
    dragRef.current.dragging = false;
    const nearest = clamp(Math.round(rotationRef.current / ARC_STEP) * ARC_STEP, -MAX_ROTATION, 0);
    applyRotation(nearest, true);
    setTimeout(() => {
      dragRef.current.moved = 0;
    }, 0);
  };

  const handleCardClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (dragRef.current.moved > 6) {
      e.preventDefault();
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-8">
      <div className="[perspective:1100px] w-full overflow-hidden flex items-center justify-center" style={{ height: 260 }}>
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="relative [transform-style:preserve-3d] cursor-grab active:cursor-grabbing touch-none"
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
                className="absolute inset-0 flex flex-col justify-center p-5 rounded-2xl border border-secondary/30 bg-background/90 hover:border-accent transition-colors select-none"
                style={{ transform: cardTransform(i * ARC_STEP), transition: "none" }}
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
