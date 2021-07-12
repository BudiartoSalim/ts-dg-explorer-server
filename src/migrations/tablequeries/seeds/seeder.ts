import Player from "../../../models/player-model";

seedData();

async function seedData() {
  try {
    const player = await Player.registerPlayer({ email: "seedertest@mail.com", name: "testname", password: "asdasd" });
    const partyId = player.party?.id;


  } catch (error) {
    console.log(error);
  }
}