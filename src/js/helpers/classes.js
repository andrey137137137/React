export const getSwitchedClass = (cond, className) => (cond ? className : "");

export function getComputedClasses(
  commonClasses,
  switchedClasses,
  nonSwitchedClasses
) {
  switchedClasses.forEach((item) => {
    if (item.cond) return `${commonClasses} ${item.value}`;
  });

  return `${commonClasses} ${nonSwitchedClasses}`;
}
