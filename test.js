function getMove(world){
  let moves = checkBounds(world);
  console.log('Bounds Check Complete, Remaining moves:'+moves)
  if(moves.length===0){
    console.log('No valid Move');
    return {move:'up',taunt:'Good Game everyone!'};
  }else if (moves.length===1){
    return {move:moves[0],taunt:'I have no choice and I must scream'};
  }
  let response = {move:moves[Math.floor((Math.random()*moves.length))],taunt:'I will destroy you all!'}
  //if(world.you.health<50){
    response.taunt = 'Going for food'
    response = setPath(moves,world,response);
  /*}else{
    response.taunt = 'cycling'
    response = cyclePath(moves,world,response);
  }*/
  //console.log(response);

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
  //console.log('Valid moves:'+result);
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
            if((a===0 || b===0) && (a!==b)){
              if(world.snakes.data[i].body.data[0].y === y+a&&world.snakes.data[i].body.data[0].x === x+b && world.snakes.data[i].length>=world.you.length){
                return true;
              }
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
  let target = world.you.body.data[world.you.body.data.length-1];
  let x = world.you.body.data[0].x;
  let y = world.you.body.data[0].y;
  console.log(world.you.body.data.length);
  console.log(target);
  let result = [];
  if(target){
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
    if(result.length===0){
      return response;
    }
    response.move =mostSpace(result,world);
    response.taunt = "Cycling, targetting " + target.toString();
    return response;
  }
  return response;
}

function setPath(moves,world,response){
  let target = setTarget(world);
  let result = [];
  let x = world.you.body.data[0].x;
  let y = world.you.body.data[0].y;
  //console.log('in set target:'+target);
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
    response.taunt = 'Finding food at x:'+target.x+' y:'+target.y;
    response.move =mostSpace(result,world);
  }
  return response;
}
function setTarget(world){
  let result=0;
  let x = world.you.body.data[0].x;
  let y = world.you.body.data[0].y;
  let temp = 9999;
  for(let i in world.food.data){
    if(getDistance(x,y,world.food.data[i].x,world.food.data[i].y)<temp){
      result = world.food.data[i];
      temp = world.food.data[i];
    }
  }
  if(result === 0){
    console.log('no food found');
    return false;
  }
  return result;
}
function mostSpace(moves,world){
  let move = false;
  let highest = 0;
  let temp = 0;
  let x = world.you.body.data[0].x;
  let y = world.you.body.data[0].y;
  for(let i in moves){
      if(moves[i]=== 'up'  ){
        temp = weighArea(world,x,y-1);
        if(temp>highest){
          highest= temp;
          move = moves[i];
        }
      }
      if(moves[i]==='down'){
        temp = weighArea(world,x,y+1);
        if(temp>highest){
          highest= temp;
          move = moves[i];
        }
      }
      if(moves[i]==='left'){
        temp = weighArea(world,x-1,y);
        if(temp>highest){
          highest= temp;
          move = moves[i];
        }
      }
      if(moves[i]==='right'){
        temp = weighArea(world,x+1,y);
        if(temp>highest){
          highest= temp;
          move = moves[i];
        }
      }
    }
  if(!move){
    return moves[Math.dloor((Math.random()*result.length))];
  }
  return move;

}
function getDistance(x,y,dx,dy){
  return Math.abs(x-dx)+Math.abs(y-dy);
}
function weighArea(world,a,b){
  let arr = [];
  let temp = [];
  for(let x =0;x<world.width;x++){
    temp = [];
    for(let y = 0; y <world.height;y++){
      temp.push(isBlocked(world,x,y));
    }
    arr.push(temp);
  }
  printArr(arr);
  let num = 0
  function recursive(x,y){
    arr[x][y]=true;
    num+=1;
    if(num>9000){
      return;
    }
    if(x<arr.length-1){
      if(arr[x+1][y]===false){
        recursive(x+1,y);
      }
    }
    if(x>0){
      if(arr[x-1][y]===false ){
        recursive(x-1,y);
      }
    }
    if(y<arr.length-1){
      if(arr[x][y+1]===false){
        recursive(x,y+1);
      }
    }
    if(y>0){
      if(arr[x][y-1]===false){
        recursive(x,y-1);
      }
    }
    return;
  }
  recursive(a,b);
  return num;
}
function printArr(arr){
  let temp ='';
  for(let i in arr[0]){
    temp = '';
    for (let j in arr) {
      if(arr[j][i]){
        temp+='X';
      }else{
        temp+='_';
      }
    }
    console.log(temp);
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
              y: 18
            },
            {
              object: "point",
              x: 11,
              y: 18
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

console.log(weighArea(world,10,19));
console.log(weighArea(world,12,13));
console.log(getMove(world));