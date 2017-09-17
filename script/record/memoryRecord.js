function initMemoryRecord(){
    canvas = document.getElementById("gc");
    data = document.getElementById("data");

    var dataTable = document.getElementById("memory_table");

    var i = 0;
    while(localStorage.getItem(currentUser + 'Memory' + i) != null){
        var row = document.createElement("tr");
        var userdata = JSON.parse(localStorage.getItem(currentUser + 'Memory' + i));

        //General records
        var play = document.createElement("th");
        var score = document.createElement("th");
        var level = document.createElement("th");
        var time = document.createElement("th");
        var hint = document.createElement("th");

        play.innerHTML = i+1;
        score.innerHTML = userdata.score;
        level.innerHTML = userdata.level;
        time.innerHTML = userdata.time;
        hint.innerHTML = userdata.hint;

        //Correct rate
        var correct = document.createElement("th");
        var wrong = document.createElement("th");
        var rate = document.createElement("th");
        correct.innerHTML = userdata.correct;
        wrong.innerHTML = userdata.wrong;
        var correctRate = (userdata.correct / (userdata.correct + userdata.wrong)) *100;
        rate.innerHTML = correctRate.toFixed(2);

        row.appendChild(play);
        row.appendChild(score);
        row.appendChild(level);
        row.appendChild(time);
        row.appendChild(hint);
        row.appendChild(correct);
        row.appendChild(wrong);
        row.appendChild(rate);

        dataTable.appendChild(row);

        i+=1;
    }
}