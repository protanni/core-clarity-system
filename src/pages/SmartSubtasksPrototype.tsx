import { useState } from "react";
import { motion } from "framer-motion";
import { SmartTaskRow, SmartTask } from "@/components/tasks/SmartTaskRow";

// Mock data demonstrating all visual states
const mockTasks: SmartTask[] = [
  {
    id: "1",
    text: "Finalize Q2 strategy presentation",
    completed: false,
    area: "work",
    children: [
      {
        id: "1-1",
        text: "Review competitor analysis data and compile key insights for the executive summary section",
        completed: false,
        area: "work",
      },
      {
        id: "1-2",
        text: "Create slide deck outline",
        completed: true,
        area: "work",
      },
      {
        id: "1-3",
        text: "Prepare financial projections",
        completed: false,
        area: "work",
        children: [
          {
            id: "1-3-1",
            text: "Gather revenue data from analytics dashboard",
            completed: false,
          },
          {
            id: "1-3-2",
            text: "Build forecast model",
            completed: false,
            children: [
              {
                id: "1-3-2-1",
                text: "Define assumptions for growth scenarios including best case, worst case, and expected outcomes for each product line",
                completed: false,
              },
              {
                id: "1-3-2-2",
                text: "Validate with finance team",
                completed: false,
                children: [
                  {
                    id: "1-3-2-2-1",
                    text: "Schedule review meeting",
                    completed: false,
                  },
                  {
                    id: "1-3-2-2-2",
                    text: "Prepare supporting documents",
                    completed: false,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "2",
    text: "Morning meditation routine",
    completed: true,
    area: "mind",
  },
  {
    id: "3",
    text: "Plan weekend hike with friends — research trails, check weather, and coordinate timing with everyone in the group chat",
    completed: false,
    area: "relationships",
    children: [
      {
        id: "3-1",
        text: "Research trail options",
        completed: false,
      },
      {
        id: "3-2",
        text: "Send poll in group chat",
        completed: false,
        area: "relationships",
      },
    ],
  },
  {
    id: "4",
    text: "Read 30 pages of current book",
    completed: false,
    area: "personal",
  },
  {
    id: "5",
    text: "Upper body workout",
    completed: false,
    area: "body",
    children: [
      {
        id: "5-1",
        text: "Warm-up stretches",
        completed: true,
        area: "body",
      },
      {
        id: "5-2",
        text: "Main workout set",
        completed: false,
        area: "body",
      },
      {
        id: "5-3",
        text: "Cool down and foam rolling",
        completed: false,
        area: "body",
      },
    ],
  },
  {
    id: "6",
    text: "Write weekly reflection for the team newsletter and include key learnings from sprint retrospective",
    completed: false,
    area: "work",
  },
];

export default function SmartSubtasksPrototype() {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  return (
    <div className="px-1 py-6 space-y-6">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-1"
      >
        <h1 className="text-2xl font-semibold text-foreground">Smart Subtasks</h1>
        <p className="text-xs text-muted-foreground">
          Visual prototype — hover rows for actions
        </p>
      </motion.header>

      {/* Task list */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="bg-card rounded-xl shadow-card border border-border/50 divide-y divide-border/30 overflow-hidden"
      >
        {mockTasks.map((task) => (
          <SmartTaskRow
            key={task.id}
            task={task}
            onMenuOpen={setOpenMenuId}
            openMenuId={openMenuId}
          />
        ))}
      </motion.div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-3 px-1"
      >
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Prototype states
        </h3>
        <div className="grid grid-cols-2 gap-2 text-[11px] text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary" />
            Hover to reveal sparkle + kebab
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
            Caret shows only with children
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent" />
            Indent clamps at depth 3
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-muted" />
            Deep nests show collapsed group
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-foreground/50" />
            Title clamped to 2 lines
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-destructive/50" />
            Menu is opaque and elevated
          </div>
        </div>
      </motion.div>
    </div>
  );
}
