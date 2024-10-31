export type TErrorSources = {
  path: number | string;
  message: string;
}[];

export type TgenericRerrorResponse = {
  statusCode: number;
  message: string;
  errorSources: TErrorSources;
};
