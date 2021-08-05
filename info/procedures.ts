// ここには手続き関連の情報を入れていくよ
// 日付の計算をする関数を書く必要がある。
// もしくは、オブジェクトによっては日付にはプロジェクト作成日を入れる

export interface Procedure {
  title: string;
  startDate: Date; // プロジェクト作成日か関数で計算した日付
  deadline: Date;
  submitDestination: string;
  targetPerson: TargetPerson;
  confirmationSource: string;
  isSelfEmployed: boolean;
  isStudent: boolean;
  isPet: boolean;
  isScooter: boolean;
  isCar: boolean;
}

enum TargetPerson {
  moveInTheSameMunicipalities,
  moveToDifferentMunicipalities,
  all,
}

// const rentalCAN: Procedure = {
//   title: "賃貸物件の解約手続き"
//   startDate: dateCulc()
// };
