import { IEnemy } from "../../../interfaces/definedmodels/EnemyInterface";

const enemies: IEnemy[] = [
  {
    "id": 1,
    "name": "Rabid Rabbit",
    "description": "A wild rabbit with sharp fangs that are particularly aggresive. Unlike normal rabbits, this kind of rabbit is carnivorous and will attack any people that comes within its sight.",
    "level": 1,
    "baseXp": 10,
    "baseHp": 50,
    "baseEnergy": 5,
    "baseAtk": 20,
    "baseDef": 5,
    "baseSpd": 100,
    "baseHit": 1000,
    "skill": null
  },
  {
    "id": 2,
    "name": "Snake",
    "description": "A small snake commonly found in grasslands. Mainly hunts rats and rabbits, but that doesn't mean it won't attack you if you gets too close.",
    "level": 3,
    "baseXp": 25,
    "baseHp": 80,
    "baseEnergy": 10,
    "baseAtk": 20,
    "baseDef": 5,
    "baseSpd": 100,
    "baseHit": 1000,
    "skill": 10000003
  }
];

export default enemies;