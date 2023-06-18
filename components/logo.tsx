import React, { SVGProps } from "react"

export default function Logo({
  width,
  height,
}: {
  width?: number
  height?: number
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="400"
        height="400"
        rx="100"
        fill="black"
        className="dark:fill-white"
      />
      <path
        d="M220.825 122.935L220.825 277.366C311.487 282.6 338.064 218.627 334.726 122.935H220.825Z"
        stroke="white"
        className="dark:stroke-black"
        strokeWidth="25"
        strokeLinejoin="round"
      />
      <path
        d="M180.296 195.609L180.296 277.905C89.2959 280.695 62.62 246.603 65.9706 195.609L180.296 195.609Z"
        stroke="white"
        className="dark:stroke-black"
        strokeWidth="25"
        strokeLinejoin="round"
      />
    </svg>
  )
}
