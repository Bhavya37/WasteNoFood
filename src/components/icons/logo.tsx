import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="M16.24 7.76c-.24-.24-.58-.38-.94-.38-1.5 0-2.5 1-2.5 2.5v.5c0 .55.45 1 1 1h2.5c.55 0 1-.45 1-1v-.5c0-1.5-1-2.5-2.5-2.5z" />
      <path d="M7.76 16.24c.24.24.58.38.94.38 1.5 0 2.5-1 2.5-2.5v-.5c0-.55-.45-1-1-1H7.2c-.55 0-1 .45-1 1v.5c0 1.5 1 2.5 2.5 2.5z" />
      <path d="M12 12h.01" />
    </svg>
  );
}
