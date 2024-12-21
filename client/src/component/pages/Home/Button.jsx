import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge"; // Ensure merging of classes

// Define base classes with variants using cva
const classes = cva(
  "text-xs tracking-widest uppercase font-bold h-10 px-6 rounded-lg", // Base styles
  {
    variants: {
      block: {
        true: "w-full", // Apply full width when block=true
        false: "",
      },
      variant: {
        primary: "border-gradient",
        secondary: "bg-white text-gray-950",
        tertiary: "bg-gray-800 text-gray-200",
      },
    },
    defaultVariants: {
      variant: "primary",
      block: false, // Default block to false
    },
  }
);

export const Button = ({ className = "", children, block, variant, ...otherProps }) => {
  return (
    <button
      className={twMerge(classes({ variant, block }), className)} // Merge Tailwind classes
      {...otherProps}
    >
      {children}
    </button>
  );
};
