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
    color: getRandomColor(),
    name: 'Hythonia the cruel',
    head_url: 'http://www.placecage.com/c/200/200', // optional, but encouraged!
    taunt: "How about a hiss ", // optional, but encouraged!
  }

  return res.json(data)
})

// Handle POST request to '/move'
router.post('/move', function (req, res) {
  // NOTE: Do something here to generate your move
  //console.log(req.body);

  // Response data
  var data = getMove(req.body);
  console.log(data);
  return res.json(data)
})
function getMove(world){
  let moves = checkBounds(world);
  let response = {move:moves[Math.floor((Math.random()*moves.length))],taunt:'I will destroy you all!'}
  if(world.you.health<25){
    response = setPath(moves,world,response);
  }else{
    response = cyclePath(moves,world,response);
  }
  console.log(response);
  if(response.move.length===0){
    return {move:'up',taunt:'Good Game everyone!'};
  }
  return response;
}
function checkBounds(world){
  //console.log(world);
  let result = [];
  let x = world.you.body.data[0].x;
  let y = world.you.body.data[0].y;
  if(!isBlocked(world,x+1,y)){
    result.push('right');
  }
  if(!isBlocked(world,x-1,y)){
    result.push('left');
  }
  if(!isBlocked(world,x,y+1)){
    result.push('down');
  }
  if(!isBlocked(world,x,y-1)){
    result.push('up');
  }
  console.log('Valid moves:'+result);
  return result;
}
function isBlocked(world,x,y){
  if(x>=world.width||y>=world.height||x<0||y<0){
    //console.log('Move :'+x+','+y+' Out of bounds');
    return true;
  }
  for(let i in world.you.body.data){
    if(world.you.body.data[i].x ===x && world.you.body.data[i].y ===y){
      //console.log('Move :'+x+','+y+'self collision');
      return true;
    }
  }
  for(let i in world.snakes.data){
    if(world.snakes.data[i].name!=world.you.name){
        for(let a = -1;a<2;a++){
          for(let b = -1 ; b<2;b++){
            //console.log(a,b);
            if(world.snakes.data[i].body.data[0].y === y+a&&world.snakes.data[i].body.data[0].x === x+b){
              return true;
            }
          }
        }
      }
    for(let j in world.snakes.data[i].body.data){

      if(world.snakes.data[i].body.data[j].x ===x && world.snakes.data[i].body.data[j].y===y){
        //console.log('Move :'+x+','+y+' collision with enemy snake');
        return true;
      }
    }
  }
  return false;

}
function cyclePath(moves,world,response){
  let target = world.you.body.data[world.you.body.data.length];
  console.log(target);
  if(target){}
    for(let i in moves){
        if(moves[i]=== 'up' && target.y>y){
          result.push(moves[i]);
        }
        if(moves[i]==='down' && target.y<y){
          result.push(moves[i]);
        }
        if(moves[i]==='left' && target.x<x){
          result.push(moves[i]);
        }
        if(moves[i]==='right' && target.x>x){
          result.push(moves[i]);
        }
      }
    response.move =result[Math.floor(Math.random()*result.length)];
    response.taunt = "Cycling, targetting " + target;
    return response;
  }
  return response;
}
function setPath(moves,world,response){
  let target = setTarget(world);
  let result = [];
  let x = world.you.body.data[0].x;
  let y = world.you.body.data[0].y;
  if(target){
    console.log(target);
    for(let i in moves){
      if(moves[i]=== 'up' && target.y>y){
        result.push(moves[i]);
      }
      if(moves[i]==='down' && target.y<y){
        result.push(moves[i]);
      }
      if(moves[i]==='left' && target.x<x){
        result.push(moves[i]);
      }
      if(moves[i]==='right' && target.x>x){
        result.push(moves[i]);
      }
    }
    response.taunt = "Finding Food, targetting " + target;
    response.move =result[Math.floor(Math.random()*result.length)];
  }
  return response;
}
function setTarget(world){
  let result=0;
  let x = world.you.body.data[0].x;
  let y = world.you.body.data[0].y;
  let temp = 9999;
  for(let i in world.food.data){
    if(getDistance(world.food.data[i])<temp){
      result = world.food.data[i];
      temp = world.food.data[i];
    }
  }
  if(result === 0){
    return false;
  }
  return result;
}
function getDistance(x,y,dx,dy){
  return Math.abs(x-dx)+Math.abs(y-dy);
}


module.exports = router
