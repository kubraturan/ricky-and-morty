import { SVGProps } from "react";

const IconCaretUp = (props: SVGProps<SVGSVGElement>) => {
  const { width, height, stroke, className } = props;
  return (
    <div className={className}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 21L9 15L12 18L15 21H3Z"
          stroke={stroke}
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default IconCaretUp;
