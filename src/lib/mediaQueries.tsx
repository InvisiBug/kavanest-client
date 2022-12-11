//* Sizes from here
// https://tailwindcss.com/docs/breakpoints

const breakpoints: ObjectType = {
  small: 500,
  medium: 768,
  large: 1000,
};

export const mq = (n: any) => {
  const bpArray = Object.keys(breakpoints).map((key: any) => [key, breakpoints[key]]);

  const [result] = bpArray.reduce((acc, [name, size]) => {
    if (n === name) return [...acc, `@media (min-width: ${size}px)`];
    return acc;
  }, []);

  return result;
};

export const px = (size: string) => {
  return breakpoints[size];
};

interface ObjectType {
  [key: string]: number;
}
// export const MEDIA_SM = 640px;
