class Game{
    constructor(){

    }

    getState(){
       var gamestateref = database.ref('gamestate');
       gamestateref.on("value",function(data){
           gamestate=data.val();
       })
    }
    update(state){
        database.ref('/').update({
            gamestate:state
        });
    }
    updaterank(ranker){
    database.ref('/').update({
        carsatend:ranker
    })
}
   async start(){
        if(gamestate===0){
            player=new Player();
            var playercountref = await database.ref('playercount').once("value");
            if(playercountref.exists()){
               playercount=playercountref.val();
               player.getCount();
            }
            form=new Form();
            form.display();

        }
        car1 = createSprite(100,200);
        car1.addImage("car1",c1);
        car2 = createSprite(300,200);
        car2.addImage("car2",c2);
        car3 = createSprite(500,200);
        car3.addImage("car3",c3);
        car4 = createSprite(700,200);
        car4.addImage("car4",c4);
        cars=[car1,car2,car3,car4];
    }
   play(){
    form.hide();
   // textSize(30);
    //text("Game_Start",120,100);
    Player.getPlayerInfo();
    player.getcarsatend();
    if(allPlayers !== undefined){
        background("#c68767");
        image(track,0,-displayHeight*4,displayWidth,displayHeight*5);
        var index = 0;
        var x=175;
        var y;
     //var display_pos = 130;
     for(var plr in allPlayers){
         index=index+1;
         x=x+200;
         y=displayHeight-allPlayers[plr].distance;
         cars[index-1].x=x;
         cars[index-1].y=y;
         if(index===player.index){
             stroke(10);
             fill("red");
             ellipse(x,y,60,60);
             cars[index-1].shapeColor="red";
             camera.position.x=displayWidth/2;
             camera.position.y=cars[index-1].y;
         }
         /*if(plr==="player"+player.index){
           fill("red");
         }
         else{
             fill("black");
         }
     display_pos+=20;
     textSize(15);
     text(allPlayers[plr].name + ": "+allPlayers[plr].distance,120,display_pos);*/
    }
   }
   if(keyIsDown(UP_ARROW) && player.index !== null){
player.distance+=10
player.update();
   
   }
   if(player.distance>3860){
       gamestate=2;
       player.rank+=1;
       Player.updatecarsatend(player.rank);
       fill("red");

       textSize(25);
       text("game ended",displayWidth/2,displayHeight-player.distance);
       text("YOUR_RANK_IS :"+player.rank,displayWidth/2-50,displayHeight-3900);
   }
   drawSprites();
   
}
end(){
    console.log("game ended");
    console.log(player.rank);
    
}
}
