## How To Get This Up And Running
```
  yarn install
  yarn start
```

## > Requirements
* A user  can select which team they are interested in viewing.
* A user can deep link to a team profile.
* A user can deep link to a player profile. 
* A team profile should at least include the following:
  * The Team Name
  * Team Logo*
  * Team Conference
  * Team Division
  * And some way to access/see the current roster

* A Player Profile should include at least the following:
  * Player Name
  * Player Headshot**
  * Current Team
  * Player Age
  * Player Number
  * Player Position
  * Player Shooting/catching hand
  * Player Nationality
  * Player Captain Status (i.e. is a captain or alternate captain)
  * If the player is a rookie

# TAKE 1
  I spent most of my time roughly covering the acceptance criteria. Comms with public API, loading lists,
deep linking onto them, adding MAT-UI, adding router, implementing hooks, adding basic error handling. 
Most of the time taken was just rendering data, though I did briefly try to make a SHOW entity page slightly
more eye-pleasing(IE, IG Banner)

# TAKE 2
There were two issues I had with *TAKE 1* that I wanted to solve.
- it was ugly to look at. No one wants to look at tables on tables on tables. added some styling.
- Shoring up some code. The organization of top-down components was poor, there should always be single sources of truth, and they should be visibly obvious. 
  - "Containers" as we like them should live at the top level nodes in  index while
  - "Presenters" are further nested into the directory path. 
  - I wanted to apply Context here as an alternative to a redux.store getter and prop drilling (esp in routes)