export type TUser={
    id:string;
    password:string;
    needsPassworChange:boolean;
    role:'admin'|'student'|'faculty';
    status:'in-progress'|'blocked';
    isDeleted:boolean
}
