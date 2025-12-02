import React from "react";
import clsx from "clsx";


interface CardProps {
children: React.ReactNode;
className?: string;
}


export default function Card({ children, className }: CardProps) {
return (
<div
className={clsx(
"py-8 px-6 bg-ui-card dark:bg-[var(--card)] rounded-xl border border-ui-border dark:border-[var(--border)] shadow-card",
className
)}
>
{children}
</div>
);
}