import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Task, LifeArea } from "@/types";
import { TaskItem } from "@/components/tasks/TaskItem";
import { AreaTabs } from "@/components/shared/AreaTabs";
import { Input } from "@/components/ui/input";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
};

export default function TasksPage() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("protanni-tasks", []);
  const [newTaskText, setNewTaskText] = useState("");
  const [selectedArea, setSelectedArea] = useState<LifeArea>("all");

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      text: newTaskText.trim(),
      completed: false,
      area: selectedArea === "all" ? undefined : selectedArea,
      createdAt: new Date().toISOString(),
    };

    setTasks((prev) => [...prev, newTask]);
    setNewTaskText("");
  };

  const handleToggle = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleDelete = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  // Filter tasks by selected area
  const filteredTasks = useMemo(() => {
    if (selectedArea === "all") return tasks;
    return tasks.filter((t) => t.area === selectedArea);
  }, [tasks, selectedArea]);

  const incompleteTasks = filteredTasks.filter((t) => !t.completed);
  const completedTasks = filteredTasks.filter((t) => t.completed);

  // Total counts for header
  const totalIncomplete = tasks.filter((t) => !t.completed).length;
  const totalCompleted = tasks.filter((t) => t.completed).length;

  return (
    <div className="px-1 py-6 space-y-6">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-1"
      >
        <h1 className="text-2xl font-semibold text-foreground">Tasks</h1>
        <p className="text-sm text-muted-foreground">
          {totalIncomplete} open · {totalCompleted} completed
        </p>
      </motion.header>

      {/* Area Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <AreaTabs selectedArea={selectedArea} onAreaChange={setSelectedArea} />
      </motion.div>

      {/* Add Task */}
      <motion.form
        onSubmit={handleAddTask}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative"
      >
        <Input
          type="text"
          placeholder={selectedArea === "all" ? "Add a new task..." : `Add a ${selectedArea} task...`}
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          className="pr-10 bg-card border-border/50 shadow-card"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </motion.form>

      {/* Task List */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-4"
      >
        {/* Open Tasks */}
        {incompleteTasks.length > 0 && (
          <motion.div
            variants={item}
            className="bg-card rounded-xl shadow-card border border-border/50 divide-y divide-border/50"
          >
            {incompleteTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={() => handleToggle(task.id)}
                onDelete={() => handleDelete(task.id)}
                showDelete
                showArea={selectedArea === "all"}
              />
            ))}
          </motion.div>
        )}

        {/* Completed Tasks */}
        {completedTasks.length > 0 && (
          <motion.div variants={item} className="space-y-2">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide px-1">
              Completed
            </h3>
            <div className="bg-card/60 rounded-xl border border-border/30 divide-y divide-border/30">
              {completedTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={() => handleToggle(task.id)}
                  onDelete={() => handleDelete(task.id)}
                  showDelete
                  showArea={selectedArea === "all"}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {filteredTasks.length === 0 && (
          <motion.div
            variants={item}
            className="text-center py-12"
          >
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Plus className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-sm">
              {selectedArea === "all" 
                ? "No tasks yet. Add one above."
                : `No ${selectedArea} tasks yet.`}
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
