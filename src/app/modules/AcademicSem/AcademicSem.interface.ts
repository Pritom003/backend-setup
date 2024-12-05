
export  type TMonth =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';
  export type TAcademicSemName = 'Autumn' | 'Summar' | 'Fall';
export type TAcademicSemCode = '01' | '02' | '03';

export type TAcademicSem={
    name:TAcademicSemName;
    code:TAcademicSemCode;
    year:string;
    startMonth:TMonth;
    endMonth:TMonth
}
export type TAcademicSemNameCodeMapper = {
    [key: string]: string;
  };