export interface Data {
  position: number;
  id: string;
  applicationName: string;
  email: string;
  fileName?: string;
  url?: string;
  inception: Date;
  amount: {
    value: number;
    currency: string;
  };
  allocation?: number;
}
