export interface UserInfo {
  dtpId: number;
  dptName: string;
  name: string;
  worknum: string;
  gender: string;
  birthday: string;
  enterTime: string;
  phone: string;
  // 你问为什么要写成 tittle ？这就等问 LT 了。
  teacherTittle: string;
  eduBgd: string;
  degree: string;
  school: string;
  major: string;
  doubleTeacher: number | string;
  background: number | string;
  tutor: number | string;
  permission: number | string;
}
