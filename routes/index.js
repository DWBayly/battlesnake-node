var express = require('express')
var router  = express.Router()
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
// Handle POST request to '/start'
router.post('/start', function (req, res) {
  // NOTE: Do something here to start the game

  // Response data
  var data = {
    color: getRandomColor,
    name: 'Hythonia the cruel',
    head_url: 'http://www.placecage.com/c/200/200', // optional, but encouraged!
    taunt: "How about a hiss ", // optional, but encouraged!
  }

  return res.json(data)
})

// Handle POST request to '/move'
router.post('/move', function (req, res) {
  // NOTE: Do something here to generate your move
  console.log(req.body);

  // Response data
  var data = getMove(world);

  return res.json(data)
})
function getMove(world){
  let moves = ['up','down','left','right'];
  let index = 0;
  return {move:moves[0],taunt:'I will destroy you all!'}
}


module.exports = router
