import { TAcademicSemCode, TAcademicSemNameCodeMapper, TAcademicSemName, TMonth } from "./AcademicSem.interface";

  
  export const Months: TMonth[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  
  export const AcademicSemName: TAcademicSemName[] = [
    'Autumn',
    'Summar',
    'Fall',
  ];
  
  export const AcademicSemCode: TAcademicSemCode[] = ['01', '02', '03'];
  
export const academicSemNameCodeMapper: TAcademicSemNameCodeMapper = {
    Autumn: '01',
    Summar: '02',
    Fall: '03',
  };
  
