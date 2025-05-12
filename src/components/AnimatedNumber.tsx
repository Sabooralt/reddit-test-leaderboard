"use client";

import { useEffect, useState } from "react";
import { useMotionValue, animate } from "framer-motion";

interface AnimatedNumberProps {
  value: number;
  duration?: number;
}

export const AnimatedNumber = ({
  value,
  duration = 1,
}: AnimatedNumberProps) => {
  const motionValue = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration,
      onUpdate: (latest) => {
        setDisplayValue(Math.floor(latest));
      },
    });

    return controls.stop;
  }, [value, duration, motionValue]);

  return <span>{displayValue.toLocaleString()}</span>;
};
