import { useLocalStorage } from "./useLocalStorage";

interface TodayTasksState {
  date: string;
  taskIds: string[];
}

function getTodayISO(): string {
  return new Date().toISOString().split("T")[0];
}

export function useTodayTasks() {
  const [state, setState] = useLocalStorage<TodayTasksState>("protanni-today-tasks", {
    date: getTodayISO(),
    taskIds: [],
  });

  const today = getTodayISO();

  // Auto-reset if the stored date isn't today
  const taskIds = state.date === today ? state.taskIds : [];

  const addToToday = (taskId: string) => {
    setState({
      date: today,
      taskIds: [...new Set([...taskIds, taskId])],
    });
  };

  const removeFromToday = (taskId: string) => {
    setState({
      date: today,
      taskIds: taskIds.filter((id) => id !== taskId),
    });
  };

  const isInToday = (taskId: string) => taskIds.includes(taskId);

  return { todayTaskIds: taskIds, addToToday, removeFromToday, isInToday };
}
