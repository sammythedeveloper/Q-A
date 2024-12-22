import { twMerge } from "tailwind-merge";

export const Orbit = (props) => {
  return (
    <div className={twMerge("size-[200px]  border border-gray-500 rounded-full", props.className)}></div>
  );
};
