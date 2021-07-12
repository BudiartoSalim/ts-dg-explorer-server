# ts-dg-explorer-server
DO NOT FORGET TO NPM INSTALL FIRST!!

DO NOT FORGET TO ALSO CREATE THE DATABASE AND POPULATE ENV VARIABLE FIRST!

database name is in env, there is no script for making the database.

Commands:
- npm run dev
- npm run build
- npm run devmigrate  //to do migration on local development environment
- npm start

# TO DO
- Registration DONE
- Auth DONE
- Seed data
- Create Characters (purchase random character)
- Create Party (assign up to 4 characters in party)
- Assign equip
- Combat 

# PROJECT DESCRIPTION
This is a portfolio project for an "online single player" RPG game using Typescript, with no ORM. The game will not have any direct online interaction, but the plan is to have it save the progress and have ranking system.

Game concept will be auto-battle dungeon crawler with permadeath concept for characters. Players in concept will act as if they're a guild, able to assign characters they own to a party of 4 to explore dungeons.

This repository is for the server part of the project. Client repository will be added later after the backend basic functions are ready.

# PLANNED ENDPOINTS
- Register (Google Sign In?)
- Login
- get character info
- Initiate dungeon session
- fetch enemy
- simulate combat
- get shop
- buy item

# SPECS(?)
- Each player now have single session
- Combat is autocombat 
- Skill with chances of autotrigger
- Inventory System
- Player recruits units to form party
- Units permadeath
- Time based checks?
