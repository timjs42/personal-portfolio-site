"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { projects } from "@/lib/projects";

const ARC_STEP = 32;
const MAX_ROTATION = ARC_STEP * (projects.length - 1);
const RADIUS = 240;
const DRAG_SENSITIVITY = 0.35;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function ProjectRoulette() {
  const [rotation, setRotation] = useState(0);
  const [settling, setSettling] = useState(false);
  const rotationRef = useRef(0);
  const dragRef = useRef({ dragging: false, captured: false, pointerId: 0, startX: 0, startRotation: 0, moved: 0 });

  const applyRotation = (deg: number) => {
    rotationRef.current = deg;
    setRotation(deg);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setSettling(false);
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
    setSettling(true);
    applyRotation(nearest);
    setTimeout(() => {
      dragRef.current.moved = 0;
    }, 0);
  };

  const handleCardClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (dragRef.current.moved > 6) {
      e.preventDefault();
    }
  };

  const activeIndex = clamp(Math.round(-rotation / ARC_STEP), 0, projects.length - 1);

  return (
    <div className="w-full flex flex-col items-center gap-8">
      <div className="[perspective:1100px] w-full flex items-center justify-center" style={{ height: 260 }}>
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
            const angle = i * ARC_STEP + rotation;
            return (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                onClick={handleCardClick}
                onDragStart={(e) => e.preventDefault()}
                className="absolute inset-0 flex flex-col justify-center p-5 rounded-2xl border border-secondary/30 bg-background/90 hover:border-accent transition-colors select-none"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${RADIUS}px) rotateY(${-angle}deg)`,
                  transition: settling ? "transform 500ms var(--ease-fluid)" : "none",
                }}
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
