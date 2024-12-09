import { TErrorSource, tGenericErrorResponce } from './../Interface/Error';

export const handleDuplicateError = (err: any): tGenericErrorResponce => {
  // Extract key-value pair from "dup key: { fieldName: 'value' }"
  const match = err.message.match(/dup key: { (\w+): "([^"]+)" }/);
  const field = match ? match[1] : 'Unknown field';
  const value = match ? match[2] : 'Unknown value';

  const errorSources: TErrorSource = [
    {
      path: field,
      message: `The value '${value}' for '${field}' already exists.`,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'Duplicate Entry Error',
    errorSources,
  };
};
