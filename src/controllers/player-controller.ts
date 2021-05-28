import { IRequest, IResponse, INext } from '../interfaces/express';
export default class PlayerController {
  static async registerUserHandler(req: IRequest, res: IResponse, next: INext) {
    res.status(200).json('from post');
  }

  static async fetchUserDataHandler(req: IRequest, res: IResponse, next: INext) {
    res.status(200).json('from get');
  }
}