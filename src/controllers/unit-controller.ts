import { IRequest, IResponse, INext } from '../interfaces/express';
import Unit from '../models/units/unit';
import playerParser from '../helpers/player-parser';

export default class UnitController {
  // POST /units
  static async getRandomUnitOfCertainClassHandler(req: IRequest, res: IResponse, next: INext) {
    try {
      const classId: number = Number(req.body.classId);
      const newUnitToken = await Unit.generateUnit(classId);
      res.status(201).json({ newUnitToken });
    } catch (err) {
      next(err);
    }
  }

  // POST /units/hire
  static async hireUnitHandler(req: IRequest, res: IResponse, next: INext) {
    try {
      const player = playerParser(req.body.player);
      const unitToBeAdded = await Unit.decodeUnitJwt(req.body.unitToken as string);
      const hireUnitResult = await Unit.hireUnit(player.id, unitToBeAdded);
      res.status(201).json({ message: `Successfully hired ${hireUnitResult.name}!`, unit: hireUnitResult });
    } catch (err) {
      next(err);
    }
  }
}