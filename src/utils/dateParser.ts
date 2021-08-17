export const dateParser = (stringDate: string) => {
  // 2021-08-13の形式で入ってくる
  const parser = (regexp: RegExp) => {
    return Number(stringDate.match(regexp)?.join(""));
  };
  const year = parser(/^[0-9]{4}/);
  const month = parser(/(?<=^.{5}).{2}/);
  const day = parser(/(?<=^.{8}).{2}/);
  return new Date(year, month, day);
};
