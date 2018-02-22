function getMove(world){
  moves = checkBounds(world);
  let response = {move:moves[Math.floor((Math.random()*moves.length))],taunt:'I will destroy you all!'}
  if(world.you.)
  console.log(response);
  if(response.move.length===0){
    return {move:'up',taunt:'Good Game everyone'};
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
    console.log('Move :'+x+','+y+' Out of bounds');
    return true;
  }
  for(let i in world.you.body.data){
    if(world.you.body.data[i].x ===x && world.you.body.data[i].y ===y){
      console.log('Move :'+x+','+y+'self collision');
      return true;
    }
  }
  for(let i in world.snakes.data){
    for(let j in world.snakes.data[i].body.data){
      if(world.snakes.data[i].body.data[j].x ===x && world.snakes.data[i].body.data[j].y===y){
                  console.log('Move :'+x+','+y+' collision with enemy snake');
        return true;
      }
    }
  }
  return false;

}
function setPath(moves,world){

}






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
              y: 15
            },
            {
              object: "point",
              x: 13,
              y: 19
            },
            {
              object: "point",
              x: 13,
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


console.log(getMove(world));