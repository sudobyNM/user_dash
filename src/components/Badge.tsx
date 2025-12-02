import clsx from "clsx";


interface BadgeProps {
label: string;
variant?: "active" | "inactive";
className?: string;
}


export default function Badge({ label, variant = "active", className }: BadgeProps) {
const colors = {
active:
"bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200 border-green-300 dark:border-green-700",
inactive:
"bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200 border-red-300 dark:border-red-700",
};


return (
<span
className={clsx(
"px-2 py-1 text-xs rounded border font-medium",
colors[variant],
className
)}
>
{label}
</span>
);
}