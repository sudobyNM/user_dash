import React from "react";
import clsx from "clsx";

interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (row: T) => React.ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  className?: string;
}

export default function Table<T>({ columns, data, className }: TableProps<T>) {
  return (
    <div
      className={clsx(
        "w-full overflow-x-auto rounded-xl border border-ui-border dark:border-[var(--border)] bg-ui-card dark:bg-[var(--card)]",
        "scrollbar-thin", // nicer scrolling
        className
      )}
    >
      {/* FIX 1: w-max ensures table doesn't shrink and crop columns */}
      <table className="min-w-full w-max border-collapse text-sm">
        <thead>
          <tr className="bg-ui-card dark:bg-[var(--card)]">
            {columns.map((col) => (
              <th
                key={col.key as string}
                className="text-left px-4 py-3 text-xs font-semibold tracking-wide 
                  text-ui-textLight uppercase border-b border-ui-border 
                  dark:border-[var(--border)] dark:text-[var(--text-light)] whitespace-nowrap"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              className="odd:bg-ui-card even:bg-ui-card dark:odd:bg-[var(--card)] 
                dark:even:bg-[var(--card)] hover:bg-gray-50 dark:hover:bg-gray-800/40
                transition-colors"
            >
              {columns.map((col) => (
                <td
                  key={col.key as string}
                  className="px-4 py-3 border-b border-ui-border dark:border-[var(--border)] 
                    text-ui-text dark:text-[var(--text)] whitespace-nowrap"
                >
                  {col.render ? col.render(row) : (row as any)[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
