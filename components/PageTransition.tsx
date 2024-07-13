"use client";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const pathName = usePathname();
  return (
    <AnimatePresence>
      <div key={pathName}>
        <motion.div
          initial={{ opacity: 1 }}
          animate={{
            opacity: 0,
            transition: { delay: 1, duration: 0.4, ease: "easeInOut" },
          }}
          className="w-screen h-screen top-0 fixed bg-yellow-600 pointer-events-none"
        />
        {children}
      </div>
    </AnimatePresence>
  );
};

export default PageTransition;
