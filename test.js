function getMove(world){
  moves = checkBounds(world);
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
  if(moves.includes('up')){
    response.move = 'up';
  }
    if(moves.includes('left')){
        response.move = 'left';
  }
    if(moves.includes('down')){
        response.move = 'down';
  }
    if(moves.includes('right')){
        response.move = 'up';
  }
  return response;

}
function setPath(moves,world,result){
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
      if(moves[i]==='right'){
        result.push(moves[i]);
      }

    }
    response.move =result[Math.dloor((Math.random()*result.length))];
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
function weighArea(moves,world){
  let arr = [];
  let temp = [];
  for(let x =0;x<world.width;x++){
    temp = [];
    let str = '';
    for(let y = 0; y <world.height;y++){
      temp.push(isBlocked(world,x,y));
      if(isBlocked(world,x,y)){
        str+='X';
      }else{
        str+='_'
      }
    }
    console.log(str);
    arr.push(temp);
  }
  //console.log(arr);
  for(let x in arr){
    for(let y in arr[x]){

    }
  }
}

console.log(getDistance(0,0,3,4));

let world = {
  food: {
    data: [
      {
        object: "point",
        x: 0,
        y: 9
      }
    ],
    object: "list"
  },
  height: 20,
  id: 1,
  object: "world",
  snakes: {
    data: [
      {
        body: {
          data: [
            {
              object: "point",
              x: 9,
              y: 19
            },
            {
              object: "point",
              x: 10,
              y: 19
            },
            {
              object: "point",
              x: 11,
              y: 19
            },
            {
              object: "point",
              x: 12,
              y: 19
            }

          ],
          object: "list"
        },
        health: 100,
        id: "58a0142f-4cd7-4d35-9b17-815ec8ff8e70",
        length: 3,
        name: "Sonic Snake",
        object: "snake",
        taunt: "Gotta go fast"
      },
      {
        body: {
          data: [
            {
              object: "point",
              x: 8,
              y: 15
            },
            {
              object: "point",
              x: 7,
              y: 15
            },
            {
              object: "point",
              x: 6,
              y: 15
            }
          ],
          object: "list"
        },
        health: 100,
        id: "48ca23a2-dde8-4d0f-b03a-61cc9780427e",
        length: 3,
        name: "Typescript Snake",
        object: "snake",
        taunt: ""
      }
    ],
    object: "list"
  },
  turn: 0,
  width: 20,
  you: {
    body: {
      data: [
        {
          object: "point",
          x: 8,
          y: 15
        },
        {
          object: "point",
          x: 7,
          y: 15
        },
        {
          object: "point",
          x: 6,
          y: 15
        }
      ],
      object: "list"
    },
    health: 100,
    id: "48ca23a2-dde8-4d0f-b03a-61cc9780427e",
    length: 3,
    name: "Typescript Snake",
    object: "snake",
    taunt: ""
  }
}

weighArea(['up','down'],world);
//console.log(getMove(world));