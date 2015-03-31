if (Meteor.isClient) {

  Template.player_infos.helpers({
    player: {
      name: 'Max',
      score: 20
    }
  });

Template.players_infos.helpers({
  players: [
    { name: 'Max', score: 20 },
    { name: 'Elo', score: 17 },
    { name: 'Pil', score: [13, 12, 34] }
  ]
});

} // end  client


if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}                                                   

