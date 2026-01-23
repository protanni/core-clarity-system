import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CreditCard, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export default function AccountPage() {
  const navigate = useNavigate();

  const handleManagePlan = () => {
    navigate("/pricing");
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="px-5 py-8 space-y-6">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {/* Header */}
        <motion.div variants={item} className="space-y-1">
          <h1 className="text-2xl font-semibold text-foreground">Account</h1>
          <p className="text-sm text-muted-foreground">
            Manage your subscription and profile
          </p>
        </motion.div>

        {/* Subscription Card */}
        <motion.div
          variants={item}
          className="bg-card rounded-2xl p-5 shadow-card border border-border/50 space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-primary" />
            </div>
            <h2 className="text-base font-medium text-foreground">Subscription</h2>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Status</span>
              <span className="text-sm font-medium text-foreground bg-primary/10 px-2.5 py-0.5 rounded-full">
                Trial
              </span>
            </div>
            
            <Button
              variant="outline"
              className="w-full"
              onClick={handleManagePlan}
            >
              Manage plan
            </Button>
          </div>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          variants={item}
          className="bg-card rounded-2xl p-5 shadow-card border border-border/50 space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-4 h-4 text-primary" />
            </div>
            <h2 className="text-base font-medium text-foreground">Profile</h2>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Email</span>
            <span className="text-sm text-foreground">user@email.com</span>
          </div>
        </motion.div>

        {/* Logout */}
        <motion.div variants={item}>
          <Button
            variant="ghost"
            className="w-full text-muted-foreground hover:text-foreground"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Log out
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
