Dummydata = new Mongo.Collection("dummydata");

FlowRouter.route('/', {
  subscriptions: function() {
     Meteor.subscribe("nymphNames");
    console.log("Router subs here.");

  },
  action: function () {
    FlowLayout.render('layout1', { top: "header", main: "players" });
  } 
});





dummytest = function() {
 // console.log("dummytest run")
  return Dummydata.findOne({ nymphs: { $exists: true }});
};

if ( dummytest() !== undefined ) {
//   Session.set("dbPopulated", false);
console.log("dummyresult: We have nymphs");
} else {
//   Session.set("dbPopulated", true);
console.log("dummyresult: Uh oh, no nymphs");
};


// --------- ====== -----------------------------
if (Meteor.isClient) {
// method stub (i think)
  // ---------------------
// Meteor.methods({
//   insertNymphMethod: function (nymphEgg) {
//     Dummydata.insert({ nymph: nymphEgg})
//   }
// });

  Template.nymphMachine.events({
    "click #nymphButton": function(nymphEgg) {
      nymphEgg = $("#nymphField").val()
      Meteor.call("insertNymphMethod", nymphEgg);
    //   Dummydata.insert({ nymph: $("#nymphField").val() });
      console.log("inserting a nymph");
      //      Meteor.call("insertNymphMethod", arg1, arg2 );

    },
    "click #removeNymphs": function() {
      Meteor.call("clearNymphsMethod");
      console.log("call remove nymphs from the server");  
    }
  });


  // ---------------------
  Template.nymphs.helpers({
    nymphs: function() {
      return Dummydata.find();
    }
});


  Template.player_infos.helpers({
    player: {
      name: 'Max',
      score: 20
    }
  })

Template.players_infos.helpers({
  players: [
    { name: 'Max', score: 20 },
    { name: 'Elo', score: 17 },
    { name: 'Pil', score: [13,12, 34] }
  ]
});

  // FlowLayout.render('layout1', { top: "player_infos", main: "players_infos" });

} // end  client


if (Meteor.isServer) {
  Meteor.startup(function () {


// allow/deny rules
    // Dummydata.allow({
    //   insert: function() { return 1 },
    //   remove: function() { return true },
    //   update: function() { return true }
    // }); 
    // code to run on server at startup
    Meteor.publish("nymphNames", function(){
      return Dummydata.find( { nymph: { $exists: true } } );
    });    
  });
  Meteor.methods({
    clearNymphsMethod: function () {
      Dummydata.remove({});
      return console.log("Server: Nymphs and dummy data cleared out");
// },
  //  insertNymphMethod: function () {
   //   var input = $("#nymphField").val();
   //   Dummydata.insert({ nymph: input });
  //     Dummydata.insert({ nymph: $("#nymphField").val() });
  //    return  console.log("clicked nymphButton");
    },
    insertNymphMethod: function (nymphEgg) {
      Dummydata.insert({ nymph: nymphEgg})
    }
  });
}                                                   

