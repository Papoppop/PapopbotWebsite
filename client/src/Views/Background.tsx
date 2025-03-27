// Background Component will use children prop to render the children components

import { ReactNode } from 'react';

interface BackgroundProps {
  children: ReactNode;
}

const Background = ({ children }: BackgroundProps) => {
  return (
    <div className='bg-gradient-to-t from-[#AEDDFF] to-[#7dc7ff] w-full h-full max-w-full max-h-full overflow-hidden'>
      {children}
    </div>
  )
}

export default Background

