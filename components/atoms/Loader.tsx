import React from "react"

function FullScreenLoaderIcon() {
  return (
    <div
      style={{
        background: "rgba(0,0,0,0.5)",
        height: "100vh"
      }}
    >
      <svg viewBox="0 0 100 100">
        <g
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="6"
        >
          <path d="M21 40v19">
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              dur="2s"
              repeatCount="indefinite"
              type="rotate"
              values="0 21 59; 180 21 59"
            ></animateTransform>
          </path>
          <path d="M79 40v19">
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              dur="2s"
              repeatCount="indefinite"
              type="rotate"
              values="0 79 59; -180 79 59"
            ></animateTransform>
          </path>
          <path d="M50 21v19">
            <animate
              attributeName="d"
              dur="2s"
              repeatCount="indefinite"
              values="M 50 21 V 40; M 50 59 V 40"
            ></animate>
          </path>
          <path d="M50 60v19">
            <animate
              attributeName="d"
              dur="2s"
              repeatCount="indefinite"
              values="M 50 60 V 79; M 50 98 V 79"
            ></animate>
          </path>
          <path d="M50 21l29 19-29 20-29-20z">
            <animate
              attributeName="stroke"
              dur="2s"
              repeatCount="indefinite"
              values="rgba(255,255,255,1); rgba(100,100,100,0)"
            ></animate>
          </path>
          <path d="M50 40l29 19-29 20-29-20z"></path>
          <path d="M50 59l29 19-29 20-29-20z">
            <animate
              attributeName="stroke"
              dur="2s"
              repeatCount="indefinite"
              values="rgba(100,100,100,0); rgba(255,255,255,1)"
            ></animate>
          </path>
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            dur="2s"
            repeatCount="indefinite"
            type="translate"
            values="0 0; 0 -19"
          ></animateTransform>
        </g>
      </svg>
    </div>
  )
}

export default FullScreenLoaderIcon
