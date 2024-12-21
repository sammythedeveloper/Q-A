import { cva } from "class-variance-authority";

const classes = cva(
  "bg-gradient-to-b from-white to-gray-950 size-8 rounded-full",
  {
    variants: {
      size: {
        sm: "size-8",
        md: "size-12",
        lg: "size-16",
      },
      color: {
        white: "from-white",
        blue: "from-blue-400",
        green: "from-green-400",
        orange: "from-orange-400",
      },
    },
    defaultVariants: {
      size: "lg",
      color: "blue", // Default block to false
    },
  }
);

export const Planet = ({ size = "lg", color = "blue", className = "", ...props }) => {
  return (
    <div
      className={classes({
        size,
        color,
        className,
      })}
      {...props}
    ></div>
  );
};
