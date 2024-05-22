import { SVGProps } from "react";

const IconClose = (props: SVGProps<SVGSVGElement>) => {
  const { width, height, stroke } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="5 5 14 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 6L6 18"
        stroke={stroke}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 6L18 18"
        stroke={stroke}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export default IconClose;
