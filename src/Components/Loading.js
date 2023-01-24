import React from "react";
import styled, { keyframes } from "styled-components";
import { SpinnerIos } from "@styled-icons/fluentui-system-regular/SpinnerIos";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const SpinningIcon = styled(SpinnerIos)`
  animation: 1s linear ${spin} infinite;
  color: grey !important;
`;

function Loading() {
  return (
    <div className="flex justify-center w-full h-[60vh] items-center">
      <SpinningIcon size={50} />
    </div>
  );
}

export default Loading;
