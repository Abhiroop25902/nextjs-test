// Thanks to https://github.com/n3r4zzurr0/svg-spinners

type CircularProgressBarProps = {
  color: string;
  heightWidth: number;
  strokeWidth: number;
};

export default function CircularProgressBar(props: CircularProgressBarProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.heightWidth.toString()}
      height={props.heightWidth.toString()}
      stroke={props.color}
      viewBox={`0 0 24 24`}
    >
      <g>
        <circle
          cx="12"
          cy="12"
          r="9.5"
          fill="none"
          strokeWidth={props.strokeWidth.toString()}
          strokeLinecap="round"
        >
          <animate
            attributeName="stroke-dasharray"
            dur="1.5s"
            calcMode="spline"
            values="0 150;42 150;42 150;42 150"
            keyTimes="0;0.475;0.95;1"
            keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-dashoffset"
            dur="1.5s"
            calcMode="spline"
            values="0;-16;-59;-59"
            keyTimes="0;0.475;0.95;1"
            keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
            repeatCount="indefinite"
          />
        </circle>
        <animateTransform
          attributeName="transform"
          type="rotate"
          dur="2s"
          values="0 12 12;360 12 12"
          repeatCount="indefinite"
        />
      </g>
    </svg>
  );
}
