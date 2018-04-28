__nextLevel = LEVEL_ONE;

function init(){
    Crafty.init(1408, 800, document.getElementById('game'));
    //Crafty.background('#FFFFFF url(landscape.png) no-repeat center center');
    Crafty.background('#000000');

    buildLevel(__nextLevel);
}

function buildLevel(levelMap){
    for(let i=0; i < levelMap.length; i++){
        let levelRow = levelMap[i];
        for(let j=0; j < levelRow.split("").length; j++){
            let levelBlock = levelRow[j];
            if(levelBlock === "W"){
                console.log("Build Wall");                
            } 
            else if(levelBlock === "P"){
                console.log("Build Platform");
            }
        }
    }
}