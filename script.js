/**
 * Created by mkatona on 2017. 04. 04..
 */
$(document).ready(function(){
    addFrog();
});

function addFrog() {
    frog = $('<img src="frogger.png" id="frog" />');
    frog.css({
        position: "absolute",
        top: 420,
        left: 0
    });
    frog.appendTo('#gameArea');
}

