export abstract class BaseQueryParametersDto {
  sort: string; // recebi uma string convertida de um objeto JSON
  page: number;
  limit: number;
}
