import { ISkills } from "../../../interfaces/definedmodels/SkillsInterface";

const skills: ISkills[] = [
  {
    "id": 10000001,
    "name": "Smack",
    "description": "Smack the opponent with whatever on your hand (or with your hand) dealing small damage. Does this even qualify as a skill?",
    "type": "Active/Attack",
    "effect": "FixedDamage/SingleTarget",
    "effectPower": 10,
    "cost": 0
  },
  {
    "id": 10000002,
    "name": "Magic Arrow",
    "description": "The most basic magic attack. Sends a magic power.",
    "type": "Active/Attack",
    "effect": "AtkPercentageDamage/SingleTarget",
    "effectPower": 1200,
    "cost": 10
  },
  {
    "id": 10000003,
    "name": "Bite",
    "description": "Literally biting the enemy.",
    "type": "Active/Attack",
    "effect": "AtkPercentageDamage/SingleTarget",
    "effectPower": 1100,
    "cost": 5
  }
]

export default skills;