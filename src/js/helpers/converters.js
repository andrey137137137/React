export const number2str = number => {
  const temp = number.toFixed();
  return temp.replace(".", ",");
};
