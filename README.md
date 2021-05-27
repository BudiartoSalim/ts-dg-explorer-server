# ts-dg-explorer-server
DO NOT FORGET TO NPM INSTALL FIRST!!

Commands:
- npm run dev
- npm run build
- npm start

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
- Refresh token for login sessions
- Combat is autocombat 
- Skill with chances of autotrigger
- Inventory System
- Player recruits units to form party
- Units permadeath
- Time based checks?

# SCHEMAS(?)
users 1:N units
parties 1:N units
users 1:1 parties
users 1:N inventories
inventories N:1 items
Enemies 1:N drops
drops N:1 items