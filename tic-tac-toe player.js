  // Xie Bingshan, 
  // Wang Tingting,
  // Pei Shuyang 
var judge=0;

// if grid[i][j] == -1, the cell (i,j) is empty, else grid[i][j]
// is the player number who ticked that cell (0 or 1)
var grid = [[-1, -1, -1,-1,-1,-1,-1], 
            [-1, -1, -1,-1,-1,-1,-1], 
            [-1, -1, -1,-1,-1,-1,-1], 
            [-1, -1, -1,-1,-1,-1,-1], 
            [-1, -1, -1,-1,-1,-1,-1], 
            [-1, -1, -1,-1,-1,-1,-1]];

// the name of the players
var player_name = ["", ""];

// the image for each player
var player_image = ["B.png", "W.png"];

// the current player
var current_player = 0;

// the total number of clicks
var clicks = 0;

// if play is false, the clicks are disabled
var play = true;

//the number of stmps
var steps_number=0;

// return the other player
function next(player) {
  return (player + 1) % 2;
}

function is_winner(x,y) { 
  var m=0; 
  for(var i=0;i<=5;i++) {    
  for(var j=0;j<=6;j++) {     
    if(grid[i][j]==-1)   {m++; break;}
   } 
  }
  var n1=1; 
  for(var i=y-1; i>=0; i--){    
   if(grid[x][y]==grid[x][i])   {n1++; }   
     else 
    {break;}
   }

  for(var  i=y+1;i<=6;i++){
     if(grid[x][y]==grid[x][i])  {n1++;}     
      else   
      {break;}
  }   

  var n2=1; 
   for(var  i=x+1;i<=5;i++){    
    if(grid[x][y]==grid[i][y]) {n2++; }   
     else    
    {break; }  
  }
 
  var n3=1;    
  for(var i=1;x+i<=5&&y+i<=6;i++) {
       if(grid[x][y]==grid[x+i][y+i]) { n3++; }           
        else     
        {break; } 
  } 

  for(var  i=-1;x+i>=0&&y+i>=0;i--) {     
   if(grid[x][y]==grid[x+i][y+i]) {n3++; }  
    else    
    { break;}
   }
   
  var  n4=1; 
   for(var i=1;x-i>=0&&y+i<=6;i++) {     
      if(grid[x][y]==grid[x-i][y+i]) {n4++;}    
      else      
      { break;}
  }    

  for(var i=-1;x-i<=5&&y+i>=0;i--){ 
     if(grid[x][y]==grid[x-i][y+i]) {n4++; }    
    else 
        {break;}
  }   

  if(n1>=4||n2>=4||n3>=4||n4>=4){return 2;}  //2 means there is a winner
    else 
     if(m==0)  {return 1;}  //1 means there is drawn
        else    
           {return 0; }   // 0 means the game can be continued

}

function and_the_winner_is(player,row,column) {
    messages= document.getElementById("msg");
    messages.innerHTML=player_name[player]+" wins !!";
}

// process the click on the object image
function click_at(row, column,image) {

  if (judge==0){
   for (var i=5;i>=0;i--){
    steps_number++;
    if (grid[i][column]==-1) {x=i; break; }
   }
   grid[x][column]=current_player;
   var n=x*7+column+2;
   var img1=document.images[n];
   img1.src=player_image[current_player];
   judge=is_winner(x,column);

   if (judge==2){
     and_the_winner_is(current_player,row,column);
     document.getElementById("final").style.visibility="visible";  
   } else if (judge==1){
    messages= document.getElementById("msg");
    messages.innerHTML="It is a draw!!!";
    document.getElementById("final").style.visibility="visible";
   }else {
   current_player=next(current_player);
   msg(current_player);
   }
 }
}


// display a message in the element of ID "msg"
function msg(message) {
   messages= document.getElementById("msg");
   messages.innerHTML="It is "+ player_name[message]+" 's turn, please place a disk at any column !";

}


// set the name of the players
function set_players() {
  player_name[0]=document.getElementById("player1").value;
  //alert(player_name[0]);
  document.getElementById("first_player").innerHTML=player_name[0];

  player_name[1]=document.getElementById("player2").value;
  document.getElementById("second_player").innerHTML=player_name[1];

  document.getElementById("start").style.visibility="visible";
  document.getElementById("names").className="is_disabled";

}

// allow the game to start
function start_game() {
  document.getElementById("start").className="is_disabled";
    if (document.getElementById("check_second").checked){
      current_player=1;
    } else {
      current_player=0;
    }
    msg(current_player);
}

// process the play-again action
function play_again() {
     window.location.href="index2.html"; 
  
}

// process the quit action
function quit() {
  window.location.href="index.html";

}

