interface ILabel {
  id: number;
  name: string;
  title: string;
}
export interface ILabelObj {
  [key: string]: string;
}
export interface DictionaryResponse {
  data: {
    labels: ILabel[];
  };
}
