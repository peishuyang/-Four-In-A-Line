<!-- Xie Bingshan, 
  Wang Tingting,
  Pei Shuyang -->
<!DOCTYPE html>
<html>

  <head>
    <title>connect four</title>
    <meta charset="utf-8" />
    <link type="text/css" rel="stylesheet" href="css/tic-tac-toe.css" />
    <script type="text/javascript" src="js/tic-tac-toe0909.js"></script>
  </head>

<body>

<h1>CONNECT FOUR</h1>

<div id="right">
  
  <div id="names">
    <h3>Enter the player names</h3>
    <img src="B.png" alt="B" /><input id="player1" type="text" value="player"/><br />
    <img src="W.png" alt="W" /><input id="player2" type="text" value="computer"/><br />
    <button id="set_players">OK</button>
  </div>
  
  <div id="start" class="dialog">
    <h3>Who starts the game?</h3>
    <input id="check_first" type="radio" name="who" checked="checked" /><span id="first_player"></span>
    <input id="check_second" type="radio" name="who" /><span id="second_player"></span><br />
    <button id="start_game">OK</button>
  </div>
  
  <div id="final" class="dialog">
    <h3 id="winner"></h3>
    Do you want to play again?<br />
    <button id="play_again">Yes</button>
    <button id="quit">No</button>
  </div>
  
</div>

<?php
     $img=array();
      $row=5;
      $column=6;
?>

         <!-- Menu: -->
        <div id="menu"  title="Open options">
            Options
        </div>
        <div id="new_game"  title="New game">
            New game
        </div>
         <!-- Fin of Menu. -->
         <!-- Menu of options: -->
        <div id="options" class="invisibles" >
            <div id="x" title="Close options">[x]&nbsp;</div>
            <div id="aform">
                <form id = "pvcform" onSubmit="apply_options(); return false;">
                   <center>
                       <fieldset id="setform">
                           <legend id="pvc_legend1" title="Options menu">Options</legend>

                           <label id="set_board_width" for="board_width" accesskey="w" title="Board width (number of holes)"><b>&nbsp; Board <u>w</u>idth:</b> 
                              <input type="text" name="board_width" id="board_width" value="<?=$column+1?>"   size="4" maxlength="3" accesskey="w"></label>
                           <br>
                           <br>
                           <label id="set_board_height" for="board_height" accesskey="h" title="Board height (number of holes)"><b>&nbsp; Board <u>h</u>eight:</b> 
                              <input type="text" name="board_high" id="board_height" value="<?=$row+1?>" size="4" maxlength="3" accesskey="h"></label>
                           <br>
                           <br>
                           <label id="choose_1player" for="first_player" accesskey="i" title="Who start the game">
                           <b>&nbsp; F<u>i</u>rst player:</b>
                               <select id="first_player_in_option" name="first_player_in_option" accesskey="i">
                                 <option id="0" value="0"></option>
                                 <option id="1" value="1"></option>
                               </select>
                           </label>
                           <br>
                           <br>
                           <center><input id="button_apply" type="submit" value="Apply" name="button_apply" accesskey="a" title="Apply options"></center>
                           <br>
                       </fieldset>
                    </center>
                </form>
            </div>
        </div>
        <div id="options_shadow" class="invisibles"></div>
        <!-- Fin of Menu of options. -->

<div id="grid">
<table cellspacing="0" cellpadding="0">
  <tbody>
    <tr>
      <?php 
      for($i=0;$i<=$row;$i++){
        for($j=0;$j<=$column;$j++){
          ?> <td>
               <div class = "little_grid">
                 <div class="grid_invisible" onclick="click_at(<?=$i?>,<?=$j?>,this)"></div>
                 <div class="grid_img"> <img align="center" src="white.png" > </div>
               </div>
             </td>
        <?php
        }
        ?> </tr>
        <tr>
      <?php }
      ?>
    </tr>   
  </tbody>
</table>
</div>
<h2 id="msg"></h2>
</body>
</html>
