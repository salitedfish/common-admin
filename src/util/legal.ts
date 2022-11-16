export const passwordLegal = (password: string) => {
  const legal = /^\w{6,16}$/;
  return legal.test(password);
};
