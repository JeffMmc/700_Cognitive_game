function initMultitaskingRecord() {
    canvas = document.getElementById("gc");
    data = document.getElementById("data");

    chartData =  [['Day', 'Score'],['2004',  1000]];
    comboData =  [['Day', 'Max Combo'],['2004',  1000]];
    stoneData =  [['Day', 'Success Rate(%)'],['2004',  1000]];
    gemData =  [['Day', 'Success Rate(%)'],['2004',  1000]];
    chestData =  [['Day', 'Success Rate(%)'],['2004',  1000]];

    var dataTable = document.getElementById("data_table");

    var i = 0;
    //Iterate all playhistory of the user
    while(localStorage.getItem(currentUser + 'Mt' + i) != null){
        var row = document.createElement("tr");

        //General data, score and combo
        var play = document.createElement("th");
        var score = document.createElement("th");
        var combo = document.createElement("th");

        var userdata = JSON.parse(localStorage.getItem(currentUser + 'Mt' + i));

        play.innerHTML = i+1;
        score.innerHTML = userdata.score;
        combo.innerHTML = userdata.combo;

        row.appendChild(play);
        row.appendChild(score);
        row.appendChild(combo);

        //Stone data
        var block = document.createElement("th");
        var blockS = document.createElement("th");
        var blockR = document.createElement("th");

        block.innerHTML = userdata.MtBl;
        blockS.innerHTML = userdata.MtBlS;
        var blockRate = (userdata.MtBlS / userdata.MtBl) * 100;
        blockR.innerHTML = blockRate.toFixed(2);

        row.appendChild(block);
        row.appendChild(blockS);
        row.appendChild(blockR);

        //Gem data
        var bonus = document.createElement("th");
        var bonusS = document.createElement("th");
        var bonusR = document.createElement("th");

        bonus.innerHTML = userdata.MtBo;
        bonusS.innerHTML = userdata.MtBoS;
        var bonusRate = (userdata.MtBoS / userdata.MtBo) * 100;
        bonusR.innerHTML = bonusRate.toFixed(2);

        row.appendChild(bonus);
        row.appendChild(bonusS);
        row.appendChild(bonusR);

        //Chest data
        var breakable = document.createElement("th");
        var breakableS = document.createElement("th");
        var breakableR = document.createElement("th");

        breakable.innerHTML = userdata.MtBr;
        breakableS.innerHTML = userdata.MtBrS;
        var breakableRate = (userdata.MtBrS / userdata.MtBr) * 100;
        breakableR.innerHTML = breakableRate.toFixed(2);

        row.appendChild(breakable);
        row.appendChild(breakableS);
        row.appendChild(breakableR);

        dataTable.appendChild(row);
        console.log(userdata.score);
        i += 1;
        chartData[i] = ["Play" + i,  parseInt(userdata.score)];
        comboData[i] = ["Play" + i,  parseInt(userdata.combo)];
        stoneData[i] = ["Play" + i, parseInt(blockRate) ];
        gemData[i] = ["Play" + i,  parseInt(bonusRate)];
        chestData[i] = ["Play" + i,  parseInt(breakableRate)];
    }

    var backButton = document.createElement("button");
    backButton.innerHTML = "Back";
    backButton.onclick = function(){
        window.location.replace("menu.html");
    }

    var replayButton = document.createElement("button");
    replayButton.innerHTML = "Replay";
    replayButton.onclick = function(){
        window.location.replace("multitasking.html");
    }
}