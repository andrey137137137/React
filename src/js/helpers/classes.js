export const getSwitchedClass = (cond, className) => (cond ? className : "");

export function getComputedClasses(
  switchedClasses,
  nonSwitchedClasses,
  commonClasses = ""
) {
  if (commonClasses) commonClasses += " ";

  for (let i = 0; i < switchedClasses.length; i++) {
    if (switchedClasses[i].cond) {
      return commonClasses + switchedClasses[i].value;
    }
  }

  return commonClasses + nonSwitchedClasses;
}
