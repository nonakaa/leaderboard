
PlayersList = new Mongo.Collection('players');


if(Meteor.isClient){
  Template.leaderboard.helpers({
    'player': function(){
      return PlayersList.find({},{sort:{score:-1, name:1}});
    },
    'otherHelperFunction': function(){
      return "Some other function";
    },
    'selectedClass': function(){
      var playerId = this._id;
      var selectedPlayer = Session.get('selectedPlayer');
      if(playerId == selectedPlayer){
        return "selected"
      }
    }
  });

  Template.leaderboard.events({
'click .player': function(){
  var playerId = this._id;
  //console.log("You clicked a .player element");
  Session.set('selectedPlayer', playerId);
  var selectedPlayer = Session.get('selectedPlayer');
  console.log(selectedPlayer);
},
    'click .increment': function(){
  var selectedPlayer = Session.get('selectedPlayer');
  PlayersList.update({_id: selectedPlayer}, {$inc:{score:5}});
    },
    'click .decrement': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.update({_id: selectedPlayer}, {$inc:{score:-5}});
    },
    'selectedPlayer': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      return PlayersList.findOne({ _id: selectedPlayer });
    }
  });
}
if(Meteor.isServer){

}