"use client";

import { useEffect, useRef } from "react";
import { THEME_COLORS } from "@/lib/theme";

const COLS = 20;
const ROWS = 20;
const CELL = 20;
const WIDTH = COLS * CELL;
const HEIGHT = ROWS * CELL;
const TICK_START_MS = 130;
const TICK_MIN_MS = 70;
const TICK_STEP_MS = 3;

type GameState = "idle" | "playing" | "gameover";
type Point = { x: number; y: number };

function randomEmptyCell(snake: Point[]): Point {
  let cell: Point;
  do {
    cell = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
  } while (snake.some((s) => s.x === cell.x && s.y === cell.y));
  return cell;
}

export default function NotFoundGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = WIDTH * dpr;
    canvas.height = HEIGHT * dpr;
    ctx.scale(dpr, dpr);

    let state: GameState = "idle";
    let snake: Point[] = [];
    let direction: Point = { x: 1, y: 0 };
    let nextDirection: Point = direction;
    let food: Point = { x: 0, y: 0 };
    let score = 0;
    let tickInterval = TICK_START_MS;
    let lastTick = 0;
    let animationFrame: number;
    let touchStart: Point | null = null;

    function resetGame() {
      snake = [
        { x: 8, y: 10 },
        { x: 7, y: 10 },
        { x: 6, y: 10 },
      ];
      direction = { x: 1, y: 0 };
      nextDirection = direction;
      food = randomEmptyCell(snake);
      score = 0;
      tickInterval = TICK_START_MS;
      lastTick = 0;
      state = "playing";
    }

    function setDirection(dx: number, dy: number) {
      if (state === "idle" || state === "gameover") {
        resetGame();
        return;
      }
      if (direction.x === -dx && direction.y === -dy) return;
      nextDirection = { x: dx, y: dy };
    }

    function handleAction() {
      if (state === "idle" || state === "gameover") {
        resetGame();
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      switch (e.code) {
        case "ArrowUp":
        case "KeyW":
          e.preventDefault();
          setDirection(0, -1);
          break;
        case "ArrowDown":
        case "KeyS":
          e.preventDefault();
          setDirection(0, 1);
          break;
        case "ArrowLeft":
        case "KeyA":
          e.preventDefault();
          setDirection(-1, 0);
          break;
        case "ArrowRight":
        case "KeyD":
          e.preventDefault();
          setDirection(1, 0);
          break;
        case "Space":
          e.preventDefault();
          handleAction();
          break;
      }
    }

    function handlePointerDown(e: PointerEvent) {
      const rect = canvas.getBoundingClientRect();
      touchStart = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      handleAction();
    }

    function handlePointerUp(e: PointerEvent) {
      if (!touchStart) return;
      const rect = canvas.getBoundingClientRect();
      const dx = e.clientX - rect.left - touchStart.x;
      const dy = e.clientY - rect.top - touchStart.y;
      touchStart = null;
      if (Math.abs(dx) < 20 && Math.abs(dy) < 20) return;
      if (Math.abs(dx) > Math.abs(dy)) {
        setDirection(dx > 0 ? 1 : -1, 0);
      } else {
        setDirection(0, dy > 0 ? 1 : -1);
      }
    }

    function update() {
      direction = nextDirection;
      const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

      const hitWall = head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS;
      const hitSelf = snake.some((s) => s.x === head.x && s.y === head.y);
      if (hitWall || hitSelf) {
        state = "gameover";
        return;
      }

      snake.unshift(head);
      if (head.x === food.x && head.y === food.y) {
        score += 1;
        tickInterval = Math.max(TICK_MIN_MS, tickInterval - TICK_STEP_MS);
        food = randomEmptyCell(snake);
      } else {
        snake.pop();
      }
    }

    function draw() {
      ctx.fillStyle = THEME_COLORS.background;
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      ctx.fillStyle = THEME_COLORS.accent;
      ctx.beginPath();
      ctx.arc(food.x * CELL + CELL / 2, food.y * CELL + CELL / 2, CELL / 3, 0, Math.PI * 2);
      ctx.fill();

      snake.forEach((segment, i) => {
        ctx.fillStyle = i === 0 ? THEME_COLORS.foreground : THEME_COLORS.primary;
        ctx.beginPath();
        ctx.roundRect(segment.x * CELL + 1, segment.y * CELL + 1, CELL - 2, CELL - 2, 4);
        ctx.fill();
      });

      ctx.fillStyle = THEME_COLORS.foreground;
      ctx.font = "16px monospace";
      ctx.textAlign = "right";
      ctx.fillText(String(score).padStart(3, "0"), WIDTH - 10, 22);

      ctx.textAlign = "center";
      if (state === "idle") {
        ctx.fillText("Press Space (or tap) to play", WIDTH / 2, HEIGHT / 2);
      } else if (state === "gameover") {
        ctx.fillText(`Game over — score ${score}`, WIDTH / 2, HEIGHT / 2 - 10);
        ctx.fillText("Press Space (or tap) to retry", WIDTH / 2, HEIGHT / 2 + 14);
      }
    }

    function loop(timestamp: number) {
      if (state === "playing") {
        if (timestamp - lastTick >= tickInterval) {
          lastTick = timestamp;
          update();
        }
      }
      draw();
      animationFrame = requestAnimationFrame(loop);
    }

    draw();
    animationFrame = requestAnimationFrame(loop);

    window.addEventListener("keydown", handleKeyDown);
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerup", handlePointerUp);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("keydown", handleKeyDown);
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", handlePointerUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-label="A small snake game — press space or tap to play, arrow keys or swipe to steer"
      style={{ width: "100%", maxWidth: WIDTH, aspectRatio: `${WIDTH} / ${HEIGHT}` }}
      className="rounded-2xl border border-secondary/30 touch-none cursor-pointer"
    />
  );
}
