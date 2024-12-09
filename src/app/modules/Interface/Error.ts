export type TErrorSource={
    path:string|number;
    message:string
  }[]
  export type tGenericErrorResponce={
    statusCode:number;
    message:string;
    errorSources:TErrorSource
  }