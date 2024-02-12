import { CustomClientRequest } from '../models/client-request.model';

export const customParseUrl = (baseUrl: string) => (req: CustomClientRequest): void => {
  const url = new URL(req.url!, baseUrl);
  const urlList = url.pathname.split('/').reduce<string[]>((acc, val) => (val 
    ? (acc.push(val), acc) 
    : acc), 
  []);

  if (urlList.length > 2) {
    req.pathName = urlList.slice(2).join('/');
  }
};
