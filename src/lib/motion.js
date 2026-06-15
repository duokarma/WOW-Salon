export const ease = [0.22, 1, 0.36, 1];

export const spring = { type: 'spring', stiffness: 400, damping: 28 };



export const cardHover = {
  rest: { y: 0 },
  hover: { y: -8, transition: { duration: 0.35, ease } },
  tap: { scale: 0.98 },
};



export const tabContent = {
  initial: { opacity: 0, x: 32 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.45, ease } },
  exit: { opacity: 0, x: -32, transition: { duration: 0.3, ease } },
};

export const navItem = {
  rest: { y: 0 },
  hover: { y: -2, transition: { duration: 0.2, ease } },
};
