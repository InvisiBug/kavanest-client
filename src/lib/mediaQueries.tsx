//* Sizes from here
// https://tailwindcss.com/docs/breakpoints

const breakpoints: ObjectType = {
  small: 640,
  medium: 768,
  large: 1200,
};

export const mq = (n: any) => {
  const bpArray = Object.keys(breakpoints).map((key: any) => [key, breakpoints[key]]);
  console.log(bpArray);

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
  [key: string]: any;
}
// export const MEDIA_SM = 640px;
