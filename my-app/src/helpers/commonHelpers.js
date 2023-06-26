export const calcPointsPerTx = (tx) => {
  let points = 0;
  const txAbs = Math.floor(tx);
  if (txAbs > 50) {
    points += Math.min(txAbs, 100) - 50;
  }
  if (txAbs > 100) {
    points += (txAbs - 100) * 2;
  }
  return points;
};

export const sortUsers = (data) => {
  const users = Array.from(
    new Set(data?.map((d) => d.id)).values()
  );
  users?.sort((a, b) => a - b);
  return users;
};
