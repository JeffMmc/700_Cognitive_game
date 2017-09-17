function initMemoryRecord(){
    canvas = document.getElementById("gc");
    data = document.getElementById("data");

    score1 =  [['Day', 'Score'],['2004',  1000]];
    time1 =  [['Day', 'Time'],['2004',  1000]];
    rate1 =  [['Day', 'Correct Rate(%)'],['2004',  1000]];
    score2 =  [['Day', 'Score'],['2004',  1000]];
    time2 =  [['Day', 'Time'],['2004',  1000]];
    rate2 =  [['Day', 'Correct Rate(%)'],['2004',  1000]];
    score3 =  [['Day', 'Score'],['2004',  1000]];
    time3 =  [['Day', 'Time'],['2004',  1000]];
    rate3 =  [['Day', 'Correct Rate(%)'],['2004',  1000]];

    var dataTable = document.getElementById("memory_table");

    var i = 0;
    var levelA = 1, levelB = 1, levelC = 1;
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

        //Classify play record by level

        switch (userdata.level){
            case 1:
                score1[levelA] = [levelA, parseInt(userdata.score)];
                time1[levelA] = [levelA, parseInt(userdata.time)];
                rate1[levelA] = [levelA, parseInt(correctRate) ];
                levelA+=1;
                break;
            case 2:
                score2[levelB] = [levelB, parseInt(userdata.score)];
                time2[levelB] = [levelB, parseInt(userdata.time)];
                rate2[levelB] = [levelB, parseInt(correctRate) ];
                levelB+=1;
                break;
            case 3:
                score3[levelC] = [levelC, parseInt(userdata.score)];
                time3[levelC] = [levelC, parseInt(userdata.time)];
                rate3[levelC] = [levelC, parseInt(correctRate) ];
                levelC+=1;
                break;
        }
    }
}

/*
* Drawing charts for each status
* Mostly duplicate but don't have better solution
* */
function drawScoreChartA(){
    var data = google.visualization.arrayToDataTable(score1);
    var options = {
        title: 'Score Record',
        curveType: 'function',
        legend: { position: 'bottom' }
    };
    var chart = new google.visualization.LineChart(document.getElementById('score_chartA'));
    chart.draw(data, options);
}

function drawScoreChartB(){
    var data = google.visualization.arrayToDataTable(score2);
    var options = {
        title: 'Score Record',
        curveType: 'function',
        legend: { position: 'bottom' }
    };
    var chart = new google.visualization.LineChart(document.getElementById('score_chartB'));
    chart.draw(data, options);
}

function drawScoreChartC(){
    var data = google.visualization.arrayToDataTable(score3);
    var options = {
        title: 'Score Record',
        curveType: 'function',
        legend: { position: 'bottom' }
    };
    var chart = new google.visualization.LineChart(document.getElementById('score_chartC'));
    chart.draw(data, options);
}

function drawTimeChartA(){
    var data = google.visualization.arrayToDataTable(time1);
    var options = {
        title: 'Clear Time',
        curveType: 'function',
        legend: { position: 'bottom' }
    };
    var chart = new google.visualization.LineChart(document.getElementById('time_chartA'));
    chart.draw(data, options);
}

function drawTimeChartB(){
    var data = google.visualization.arrayToDataTable(time2);
    var options = {
        title: 'Clear Time',
        curveType: 'function',
        legend: { position: 'bottom' }
    };
    var chart = new google.visualization.LineChart(document.getElementById('time_chartB'));
    chart.draw(data, options);
}

function drawTimeChartC(){
    var data = google.visualization.arrayToDataTable(time3);
    var options = {
        title: 'Clear Time',
        curveType: 'function',
        legend: { position: 'bottom' }
    };
    var chart = new google.visualization.LineChart(document.getElementById('time_chartC'));
    chart.draw(data, options);
}

function drawRateChartA(){
    var data = google.visualization.arrayToDataTable(rate1);
    var options = {
        title: 'Accuracy',
        curveType: 'function',
        legend: { position: 'bottom' }
    };
    var chart = new google.visualization.LineChart(document.getElementById('rate_chartA'));
    chart.draw(data, options);
}

function drawRateChartB(){
    var data = google.visualization.arrayToDataTable(rate2);
    var options = {
        title: 'Accuracy',
        curveType: 'function',
        legend: { position: 'bottom' }
    };
    var chart = new google.visualization.LineChart(document.getElementById('rate_chartB'));
    chart.draw(data, options);
}

function drawRateChartC(){
    var data = google.visualization.arrayToDataTable(rate2);
    var options = {
        title: 'Accuracy',
        curveType: 'function',
        legend: { position: 'bottom' }
    };
    var chart = new google.visualization.LineChart(document.getElementById('rate_chartC'));
    chart.draw(data, options);
}