import { IRequest, IResponse, INext } from '../interfaces/express';
import Unit from '../models/unit-model';
import { IPlayer } from '../interfaces/definedmodels/PlayerInterfaces';

export default class UnitController {
  // POST /units
  static async getRandomUnitOfCertainClassHandler(req: IRequest, res: IResponse, next: INext) {
    try {
      const classId = Number(req.body.classId);
      const newUnitToken = await Unit.generateUnit(classId);
      res.status(201).json({ newUnitToken });
    } catch (err) {
      next(err);
    }
  }

  // POST /units/hire
  static async hireUnitHandler(req: IRequest, res: IResponse, next: INext) {
    try {

    } catch (err) {
      next(err);
    }
  }
}