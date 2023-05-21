import React from "react"

interface WrapperFullProps {
  children: React.ReactNode;
}

export const WrapperFull: React.FC<WrapperFullProps> = (props: WrapperFullProps) => {
  return (
    <React.Fragment>
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        {props.children}
      </div>
    </React.Fragment>
  )
}