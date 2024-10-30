import React from 'react'
import LOADING from '../assets/loading.lottie'
import { DotLottieReact } from "@lottiefiles/dotlottie-react";


export const LoadingAnimation = () => {
  return (
    <div className="w-full h-full  flex flex-col justify-center items-center">
    <DotLottieReact className="w-[170px] h-[170px]" src={LOADING} loop autoplay />
    <p className=" font-light">Loading...</p>
    </div>
  )
}
