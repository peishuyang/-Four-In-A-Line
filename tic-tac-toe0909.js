var judge=0;
var total_rows=5;
var total_columns=6;
var necessary_cards=4;
var promising_hollow=promising_hollow_horizontal=promising_hollow_vertical=
    promising_hollow_diagonal_left=promising_hollow_diagonal_right=-1;
var first_player=0; //Set user as first player.
var total_rows_maximum = 100; 
var game_can_start=false;
var chage_option=false;
var outtime = 700; //time to wait for computer
var finish_one_step = true;

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

// the current player,assum 0 represet user and 1 represets computer. 
var current_player = 0;

// the total number of clicks
var clicks = 0;

// if play is false, the clicks are disabled
var play = true;

//Functiton to initiate game:
function initiate_option(){
  document.getElementById("board_width").value = total_columns+1;
  document.getElementById("board_height").value = total_rows+1;
} 

// return the other player
function next(player) {
  return (player + 1) % 2;
}

function is_winner(x,y,consecutive_pieces,grid_friction) { 
  var m=0; 
  for(var i=0;i<=total_rows;i++) {    
  for(var j=0;j<=total_columns;j++) {     
    if(grid[i][j]==-1)   {m++; break;}
   } 
  }
  var n1=1;  //row
  for(var i=y-1; i>=0; i--){    
   if(current_player==grid_friction[x][i])   {n1++; }   
     else 
    {break;}
   }

  for(var  i=y+1;i<=total_columns;i++){
     if(current_player==grid_friction[x][i])  {n1++;}     
      else   
      {break;}
  }   
if(n1>=consecutive_pieces){promising_hollow_horizontal=y;}

  var n2=1; //column
   for(var  i=x+1;i<=total_rows;i++){    
    if(current_player==grid_friction[i][y]) {n2++; }   
     else    
    {break; }  
  }
if(n2>=consecutive_pieces){promising_hollow_vertical=y;}

 
  var n3=1;    //left diagonal line
  for(var i=1;x+i<=total_rows&&y+i<=total_columns;i++) {
       if(current_player==grid_friction[x+i][y+i]) { n3++; }           
        else     
        {break; } 
  } 

  for(var  i=-1;x+i>=0&&y+i>=0;i--) {     
   if(current_player==grid_friction[x+i][y+i]) {n3++; }  
    else    
    { break;}
   }
if(n3>=consecutive_pieces){promising_hollow_diagonal_left=y;}

   
  var  n4=1;  //right diagonal line
   for(var i=1;x-i>=0&&y+i<=total_columns;i++) {     
      if(current_player==grid_friction[x-i][y+i]) {n4++;}    
      else      
      { break;}
  }    

  for(var i=-1;x-i<=total_rows&&y+i>=0;i--){ 
     if(current_player==grid_friction[x-i][y+i]) {n4++; }    
    else 
        {break;}
  }   
if(n4>=consecutive_pieces){promising_hollow_diagonal_right=y;}


  if(n1>=consecutive_pieces||n2>=consecutive_pieces||n3>=consecutive_pieces||n4>=consecutive_pieces){ 
    var hollows = new Array(promising_hollow_horizontal, promising_hollow_vertical, promising_hollow_diagonal_left,promising_hollow_diagonal_right);
    while (promising_hollow < 0) { promising_hollow = hollows[parseInt(Math.random() * (hollows.length))]; }
    return 2;
  }   
  if(m==0)  {return 1;}  //1 means there is drawn,no free hollow on the board. Judge=1.
        else    
           {return 0; }   // 0 means the game can be continued. Judge=0;

}

//Function shows who won.
function and_the_winner_is(player) {  
    messages = document.getElementById("msg");
    messages.innerHTML = player_name[player]+" wins !!";
}

// process the click on the object image
function click_at(row, column,image) { 
if(game_can_start && finish_one_step){
  finish_one_step = false;
  if (judge==0){
   var x = actual_cell_to_put_piece(row, column);
   
   if(x>=0){clicks++;}

   grid[x][column]=current_player;
   change_picture(x,column);
   judge=is_winner(x,column,necessary_cards,grid);
   finish_one_step = true;

   if (judge==2){
    show_winner();
   } else if (judge==1){
    show_draw();
   }else {
   change_to_next_player();
   finish_one_step = false;
   setTimeout('computer_turn()',outtime);
   }
 }
 }  
}
//Function to display winner.
function show_winner(){
     and_the_winner_is(current_player);
     document.getElementById("final").className="visibles";  
}

//Function to show a draw.
function show_draw(){
    messages = document.getElementById("msg");
    messages.innerHTML = "It is a draw!!!";
    document.getElementById("final").className="visibles";
}

//Function to change to next player and change msg.
function change_to_next_player(){
   current_player = next(current_player); //Change view to computer.
   msg(current_player);
}

//Fuction to change piece's picture on the playboard.
function change_picture(x,column){
  var n=x*(total_columns+1)+column+2;
  document.images[n].src=player_image[current_player];
  // var img1=pictures;
  // img1.src=player_image[current_player];
}

//Function to determine the cell to put the piece according to the cell you click on.
function actual_cell_to_put_piece(row, column){
    for (var i  =total_rows;i>=0;i--){
    if (grid[i][column]==-1) {return i }  //Check the lastest piece in the correspongding column.
   }
    return -1;
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

  document.getElementById("0").innerHTML=player_name[0];
  document.getElementById("1").innerHTML=player_name[1];
 
  document.getElementById("start").className="";  //////////////////////////change
  document.getElementById("names").className="is_disabled";

}

// allow the game to start
function start_game() {
  document.getElementById("start").className="is_disabled";
    if (document.getElementById("check_second").checked){
      current_player = 1;
      first_player = 1;
    } else {
      current_player = 0;
      first_player = 0;
    }
    document.getElementById("first_player_in_option").options[first_player].selected = true;
    msg(current_player);
    game_can_start=true;
    if(current_player==1){
      finish_one_step = false;
      setTimeout(computer_turn, outtime);
    }
}


// process the play-again action
function play_again() {
  game_can_start=false;
  current_player=first_player;
  if(chage_option){
    msg(current_player);
    chage_option=false;
  }else{ //just start a new game. No change in option.
    document.getElementById("msg").innerHTML="";
    document.getElementById("names").className="";
    document.getElementById("start").className="invisibles";
    document.getElementById("final").className="invisibles";

  }

  judge = 0;
  creat_grid();
  creat_board();
  game_can_start=true;
  if(current_player == 1){
       finish_one_step = false;
       setTimeout(computer_turn,outtime);}
}
function creat_grid(){
    for(var r = 0; r <= total_rows; r++){
      grid[r]=new Array();
    for(var c = 0;c <= total_columns; c++){
      grid [r][c] = -1;
    }
  } 
}
//Function to creat board
function creat_board(){
  var new_board = document.getElementsByTagName("tbody");
  var code_html = '<tr>';
  for(var r = 0;r <= total_rows; r++ ){
    for(var c = 0; c <= total_columns; c++){
      code_html += '<td><div class = "little_grid"><div class="grid_invisible" onclick="click_at('+r+','+c+',this)"></div><div class="grid_img"> <img align="center" src="white.png" > </div></div></td>';
    }
    code_html += '</tr><tr>';
  }
  code_html+='</tr>';
  new_board[0].innerHTML=code_html;

}

// process the quit action
function quit() {
  window.location.href="index.html";

}


//Function for computer to operate:
function computer_turn(){

   var best_hollow_column = choose_best_hollow_column();
   var row=actual_cell_to_put_piece(0,best_hollow_column);
   grid[row][best_hollow_column]=current_player;
   change_picture(row,best_hollow_column);

   judge=is_winner(row,best_hollow_column,necessary_cards,grid);
   finish_one_step = true;

   if (judge==2){
    show_winner();  
   } else if (judge==1){
    show_draw();
   }else{
    change_to_next_player();
   }


}

//Function choose the best hollow for computer:
function choose_best_hollow_column(){
    //If the player is the current user, returns -1:
  if (current_player == 0) { return -1; }                    
  //Variable stores the best hollow：
  var best_hollow = -1;

  //The computer search if there is a hollow where it can win with one single step:
  best_hollow = lookfor_best_hollow(1, necessary_cards, false,grid);
  //But if computer can not win with a single step, prevents the user from winning:
  if (best_hollow < 0) { best_hollow = lookfor_best_hollow(0, necessary_cards, false,grid); }
  //if the user is not going to win at the moment, impediments necessary_cards-1:
  if (best_hollow < 0 && necessary_cards-1 > 1) {  
  best_hollow = lookfor_best_hollow(1, necessary_cards-1, true,grid); }
  //If necessary_cards-1 is still can't get a result, try necessary_cards-2,-3;
  if (best_hollow < 0 && necessary_cards-1 > 1) { 
    for (records_loop=necessary_cards-1;records_loop>1; records_loop--) { 
      best_hollow = lookfor_best_hollow(1,records_loop, true,grid); 
      if (best_hollow >= 0) { break; }
  } 
  }
   //If still can not find any, try to stop user:
   if (best_hollow < 0 && necessary_cards-2 > 1) { 
     for (records_loop=necessary_cards-1; records_loop>1; records_loop--) { 
       best_hollow = lookfor_best_hollow(0, records_loop, true, grid); 
       if (best_hollow >= 0) { break; } 
     } 
   }
    //If there is no record with which to generate best hollow, a random number is calculated:
    if (best_hollow < 0){                     
       do { 
        best_hollow = parseInt(Math.random() * (grid.length)); 
      } while (grid[actual_cell_to_put_piece(0,best_hollow)][best_hollow] != -1)
    }
    return best_hollow;
}

//Function search for best hollow under a particular condition:
function lookfor_best_hollow(player,consecutive_pieces, recurrence, current_grid){
  var grid_friction = deepcopy(current_grid);

  var player_temp = current_player;
  current_player = player;

  var best_column_with_one_step = -1;
  for(var c = 0;c<=total_columns;c++){    
    var r = actual_cell_to_put_piece(0,c);
    if(r>=0&&(is_winner(r,c,consecutive_pieces,grid_friction)==2)){ //got one
      best_column_with_one_step = promising_hollow;
      grid_friction[r][best_column_with_one_step] = current_player;

      if(recurrence){//Change view to opponent.

        if(lookfor_best_hollow(next(player),necessary_cards,false,grid_friction)>=0){ //but this one make conponent win,reset.
             best_column_with_one_step = -1;
             grid_friction[r][best_column_with_one_step] = -1;           
             continue;
        }
      }
    }else{ //Haven't got one
      continue;
    }

    if(best_column_with_one_step>=0){break;}
  }
  reset_promising_hollow(); //Reset promising hollow.
  current_player=player_temp;
  return best_column_with_one_step;
}

//Function to reset promising_hollow:
function reset_promising_hollow(){
  promising_hollow = promising_hollow_vertical=promising_hollow_horizontal=promising_hollow_diagonal_right=
  promising_hollow_diagonal_left = -1;
}

//Function to deepcopy for multidimensional arrays
function deepcopy(a) {
            var out = [],i = 0,len = a.length;
            for (; i < len; i++) {
                if (a[i] instanceof Array){
                    out[i] = deepcopy(a[i]);
                }
                else out[i] = a[i];
            }
            return out;
}

function show_hide_options(){
  var all_grid_invisible = document.getElementsByClassName("grid_invisible");

  if (document.getElementById("options").className == "visibles") { 
    document.getElementById("options").className = "invisibles"; 
    document.getElementById("options_shadow").className = "invisibles";
    document.getElementById("menu").title = "Open options"; 
    document.getElementById("menu").title = "Open options"; 

    // for (var i = 0; i < all_grid_invisible.length; i++) {
    //   all_grid_invisible[i].className = "grid_invisible";
    // };
    var real_grid = document.getElementById("grid");
    real_grid.classList.remove("no_use");
  }

  else { 
    document.getElementById("options").className = "visibles";
    document.getElementById("options_shadow").className = "visibles";
    document.getElementById("menu").title = "Close options"; 
    //document.getElementById("grid").disabled = true;

    // for (var i = 0; i < all_grid_invisible.length; i++) {
    //   all_grid_invisible[i].className = "invisibles";
    // };
    var real_grid = document.getElementById("grid");
    real_grid.classList.add("no_use");
  }
}
                //Function that applies the options:
                function apply_options()
                {
                    //The options set are stored in variables for convenience:
                    var total_columns_set = parseInt(document.getElementById("board_width").value)-1;
                    var total_rows_set = parseInt(document.getElementById("board_height").value)-1;
                    var first_player_set = document.getElementById("first_player_in_option").value;
                    
                    //If the options are the same as set it is already in progress, exit the function:
                    if ( total_columns_set == total_columns && total_rows_set == total_rows &&first_player_set == first_player) { return false; }
                    
                    //Variable holds errors to send seteadas options, if any:
                    var errores = "";
                    
                    //Variable holds errors to send seteadas options, if any:...
                    if (total_rows_set == "" || total_rows_set < 2 || total_rows_set > total_rows_maximum || isNaN(total_rows_set)) { 
                      errores += "* height set max value " + total_rows_maximum + ".\n"; 
                      total_rows_set = false; 
                    } 
                    //If there have been mistakes, araise alert, restore values and exits the function:
                    if (errores != "")
                    {   //Aler error and reason:
                        alert("Options can't be apply right, because:\n" + errores);

                        //Restaura los valores del formulario de options:
                        if (!total_columns_set) { document.getElementById("total_columns").value = total_columns; }
                        if (!total_rows_set) { document.getElementById("board_height").value = total_rows; }
                       
                        //Exit the function:
                        return false;
                    }
                    //... but if they have not been mistakes, the options apply:
                    else
                    {
                        //Confirmation is requested and if accepted, will be:
                        if (confirm("Press ok to apply the options. Current game will be lost."))
                        {   //The options apply:
                            chage_option=true;
                            total_columns = total_columns_set;
                            total_rows = total_rows_set;
                            first_player = parseInt(first_player_set);
                            document.getElementById("start").disabled = true; 
                            //It restarts play with the new options:
                            play_again();
                            
                            //Exit function:
                            return true;
                        }
                        //... but if you cancel, you exit the function:
                        else { return false; }
                    }
                    //chage_option=true;
                }

function New_game(){
  if (confirm('Press ok to start a new game. Actual game will be lost.')) { 
    play_again(); 
  }
}
//function to make font-weight bold
function make_font_weight_bold(){
  this.style.fontWeight = 'bold';
}

//function to make font-weight bold
function make_font_weight_normal(){
  this.style.fontWeight = 'normal';
}

window.onload = function(){
  var initiate_option = document.getElementsByTagName("body");
  initiate_option[0].onload = initiate_option;

  var set_player = document.getElementById("set_players");
  set_player.onclick = set_players;

  var startgame = document.getElementById("start_game");
  startgame.onclick = start_game;

  var play_again1 = document.getElementById("play_again");
  play_again1.onclick = play_again;

  var quit1 = document.getElementById("quit");
  quit1.onclick = quit;
  
  var menu1 = document.getElementById("menu");
  menu1.onclick = show_hide_options;
  menu1.onmouseover = make_font_weight_bold;
  menu1.onmouseout = make_font_weight_normal;

  var newgame = document.getElementById("new_game");
  newgame.onclick = New_game;
  newgame.onmouseover = make_font_weight_bold;
  newgame.onmouseout = make_font_weight_normal;  

  var x1 = document.getElementById("x");
  x1.onclick = show_hide_options; 
  x1.onmouseover = make_font_weight_bold;
  x1.onmouseout = make_font_weight_normal; 
}