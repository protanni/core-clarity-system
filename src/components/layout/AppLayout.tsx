import { Outlet } from "react-router-dom";
import { BottomNav } from "./BottomNav";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container max-w-lg mx-auto pb-24 pt-safe">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
