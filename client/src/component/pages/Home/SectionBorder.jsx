import { twMerge } from "tailwind-merge";

export const SectionBorder = (props) => {
  return (
    <div
      className={twMerge('border-l border-r border-[var(--color-border)]', props.className)}
      {...props}
    />
  );
};
