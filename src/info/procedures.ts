// ここには手続き関連の情報を入れていくよ
// 日付の計算をする関数を書く必要がある。
// もしくは、オブジェクトによっては日付にはプロジェクト作成日を入れる
// 一旦UI作成用でダミーデータを入れる
import { add } from "date-fns";

// ----------------------------------------------------------------
// ここはダミーデータ
const today = new Date();
export const moveDate = new Date(2021, 8, 6); // 2021/9/6
const projectCreatedAt = new Date(2021, 7, 18); // [TODO]本当はproject作成日をとってくる
// ----------------------------------------------------------------

/*追加データ
[done]isSelfEmployed⇨isNotEmployee
isUnderFifteen:false,
isFireInsurance: false,
isFixedPhone: false,
isMynumber: false,
isStampRegistration:false,
isDrivingLicense: false,



*/

// booleanに関しては、trueの時だけその項目がマストになる
export interface Procedure {
  title: string;
  startDate: Date; // プロジェクト作成日か関数で計算した日付
  deadline: Date;
  submitDestination: string;
  targetPerson: TARGET_PERSON;
  confirmationSource: string;
  isNotEmployee: boolean;
  isStudent: boolean;
  isPet: boolean;
  isScooter: boolean;
  isCar: boolean;
  isUnderFifteen: boolean;
  isFireInsurance: boolean;
  isFixedPhone: boolean;
  isMynumber: boolean;
  isStampRegistration: boolean;
  isDrivingLicense: boolean;
}

const TARGET_PERSON = {
  moveInTheSameMunicipalities: "moveInTheSameMunicipalities",
  moveToDifferentMunicipalities: "moveToDifferentMunicipalities",
  everyone: "everyone",
} as const;
type TARGET_PERSON = typeof TARGET_PERSON[keyof typeof TARGET_PERSON];

// ここには本番用データを入れていく----------------------------------------------------------------
const rentalCancellation: Procedure = {
  title: "賃貸物件の解約手続き",
  startDate: projectCreatedAt, // プロジェクト作成日か関数で計算した日付
  deadline: add(moveDate, { months: -2 }), //[TODO]これは１ヶ月前のパターンもあることを明示するか、選択できるようにしたい
  submitDestination: "管理会社や不動産会社、大家など",
  targetPerson: "everyone",
  confirmationSource:
    "管理会社や不動産会社、大家などに問い合わせ、契約内容を確認する",
  isNotEmployee: false,
  isStudent: false,
  isPet: false,
  isScooter: false,
  isCar: false,
  isUnderFifteen: false,
  isFireInsurance: false,
  isFixedPhone: false,
  isMynumber: false,
  isStampRegistration: false,
  isDrivingLicense: false,
};

const parkingCancellation: Procedure = {
  title: "駐車場の解約手続き",
  startDate: projectCreatedAt, // プロジェクト作成日か関数で計算した日付
  deadline: add(moveDate, { months: -2 }),
  submitDestination: "貸主もしくは管理会社",
  targetPerson: "everyone",
  confirmationSource: "契約書を確認、もしくは貸主、管理会社に問い合わせ",
  isNotEmployee: false,
  isStudent: false,
  isPet: false,
  isScooter: true, // 表示条件はscooterかcarどっちかがtrueにする
  isCar: true,
  isUnderFifteen: false,
  isFireInsurance: false,
  isFixedPhone: false,
  isMynumber: false,
  isStampRegistration: false,
  isDrivingLicense: false,
};

const moverContraction: Procedure = {
  title: "引越し業者との契約",
  startDate: projectCreatedAt, // プロジェクト作成日か関数で計算した日付
  deadline: add(moveDate, { weeks: -1 }),
  submitDestination: "各引越し業者",
  targetPerson: "everyone",
  confirmationSource:
    "各引越し業者のサイト。直前になるにつれて選択肢が狭まるので注意",
  isNotEmployee: false,
  isStudent: false,
  isPet: false,
  isScooter: false,
  isCar: false,
  isUnderFifteen: false,
  isFireInsurance: false,
  isFixedPhone: false,
  isMynumber: false,
  isStampRegistration: false,
  isDrivingLicense: false,
};

const schoolChanging: Procedure = {
  title: "学校の転校手続き",
  startDate: projectCreatedAt, // プロジェクト作成日か関数で計算した日付
  deadline: add(projectCreatedAt, { weeks: 2 }),
  submitDestination: "（公立校）役所（教育委員会）の窓口/ （私立校）学校の窓口",
  targetPerson: "everyone",
  confirmationSource:
    "https://hikkoshizamurai.jp/useful/procedure/other/school/",
  isNotEmployee: false,
  isStudent: true,
  isPet: false,
  isScooter: false,
  isCar: false,
  isUnderFifteen: false,
  isFireInsurance: false,
  isFixedPhone: false,
  isMynumber: false,
  isStampRegistration: false,
  isDrivingLicense: false,
};

const internet: Procedure = {
  title: "インターネットの引越し手続き",
  startDate: add(moveDate, { months: -1, weeks: -2 }), // プロジェクト作成日か関数で計算した日付
  deadline: add(moveDate, { months: -1 }), //
  submitDestination: "回線会社、プロバイダのHPもしくは電話など",
  targetPerson: "everyone",
  confirmationSource:
    "https://hikkoshizamurai.jp/useful/procedure/lifeline/internet/",
  isNotEmployee: false,
  isStudent: false,
  isPet: false,
  isScooter: false,
  isCar: false,
  isUnderFifteen: false,
  isFireInsurance: false,
  isFixedPhone: false,
  isMynumber: false,
  isStampRegistration: false,
  isDrivingLicense: false,
};

const largeGarbage: Procedure = {
  title: "粗大ゴミの処分手続き",
  startDate: projectCreatedAt, // プロジェクト作成日か関数で計算した日付
  deadline: add(moveDate, { months: -1 }),
  submitDestination: "各自治体もしくは粗大ゴミ回収業者",
  targetPerson: "everyone",
  confirmationSource: "https://hikkoshizamurai.jp/useful/unnecessary/#anchor05",
  isNotEmployee: false,
  isStudent: false,
  isPet: false,
  isScooter: false,
  isCar: false,
  isUnderFifteen: false,
  isFireInsurance: false,
  isFixedPhone: false,
  isMynumber: false,
  isStampRegistration: false,
  isDrivingLicense: false,
};

const fireInsurance: Procedure = {
  title: "火災保険の住所変更手続き",
  startDate: add(moveDate, { months: -1 }), // プロジェクト作成日か関数で計算した日付
  deadline: add(moveDate, { weeks: -3 }), //
  submitDestination: "保険会社",
  targetPerson: "everyone",
  confirmationSource:
    "https://hikkoshizamurai.jp/useful/procedure/other/fire-insurance/",
  isNotEmployee: false,
  isStudent: false,
  isPet: false,
  isScooter: false,
  isCar: false,
  isUnderFifteen: false,
  isFireInsurance: true,
  isFixedPhone: false,
  isMynumber: false,
  isStampRegistration: false,
  isDrivingLicense: false,
};

const movingOutNotification: Procedure = {
  title: "転出届の提出",
  startDate: add(moveDate, { weeks: -2 }), // プロジェクト作成日か関数で計算した日付
  deadline: add(moveDate, { days: 13 }), //
  submitDestination: "旧住所管轄の役場",
  targetPerson: "moveToDifferentMunicipalities",
  confirmationSource:
    "https://hikkoshizamurai.jp/useful/procedure/public/resident/",
  isNotEmployee: false,
  isStudent: false,
  isPet: false,
  isScooter: false,
  isCar: false,
  isUnderFifteen: false,
  isFireInsurance: false,
  isFixedPhone: false,
  isMynumber: false,
  isStampRegistration: false,
  isDrivingLicense: false,
};

const NationalHealthInsuranceCancellation: Procedure = {
  title: "国民健康保険の資格喪失手続き",
  startDate: add(moveDate, { weeks: -2 }),
  deadline: add(moveDate, { days: 14 }),
  submitDestination: "引越し元の市区町村役場",
  targetPerson: "moveToDifferentMunicipalities",
  confirmationSource:
    "https://hikkoshizamurai.jp/useful/procedure/public/nhl/#loss",
  isNotEmployee: true,
  isStudent: false,
  isPet: false,
  isScooter: false,
  isCar: false,
  isUnderFifteen: false,
  isFireInsurance: false,
  isFixedPhone: false,
  isMynumber: false,
  isStampRegistration: false,
  isDrivingLicense: false,
};

const stampDeletion: Procedure = {
  title: "印鑑登録の抹消",
  startDate: add(moveDate, { weeks: -2 }),
  deadline: moveDate,
  submitDestination: "旧住所の役場",
  targetPerson: "moveToDifferentMunicipalities",
  confirmationSource:
    "https://hikkoshizamurai.jp/useful/procedure/public/seal/",
  isNotEmployee: false,
  isStudent: false,
  isPet: false,
  isScooter: false,
  isCar: false,
  isUnderFifteen: false,
  isFireInsurance: false,
  isFixedPhone: false,
  isMynumber: false,
  isStampRegistration: true,
  isDrivingLicense: false,
};

const scooterDeletion: Procedure = {
  title: "原付の廃車手続き・住所変更",
  startDate: add(moveDate, { weeks: -2 }),
  deadline: add(moveDate, { days: 15 }),
  submitDestination: "市区町村役場もしくは陸運局",
  targetPerson: "moveToDifferentMunicipalities",
  confirmationSource:
    "https://hikkoshizamurai.jp/useful/procedure/vehicle/motorcycle/",
  isNotEmployee: false,
  isStudent: false,
  isPet: false,
  isScooter: true,
  isCar: false,
  isUnderFifteen: false,
  isFireInsurance: false,
  isFixedPhone: false,
  isMynumber: false,
  isStampRegistration: false,
  isDrivingLicense: false,
};

const childAllowance: Procedure = {
  title: "児童手当の住所変更手続き",
  startDate: add(moveDate, { weeks: -2 }),
  deadline: add(moveDate, { days: 15 }),
  submitDestination:
    "引越し元住所に「児童手当受給事由消滅届」⇨引越し先住所に「児童手当認定請求書」",
  targetPerson: "moveToDifferentMunicipalities",
  confirmationSource:
    "https://hikkoshizamurai.jp/useful/procedure/public/allowance/",
  isNotEmployee: false,
  isStudent: false,
  isPet: false,
  isScooter: false,
  isCar: false,
  isUnderFifteen: true,
  isFireInsurance: false,
  isFixedPhone: false,
  isMynumber: false,
  isStampRegistration: false,
  isDrivingLicense: false,
};

const electricity: Procedure = {
  title: "電気の使用停止・開始手続き",
  startDate: add(moveDate, { weeks: -2 }),
  deadline: add(moveDate, { weeks: -1 }),
  submitDestination: "電力会社のHPもしくは電話",
  targetPerson: "everyone",
  confirmationSource:
    "https://hikkoshizamurai.jp/useful/procedure/lifeline/electricity/#oldAddress",
  isNotEmployee: false,
  isStudent: false,
  isPet: false,
  isScooter: false,
  isCar: false,
  isUnderFifteen: false,
  isFireInsurance: false,
  isFixedPhone: false,
  isMynumber: false,
  isStampRegistration: false,
  isDrivingLicense: false,
};

const gasTap: Procedure = {
  title: "ガスの使用中止・開始手続き",
  startDate: add(moveDate, { weeks: -2 }),
  deadline: add(moveDate, { weeks: -1 }),
  submitDestination: "ガス会社",
  targetPerson: "everyone",
  confirmationSource:
    "https://hikkoshizamurai.jp/useful/procedure/lifeline/gas/#oldAddress",
  isNotEmployee: false,
  isStudent: false,
  isPet: false,
  isScooter: false,
  isCar: false,
  isUnderFifteen: false,
  isFireInsurance: false,
  isFixedPhone: false,
  isMynumber: false,
  isStampRegistration: false,
  isDrivingLicense: false,
};

const tapwaterCancellation: Procedure = {
  title: "水道の使用中止手続き",
  startDate: add(moveDate, { weeks: -2 }),
  deadline: add(moveDate, { days: -2 }),
  submitDestination: "水道局",
  targetPerson: "everyone",
  confirmationSource:
    "https://hikkoshizamurai.jp/useful/procedure/lifeline/water/#oldAddress",
  isNotEmployee: false,
  isStudent: false,
  isPet: false,
  isScooter: false,
  isCar: false,
  isUnderFifteen: false,
  isFireInsurance: false,
  isFixedPhone: false,
  isMynumber: false,
  isStampRegistration: false,
  isDrivingLicense: false,
};

const tapwaterStart: Procedure = {
  title: "水道の使用開始手続き",
  startDate: moveDate,
  deadline: add(moveDate, { days: 10 }),
  submitDestination: "水道局webサイト、郵便、電話",
  targetPerson: "everyone",
  confirmationSource:
    "https://hikkoshizamurai.jp/useful/procedure/lifeline/water/#oldAddress",
  isNotEmployee: false,
  isStudent: false,
  isPet: false,
  isScooter: false,
  isCar: false,
  isUnderFifteen: false,
  isFireInsurance: false,
  isFixedPhone: false,
  isMynumber: false,
  isStampRegistration: false,
  isDrivingLicense: false,
};

const postofficeChangeAddress: Procedure = {
  title: "転居・転送届",
  startDate: add(moveDate, { weeks: -2 }),
  deadline: add(moveDate, { weeks: -1 }),
  submitDestination: "郵便局",
  targetPerson: "everyone",
  confirmationSource:
    "https://hikkoshizamurai.jp/useful/procedure/lifeline/post/",
  isNotEmployee: false,
  isStudent: false,
  isPet: false,
  isScooter: false,
  isCar: false,
  isUnderFifteen: false,
  isFireInsurance: false,
  isFixedPhone: false,
  isMynumber: false,
  isStampRegistration: false,
  isDrivingLicense: false,
};

// [TODO]固定電話を持っているかどうか
const fixedPhone: Procedure = {
  title: "固定電話の住所変更手続き",
  startDate: projectCreatedAt,
  deadline: add(moveDate, { weeks: -2 }),
  submitDestination: "NTT",
  targetPerson: "everyone",
  confirmationSource:
    "https://hikkoshizamurai.jp/useful/procedure/lifeline/telephone/",
  isNotEmployee: false,
  isStudent: false,
  isPet: false,
  isScooter: false,
  isCar: false,
  isUnderFifteen: false,
  isFireInsurance: false,
  isFixedPhone: true,
  isMynumber: false,
  isStampRegistration: false,
  isDrivingLicense: false,
};

const mobilePhone: Procedure = {
  title: "携帯電話・スマートフォンの住所変更手続",
  startDate: moveDate,
  deadline: add(moveDate, { weeks: 1 }),
  submitDestination: "携帯電話会社のHP、電話、窓口など",
  targetPerson: "everyone",
  confirmationSource:
    "https://hikkoshizamurai.jp/useful/procedure/lifeline/mobile-phone/",
  isNotEmployee: false,
  isStudent: false,
  isPet: false,
  isScooter: false,
  isCar: false,
  isUnderFifteen: false,
  isFireInsurance: false,
  isFixedPhone: false,
  isMynumber: false,
  isStampRegistration: false,
  isDrivingLicense: false,
};

const pet: Procedure = {
  title: "ペットの登録事項変更届",
  startDate: add(moveDate, { weeks: -1 }),
  deadline: add(moveDate, { weeks: 1 }),
  submitDestination: "市区町村役所の窓口、保健所など",
  targetPerson: "everyone",
  confirmationSource:
    "https://hikkoshizamurai.jp/useful/procedure/other/pet-address/",
  isNotEmployee: false,
  isStudent: false,
  isPet: true,
  isScooter: false,
  isCar: false,
  isUnderFifteen: false,
  isFireInsurance: false,
  isFixedPhone: false,
  isMynumber: false,
  isStampRegistration: false,
  isDrivingLicense: false,
};

const gasPrecense: Procedure = {
  title: "ガス使用停止の立ち合い",
  startDate: moveDate,
  deadline: moveDate,
  submitDestination: "旧居",
  targetPerson: "everyone",
  confirmationSource:
    "https://hikkoshizamurai.jp/useful/procedure/lifeline/gas/#oldAddress",
  isNotEmployee: false,
  isStudent: false,
  isPet: false,
  isScooter: false,
  isCar: false,
  isUnderFifteen: false,
  isFireInsurance: false,
  isFixedPhone: false,
  isMynumber: false,
  isStampRegistration: false,
  isDrivingLicense: false,
};

const tapPrecense: Procedure = {
  title: "水道使用停止の立ち合い",
  startDate: moveDate,
  deadline: moveDate,
  submitDestination: "旧居",
  targetPerson: "everyone",
  confirmationSource:
    "https://hikkoshizamurai.jp/useful/procedure/lifeline/water/#oldAddress",
  isNotEmployee: false,
  isStudent: false,
  isPet: false,
  isScooter: false,
  isCar: false,
  isUnderFifteen: false,
  isFireInsurance: false,
  isFixedPhone: false,
  isMynumber: false,
  isStampRegistration: false,
  isDrivingLicense: false,
};

const moveOutPrecense: Procedure = {
  title: "旧居の明け渡し",
  startDate: moveDate,
  deadline: moveDate,
  submitDestination: "旧居",
  targetPerson: "everyone",
  confirmationSource: "なし",
  isNotEmployee: false,
  isStudent: false,
  isPet: false,
  isScooter: false,
  isCar: false,
  isUnderFifteen: false,
  isFireInsurance: false,
  isFixedPhone: false,
  isMynumber: false,
  isStampRegistration: false,
  isDrivingLicense: false,
};

const gasStartPrecense: Procedure = {
  title: "ガス開栓の立ち会い",
  startDate: moveDate,
  deadline: moveDate,
  submitDestination: "新居",
  targetPerson: "everyone",
  confirmationSource:
    "https://hikkoshizamurai.jp/useful/procedure/lifeline/gas/#newAddress",
  isNotEmployee: false,
  isStudent: false,
  isPet: false,
  isScooter: false,
  isCar: false,
  isUnderFifteen: false,
  isFireInsurance: false,
  isFixedPhone: false,
  isMynumber: false,
  isStampRegistration: false,
  isDrivingLicense: false,
};

const movingNotification: Procedure = {
  title: "転居届",
  startDate: moveDate,
  deadline: add(moveDate, { days: 14 }),
  submitDestination: "市区町村役場",
  targetPerson: "moveInTheSameMunicipalities",
  confirmationSource:
    "https://hikkoshizamurai.jp/useful/procedure/public/resident/",
  isNotEmployee: false,
  isStudent: false,
  isPet: false,
  isScooter: false,
  isCar: false,
  isUnderFifteen: false,
  isFireInsurance: false,
  isFixedPhone: false,
  isMynumber: false,
  isStampRegistration: false,
  isDrivingLicense: false,
};

const transferNotification: Procedure = {
  title: "転入届",
  startDate: moveDate,
  deadline: add(moveDate, { days: 14 }),
  submitDestination: "市区町村役場",
  targetPerson: "moveToDifferentMunicipalities",
  confirmationSource:
    "https://hikkoshizamurai.jp/useful/procedure/public/resident/",
  isNotEmployee: false,
  isStudent: false,
  isPet: false,
  isScooter: false,
  isCar: false,
  isUnderFifteen: false,
  isFireInsurance: false,
  isFixedPhone: false,
  isMynumber: false,
  isStampRegistration: false,
  isDrivingLicense: false,
};

const mynumber: Procedure = {
  title: "マイナンバーの住所変更",
  startDate: moveDate,
  deadline: add(moveDate, { days: 14 }),
  submitDestination: "市区町村役場",
  targetPerson: "everyone",
  confirmationSource:
    "https://hikkoshizamurai.jp/useful/procedure/public/my-number/",
  isNotEmployee: false,
  isStudent: false,
  isPet: false,
  isScooter: false,
  isCar: false,
  isUnderFifteen: false,
  isFireInsurance: false,
  isFixedPhone: false,
  isMynumber: true,
  isStampRegistration: false,
  isDrivingLicense: false,
};

const stampRegistration: Procedure = {
  title: "印鑑登録",
  startDate: moveDate,
  deadline: add(moveDate, { days: 21 }),
  submitDestination: "市区町村役場",
  targetPerson: "moveToDifferentMunicipalities",
  confirmationSource:
    "https://hikkoshizamurai.jp/useful/procedure/public/seal/",
  isNotEmployee: false,
  isStudent: false,
  isPet: false,
  isScooter: false,
  isCar: false,
  isUnderFifteen: false,
  isFireInsurance: false,
  isFixedPhone: false,
  isMynumber: false,
  isStampRegistration: true,
  isDrivingLicense: false,
};

const compensation: Procedure = {
  title: "国民年金の住所変更",
  startDate: moveDate,
  deadline: add(moveDate, { days: 14 }),
  submitDestination: "市区町村役場",
  targetPerson: "everyone",
  confirmationSource:
    "https://hikkoshizamurai.jp/useful/procedure/public/national-pension/",
  isNotEmployee: true,
  isStudent: false,
  isPet: false,
  isScooter: false,
  isCar: false,
  isUnderFifteen: false,
  isFireInsurance: false,
  isFixedPhone: false,
  isMynumber: false,
  isStampRegistration: false,
  isDrivingLicense: false,
};
// [TODO]個人事業主、フリーターだけ必要＝会社員以外必要
const nationalHealthInsuranceRegistration: Procedure = {
  title: "国民健康保険の加入",
  startDate: moveDate,
  deadline: add(moveDate, { days: 14 }),
  submitDestination: "引越し先の市区町村役場",
  targetPerson: "moveToDifferentMunicipalities",
  confirmationSource:
    "https://hikkoshizamurai.jp/useful/procedure/public/nhl/#join",
  isNotEmployee: true,
  isStudent: false,
  isPet: false,
  isScooter: false,
  isCar: false,
  isUnderFifteen: false,
  isFireInsurance: false,
  isFixedPhone: false,
  isMynumber: false,
  isStampRegistration: false,
  isDrivingLicense: false,
};
// [TODO]個人事業主、フリーターだけ必要＝会社員以外必要
const nationalHealthInsuranceChange: Procedure = {
  title: "国民健康保険の住所変更",
  startDate: moveDate,
  deadline: add(moveDate, { days: 14 }),
  submitDestination: "引越し先の市区町村役場",
  targetPerson: "moveInTheSameMunicipalities",
  confirmationSource:
    "https://hikkoshizamurai.jp/useful/procedure/public/nhl/#join",
  isNotEmployee: true,
  isStudent: false,
  isPet: false,
  isScooter: false,
  isCar: false,
  isUnderFifteen: false,
  isFireInsurance: false,
  isFixedPhone: false,
  isMynumber: false,
  isStampRegistration: false,
  isDrivingLicense: false,
};
const company: Procedure = {
  title: "会社の健康保険と厚生年金の変更手続き",
  startDate: moveDate,
  deadline: add(moveDate, { days: 7 }),
  submitDestination: "勤め先の担当部署",
  targetPerson: "everyone",
  confirmationSource: "なし",
  isNotEmployee: false,
  isStudent: false,
  isPet: false,
  isScooter: false,
  isCar: false,
  isUnderFifteen: false,
  isFireInsurance: false,
  isFixedPhone: false,
  isMynumber: false,
  isStampRegistration: false,
  isDrivingLicense: false,
};

const parkingCertification: Procedure = {
  title: "車庫証明の取得申請",
  startDate: moveDate,
  deadline: add(moveDate, { days: 15 }),
  submitDestination: "保管場所を管轄する警察署",
  targetPerson: "everyone",
  confirmationSource:
    "https://hikkoshizamurai.jp/useful/procedure/vehicle/parking-space/",
  isNotEmployee: false,
  isStudent: false,
  isPet: false,
  isScooter: false,
  isCar: true,
  isUnderFifteen: false,
  isFireInsurance: false,
  isFixedPhone: false,
  isMynumber: false,
  isStampRegistration: false,
  isDrivingLicense: false,
};
// [TODO]免許を持っているかどうか
const drivingLicense: Procedure = {
  title: "免許証の住所変更手続き",
  startDate: moveDate,
  deadline: add(moveDate, { days: 14 }),
  submitDestination:
    "新居住地の警察署運転免許課、運転免許センター、運転免許試験場",
  targetPerson: "everyone",
  confirmationSource:
    "https://hikkoshizamurai.jp/useful/procedure/vehicle/license/",
  isNotEmployee: false,
  isStudent: false,
  isPet: false,
  isScooter: false,
  isCar: false,
  isUnderFifteen: false,
  isFireInsurance: false,
  isFixedPhone: false,
  isMynumber: false,
  isStampRegistration: false,
  isDrivingLicense: true,
};

const carAddress: Procedure = {
  title: "自動車の住所変更手続き",
  startDate: moveDate,
  deadline: add(moveDate, { days: 15 }),
  submitDestination: "新居住地の地方運輸局、運輸支局、自動車検査登録事務所",
  targetPerson: "everyone",
  confirmationSource:
    "https://hikkoshizamurai.jp/useful/procedure/vehicle/car/",
  isNotEmployee: false,
  isStudent: false,
  isPet: false,
  isScooter: false,
  isCar: true,
  isUnderFifteen: false,
  isFireInsurance: false,
  isFixedPhone: false,
  isMynumber: false,
  isStampRegistration: false,
  isDrivingLicense: false,
};

const creaditcard: Procedure = {
  title: "クレジットカードの住所変更手続き",
  startDate: moveDate,
  deadline: add(moveDate, { weeks: 1 }),
  submitDestination: "クレジットカード会社のHP、郵送、電話",
  targetPerson: "everyone",
  confirmationSource:
    "https://hikkoshizamurai.jp/useful/procedure/other/credit-card/",
  isNotEmployee: false,
  isStudent: false,
  isPet: false,
  isScooter: false,
  isCar: false,
  isUnderFifteen: false,
  isFireInsurance: false,
  isFixedPhone: false,
  isMynumber: false,
  isStampRegistration: false,
  isDrivingLicense: false,
};

const bankAccount: Procedure = {
  title: "銀行口座の住所変更",
  startDate: moveDate,
  deadline: add(moveDate, { days: 15 }),
  submitDestination: "銀行",
  targetPerson: "everyone",
  confirmationSource: "https://hikkoshizamurai.jp/useful/procedure/other/bank/",
  isNotEmployee: false,
  isStudent: false,
  isPet: false,
  isScooter: false,
  isCar: false,
  isUnderFifteen: false,
  isFireInsurance: false,
  isFixedPhone: false,
  isMynumber: false,
  isStampRegistration: false,
  isDrivingLicense: false,
};

const onlineShop: Procedure = {
  title: "通販サイトの住所変更手続き",
  startDate: moveDate,
  deadline: add(moveDate, { weeks: 3 }),
  submitDestination: "各通販サイト",
  targetPerson: "everyone",
  confirmationSource: "なし",
  isNotEmployee: false,
  isStudent: false,
  isPet: false,
  isScooter: false,
  isCar: false,
  isUnderFifteen: false,
  isFireInsurance: false,
  isFixedPhone: false,
  isMynumber: false,
  isStampRegistration: false,
  isDrivingLicense: false,
};

const procedures: Procedure[] = [
  rentalCancellation,
  parkingCancellation,
  moverContraction,
  schoolChanging,
  internet,
  largeGarbage,
  fireInsurance,
  movingOutNotification,
  NationalHealthInsuranceCancellation,
  stampDeletion,
  scooterDeletion,
  childAllowance,
  electricity,
  gasTap,
  tapwaterCancellation,
  tapwaterStart,
  postofficeChangeAddress,
  fixedPhone,
  mobilePhone,
  pet,
  gasPrecense,
  tapPrecense,
  moveOutPrecense,
  gasStartPrecense,
  movingNotification,
  transferNotification,
  mynumber,
  stampRegistration,
  compensation,
  nationalHealthInsuranceRegistration,
  nationalHealthInsuranceChange,
  company,
  parkingCertification,
  drivingLicense,
  carAddress,
  creaditcard,
  bankAccount,
  onlineShop,
];

/*
title: string,
startDate: Date,
deadline: Date,
submitDestination: string,
targetPerson: TARGET_PERSON,
confirmationSource: string,
isNotEmployee: false,
isStudent: false,
isPet: false,
isScooter: false,
isCar: false,
*/
// ----------------------------------------------------------------

// rentalCaN / gasTapStop /dummy_moveNotification /dummy_car
// // 以下全てダミーデータ
// export const dummy_rentalCAN: Procedure = {
//   title: "賃貸物件の解約手続き",
//   startDate: today,
//   deadline: add(moveDate, { months: -1 }), // 2021/8/6
//   submitDestination: "管理会社や不動産会社、大家など",
//   targetPerson: "everyone",
//   confirmationSource:
//     "https://hikkoshizamurai.jp/useful/procedure/other/rental/",
//   isNotEmployee: false,
//   isStudent: false,
//   isPet: false,
//   isScooter: false,
//   isCar: false,
// };

// export const dummy_gasTapStop: Procedure = {
//   title: "ガス・水道停止の立ち合い",
//   startDate: moveDate,
//   deadline: moveDate, // 2021/9/6
//   submitDestination: "ガス・水道会社",
//   targetPerson: "everyone",
//   confirmationSource:
//     "https://hikkoshizamurai.jp/useful/procedure/other/rental/",
//   isNotEmployee: false,
//   isStudent: false,
//   isPet: false,
//   isScooter: false,
//   isCar: false,
// };

// export const dummy_moveNotification: Procedure = {
//   title: "転出届の提出",
//   startDate: add(moveDate, { weeks: -2 }),
//   deadline: add(moveDate, { weeks: 1 }), // 2021/9/13
//   submitDestination: "ガス・水道会社",
//   targetPerson: "moveToDifferentMunicipalities",
//   confirmationSource:
//     "https://hikkoshizamurai.jp/useful/procedure/other/rental/",
//   isNotEmployee: false,
//   isStudent: false,
//   isPet: false,
//   isScooter: false,
//   isCar: false,
// };

// export const dummy_car: Procedure = {
//   title: "車庫証明の取得申請",
//   startDate: add(moveDate, { days: 1 }),
//   deadline: add(moveDate, { days: 15 }), //2021/9/21
//   submitDestination: "管轄の警察署",
//   targetPerson: "everyone",
//   confirmationSource:
//     "https://hikkoshizamurai.jp/useful/procedure/other/rental/",
//   isNotEmployee: false,
//   isStudent: false,
//   isPet: false,
//   isScooter: false,
//   isCar: true,
// };

// export const dummy_procedures: Procedure[] = [
//   dummy_moveNotification,
//   dummy_car,
//   dummy_rentalCAN,
//   dummy_gasTapStop,
// ];
