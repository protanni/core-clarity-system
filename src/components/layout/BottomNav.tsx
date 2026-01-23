import { NavLink, useLocation } from "react-router-dom";
import { Home, CheckSquare, Repeat, Circle } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/", label: "Today", icon: Home },
  { path: "/tasks", label: "Tasks", icon: CheckSquare },
  { path: "/habits", label: "Habits", icon: Repeat },
  { path: "/mood", label: "Mood", icon: Circle },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-nav-background border-t border-nav-border pb-safe">
      <div className="container flex items-center justify-around h-16 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className="relative flex flex-col items-center justify-center w-16 h-full"
            >
              <motion.div
                className="flex flex-col items-center gap-1"
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative">
                  <Icon
                    className={cn(
                      "w-5 h-5 transition-colors duration-200",
                      isActive ? "text-nav-active" : "text-nav-inactive"
                    )}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-nav-active"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </div>
                <span
                  className={cn(
                    "text-[10px] font-medium transition-colors duration-200",
                    isActive ? "text-nav-active" : "text-nav-inactive"
                  )}
                >
                  {item.label}
                </span>
              </motion.div>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
