import { useState, useRef, useEffect } from "react";
import { ChevronRight, Sparkles, MoreVertical, Sun } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { AreaTag } from "@/components/shared/AreaTag";
import { cn } from "@/lib/utils";
import type { LifeArea } from "@/types";

export interface SmartTask {
  id: string;
  text: string;
  completed: boolean;
  area?: LifeArea;
  children?: SmartTask[];
}

interface SmartTaskRowProps {
  task: SmartTask;
  depth?: number;
  onMenuOpen?: (taskId: string | null) => void;
  openMenuId?: string | null;
}

const MAX_VISUAL_DEPTH = 2;
const INDENT_PX = 24;

export function SmartTaskRow({
  task,
  depth = 0,
  onMenuOpen,
  openMenuId,
}: SmartTaskRowProps) {
  const [expanded, setExpanded] = useState(depth < 2);
  const [checked, setChecked] = useState(task.completed);
  const menuRef = useRef<HTMLDivElement>(null);

  const hasChildren = task.children && task.children.length > 0;
  const visualDepth = Math.min(depth, MAX_VISUAL_DEPTH);
  const indent = visualDepth * INDENT_PX;
  const isMenuOpen = openMenuId === task.id;

  // Count all nested children for collapsed indicator
  const countAllChildren = (t: SmartTask): number => {
    if (!t.children) return 0;
    return t.children.reduce((sum, c) => sum + 1 + countAllChildren(c), 0);
  };

  // Close menu on outside click
  useEffect(() => {
    if (!isMenuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onMenuOpen?.(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isMenuOpen, onMenuOpen]);

  // Deep nesting: if depth >= 3 and has children, show collapsed group
  const isDeepNested = depth >= 3 && hasChildren;
  const hiddenCount = isDeepNested ? countAllChildren(task) : 0;

  return (
    <>
      {/* Task row */}
      <div
        className={cn(
          "group relative flex items-center gap-0 pr-2 transition-colors",
          "hover:bg-accent/40",
          checked && "opacity-50"
        )}
        style={{ paddingLeft: `${indent + 12}px` }}
      >
        {/* Left cluster: Caret + Checkbox */}
        <div className="flex items-center gap-1 shrink-0 py-2.5">
          {/* Caret */}
          <button
            onClick={() => hasChildren && setExpanded(!expanded)}
            className={cn(
              "w-5 h-5 flex items-center justify-center rounded transition-transform",
              hasChildren
                ? "text-muted-foreground hover:text-foreground"
                : "invisible"
            )}
          >
            <ChevronRight
              className={cn(
                "w-3.5 h-3.5 transition-transform duration-150",
                expanded && "rotate-90"
              )}
            />
          </button>

          {/* Checkbox */}
          <Checkbox
            checked={checked}
            onCheckedChange={() => setChecked(!checked)}
            className={cn(
              "h-[18px] w-[18px] rounded-full border-2 transition-colors shrink-0",
              checked
                ? "border-primary bg-primary data-[state=checked]:bg-primary"
                : "border-muted-foreground/30 hover:border-primary/50"
            )}
          />
        </div>

        {/* Title + Label */}
        <div className="flex-1 min-w-0 flex items-center gap-2 py-2.5 pl-2">
          <span
            className={cn(
              "text-sm leading-snug transition-colors",
              checked
                ? "text-muted-foreground line-through"
                : "text-foreground",
              "line-clamp-2"
            )}
          >
            {task.text}
          </span>
          {task.area && task.area !== "all" && (
            <AreaTag area={task.area} className="shrink-0" />
          )}
        </div>

        {/* Right cluster: Sparkle + Kebab */}
        <div className="flex items-center gap-0.5 shrink-0">
          {/* Sparkle — hidden by default, visible on hover */}
          <button
            className={cn(
              "p-1.5 rounded-md text-muted-foreground/50 hover:text-primary hover:bg-primary/10 transition-all",
              "opacity-0 group-hover:opacity-100 focus:opacity-100"
            )}
            title="Smart Subtasks"
          >
            <Sparkles className="w-3.5 h-3.5" />
          </button>

          {/* Kebab */}
          <div className="relative" ref={isMenuOpen ? menuRef : undefined}>
            <button
              onClick={() => onMenuOpen?.(isMenuOpen ? null : task.id)}
              className={cn(
                "p-1.5 rounded-md text-muted-foreground/50 hover:text-foreground hover:bg-muted transition-all",
                "opacity-0 group-hover:opacity-100 focus:opacity-100",
                isMenuOpen && "opacity-100 text-foreground bg-muted"
              )}
            >
              <MoreVertical className="w-3.5 h-3.5" />
            </button>

            {/* Menu dropdown */}
            {isMenuOpen && (
              <div
                ref={menuRef}
                className="absolute right-0 top-full mt-1 z-50 w-44 rounded-lg border border-border bg-popover text-popover-foreground shadow-lg py-1"
              >
                {[
                  { label: "Add to Today", icon: Sun },
                  { label: "Edit" },
                  { label: "Add subtask" },
                  { label: "Clear subtasks" },
                  { label: "Remove", destructive: true },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => onMenuOpen?.(null)}
                    className={cn(
                      "w-full text-left px-3 py-2 text-sm flex items-center gap-2 transition-colors",
                      "hover:bg-accent",
                      item.destructive
                        ? "text-destructive hover:bg-destructive/10"
                        : "text-popover-foreground"
                    )}
                  >
                    {item.icon && <item.icon className="w-3.5 h-3.5" />}
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Children */}
      {hasChildren && expanded && !isDeepNested && (
        <div>
          {task.children!.map((child) => (
            <SmartTaskRow
              key={child.id}
              task={child}
              depth={depth + 1}
              onMenuOpen={onMenuOpen}
              openMenuId={openMenuId}
            />
          ))}
        </div>
      )}

      {/* Deep nesting collapsed indicator */}
      {hasChildren && expanded && isDeepNested && (
        <div
          className="flex items-center gap-2 py-2 text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
          style={{ paddingLeft: `${indent + INDENT_PX + 12}px` }}
          onClick={() => setExpanded(!expanded)}
        >
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-muted/60 border border-border/50">
            <ChevronRight className="w-3 h-3" />
            <span>{hiddenCount} subtask{hiddenCount !== 1 ? "s" : ""}</span>
          </div>
        </div>
      )}

      {/* Collapsed indicator for non-deep */}
      {hasChildren && !expanded && (
        <div
          className="flex items-center py-1 text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
          style={{ paddingLeft: `${indent + INDENT_PX + 12 + 24}px` }}
          onClick={() => setExpanded(true)}
        >
          <span className="px-2 py-0.5 rounded bg-muted/50 text-[10px] font-medium">
            {countAllChildren(task)} subtask{countAllChildren(task) !== 1 ? "s" : ""}
          </span>
        </div>
      )}
    </>
  );
}
