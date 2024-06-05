export interface IResponse {
  "data": IData[],
  "source": any[]
}

export interface IData {
  "ID State": string,
  "State": string,
  "ID Year": number,
  "Year": string,
  "Population": number,
  "Slug State": string
}