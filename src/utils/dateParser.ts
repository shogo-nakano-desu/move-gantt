export const dateParser = (stringDate: string) => {
  // 2021-08-13の形式で入ってくる
  const parser = (regexp: RegExp) => {
    return Number(stringDate.match(regexp)?.join(""));
  };
  const year = parser(/^[0-9]{4}/);
  console.log(year);
  const month = parser(/(?<=^.{5}).{2}/);
  console.log(month);
  const day = parser(/(?<=^.{8}).{2}/);
  console.log(day);
  return new Date(year, month, day);
};
