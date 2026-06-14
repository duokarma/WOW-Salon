export const ease = [0.22, 1, 0.36, 1];

export const spring = { type: 'spring', stiffness: 400, damping: 28 };

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease },
  }),
};

export const slideUp = {
  hidden: { y: '110%' },
  visible: (i = 0) => ({
    y: 0,
    transition: { delay: 0.35 + i * 0.12, duration: 0.7, ease },
  }),
};

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

export const cardHover = {
  rest: { y: 0 },
  hover: { y: -8, transition: { duration: 0.35, ease } },
  tap: { scale: 0.98 },
};

export const imageHover = {
  rest: { scale: 1 },
  hover: { scale: 1.08, transition: { duration: 0.5, ease } },
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
