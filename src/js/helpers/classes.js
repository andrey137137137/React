export const getSwitchedClass = (cond, className) => (cond ? className : "");

export function getComputedClasses(commonClasses, switchedClass) {
  return {
    common: commonClasses,
    switched: switchedClass,
  };
}
