export type TUser={
    id:string;
    password:string;
    needsPassworChange:boolean;
    role:'Admin'|'student'|'faculty';
    status:'in-progress'|'blocked';
    isDeleted:boolean
}
