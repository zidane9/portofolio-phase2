// $(document).ready(function() {
//   $('#roller button.add').on('click', function() {
//     console.log("WAT")
//     $('.dice').append('<div class="die">0</div>')
//   })
//
//   $('#roller button.roll').on('click', function(){
//     $('.die').each(function(k, die){
//       var value = getRandom();
//       $(die).text(value)
//     })
//   })
// })
//
// function getRandom(){
//   return Math.floor((Math.random()*6)+1);
// }
//
// function setDiceValue(value){
//     var div =  document.getElementsByClassName("die");
//
// }

class Model {
  static randomizeDice(k,die){
    let value = Math.floor((Math.random()*6)+1)
    $(die).text(value)
  }
  static diceModel(){
    return '<div class="die">0</div>'
  }
}

class Controller {
  static addDice() {
    console.log('WAT');
    $('.dice').append(Model.diceModel)
  }

  static rollDice() {
    $('.die').each(Model.randomizeDice)
  }
}

class View {
  static run() {
    $('#roller button.add').on('click', Controller.addDice)
    $('#roller button.roll').on('click', Controller.rollDice)
  }
}

$(document).ready(View.run)
