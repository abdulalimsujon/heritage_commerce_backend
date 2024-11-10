/* eslint-disable @typescript-eslint/no-namespace */
// import { JwtPayload } from 'jsonwebtoken';

// declare global {
//   namespace Express {
//     interface Request {
//       user: JwtPayload;
//     }
//   }
// }
export interface ICategory extends Document {
  name: string;
  products: string[];
}
