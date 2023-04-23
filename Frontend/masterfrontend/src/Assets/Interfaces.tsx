export interface universityJsonType {
  universityName: string;
}

export interface educationJsonType {
  educationName: string;
}

export interface startingYearJsonType {
  startingYear: string;
}

export interface createRegularuserInputJsonType {
  email: string;
  password: string;
  startingYear: number;
  universityName: string;
  educationName: string;
}

export interface courseData {
  code: string;
  name: string;
  hp: string;
  level: string;
  period: string;
  block: string;
  vof: string;
}
