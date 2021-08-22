if (process.env.NODE_ENV !== 'production') { require('dotenv').config() };
import Player from "../models/player";
import Item from '../models/gamedata/item';
import Skill from "../models/gamedata/skill";
import UnitClass from "../models/gamedata/unit_classes/unit-class";
import Enemy from "../models/gamedata/enemy";

//seeds
import seeds from './seeds/gamedata';

seedData();

async function seedData() {
  try {
    const addItemQueryResult = Item.addItemsToDBAsync(seeds.items);
    const addSkillQueryResult = Skill.addSkillsToDBAsync(seeds.skills);
    const addClassesQueryResult = UnitClass.addClassesToDBAsync(seeds.classes);

    await Promise.all([
      Promise.all(await addClassesQueryResult),
      Promise.all(await addItemQueryResult),
      Promise.all(await addSkillQueryResult)
    ]);
    console.log('finish seeding 1st wave');

    const addEnemyQueryResult = Enemy.addEnemiesToDBAsync(seeds.enemies);
    await Promise.all([,
      Promise.all(await addEnemyQueryResult)
    ]);
    console.log('finish seeding all data');
  } catch (error) {
    console.log(error);
  }
}