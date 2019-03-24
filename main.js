
var jsonData = [];
 jsonData[0] = {
    "columns": [
        ["x", 1542412800000, 1542499200000, 1542585600000, 1542672000000, 1542758400000, 1542844800000, 1542931200000, 1543017600000, 1543104000000, 1543190400000, 1543276800000, 1543363200000, 1543449600000, 1543536000000, 1543622400000, 1543708800000, 1543795200000, 1543881600000, 1543968000000, 1544054400000, 1544140800000, 1544227200000, 1544313600000, 1544400000000, 1544486400000, 1544572800000, 1544659200000, 1544745600000, 1544832000000, 1544918400000, 1545004800000, 1545091200000, 1545177600000, 1545264000000, 1545350400000, 1545436800000, 1545523200000, 1545609600000, 1545696000000, 1545782400000, 1545868800000, 1545955200000, 1546041600000, 1546128000000, 1546214400000, 1546300800000, 1546387200000, 1546473600000, 1546560000000, 1546646400000, 1546732800000, 1546819200000, 1546905600000, 1546992000000, 1547078400000, 1547164800000, 1547251200000, 1547337600000, 1547424000000, 1547510400000, 1547596800000, 1547683200000, 1547769600000, 1547856000000, 1547942400000, 1548028800000, 1548115200000, 1548201600000, 1548288000000, 1548374400000, 1548460800000, 1548547200000, 1548633600000, 1548720000000, 1548806400000, 1548892800000, 1548979200000, 1549065600000, 1549152000000, 1549238400000, 1549324800000, 1549411200000, 1549497600000, 1549584000000, 1549670400000, 1549756800000, 1549843200000, 1549929600000, 1550016000000, 1550102400000, 1550188800000, 1550275200000, 1550361600000, 1550448000000, 1550534400000, 1550620800000, 1550707200000, 1550793600000, 1550880000000, 1550966400000, 1551052800000, 1551139200000, 1551225600000, 1551312000000, 1551398400000, 1551484800000, 1551571200000, 1551657600000, 1551744000000, 1551830400000, 1551916800000, 1552003200000],
        ["y0", 37, 20, 32, 39, 32, 35, 19, 65, 36, 62, 113, 69, 120, 60, 51, 49, 71, 122, 149, 69, 57, 21, 33, 55, 92, 62, 47, 50, 56, 116, 63, 60, 55, 65, 76, 33, 45, 64, 54, 81, 180, 123, 106, 37, 60, 70, 46, 68, 46, 51, 33, 57, 75, 70, 95, 70, 50, 68, 63, 66, 53, 38, 52, 109, 121, 53, 36, 71, 96, 55, 58, 29, 31, 55, 52, 44, 126, 191, 73, 87, 255, 278, 219, 170, 129, 125, 126, 84, 65, 53, 154, 57, 71, 64, 75, 72, 39, 47, 52, 73, 89, 156, 86, 105, 88, 45, 33, 56, 142, 124, 114, 64],
        ["y1", 22, 12, 30, 40, 33, 23, 18, 41, 45, 69, 57, 61, 70, 47, 31, 34, 40, 55, 27, 57, 48, 32, 40, 49, 54, 49, 34, 51, 51, 51, 66, 51, 94, 60, 64, 28, 44, 96, 49, 73, 30, 88, 63, 42, 56, 67, 52, 67, 35, 61, 40, 55, 63, 61, 105, 59, 51, 76, 63, 57, 47, 56, 51, 98, 103, 62, 54, 104, 48, 41, 41, 37, 30, 28, 26, 37, 65, 86, 70, 81, 54, 74, 70, 50, 74, 79, 85, 62, 36, 46, 68, 43, 66, 50, 28, 66, 39, 23, 63, 74, 83, 66, 40, 60, 29, 36, 27, 54, 89, 50, 73, 52]
    ],
    "types": { "y0": "line", "y1": "line", "x": "x" },
    "names": { "y0": "#0", "y1": "#1" },
    "colors": { "y0": "#3DC23F", "y1": "#F34C44" }
};

var canvasSmall = document.getElementById('chartAllTime');
var canvasBig = document.getElementById('chartSelectedTime');
var canvasBigParent = canvasBig.parentNode;
var smallCanvasHeight = 100;
var bigCanvasHeight = canvasBig.offsetHeight;
var allCanvasWidth = window.innerWidth;

var data = []; // обьект для передачи данных  x y в функцию changeBigChard
var bigChartData = {};

var selectedTimeEl = document.getElementById('stw');
var hiddenTimeEl = document.getElementById('stg');

// Creating class (parent)

function Chart(width, height, data) {
    this.width = width;
    this.height = height;
    this.data = data;
    this.dataObj = {};
}
Chart.prototype.dataAnalysis = function (multiply, chartall) { // find max y and x length
    // находим насколько пропрорционально уменьшить данные по осям x y
    var obj = {};
    obj.chartall = chartall;
    obj.multiply = multiply || 1;
    obj.length = this.data.columns[0].length;
    obj.x = (this.width / obj.length).toFixed(4);
    var maxY = Math.max.apply(null, this.data.columns[obj.chartall[0] + 1].slice(1).concat(this.data.columns[obj.chartall[1]].slice(1)));
    obj.y = (maxY / this.height).toFixed(4);
    this.dataObj = obj;
}
Chart.prototype.buildChart = function (canvas, namberCharts, lineWidth) {  /// namberCharts -массив[0,2] с какого графика начинать рисовать и каким закончить
    var context = canvas.getContext('2d');
    var chartall = namberCharts; // массив с какого графика начинать(y0) строить и по какой(y1)
    this.dataAnalysis([1, 1], chartall);
    this.canvas = canvas;
    this.canvas.width = allCanvasWidth;
    this.canvas.height = this.height;
    //x y0 , y#1 ...
    for (var i = namberCharts[0]; i < +namberCharts[1]; i++) {
        context.beginPath();
        context.lineWidth = lineWidth || 1;
        context.lineJoin = 'round';
        context.strokeStyle = this.data.colors['y' + i];
        context.moveTo(1, this.height);
        for (var j = 1; j <= this.data.columns[0].length; j++) {
            context.lineTo(j * this.dataObj.x, canvas.height - Math.floor(this.data.columns[i + 1][j] / this.dataObj.y));
        }
        context.stroke();
    }

}

var changeBigChard = function (chart, canvas, data, width) {
    // get selectedEimeEl params
    var selectedStart = data[0] || selectedTimeEl.getBoundingClientRect().left; //левая точка прямоугольника
    var selectedEnd = data[1] || selectedTimeEl.getBoundingClientRect().right; // правая точка прямоугольника
    var selectedWidth = selectedEnd - selectedStart;// ширина прямоугольника
    var xPoints = Math.round(selectedWidth / chart.dataObj.x);// колличество точек Х на белом квадрате
    var namberStart = Math.round(selectedStart / chart.dataObj.x) < 1 ? 1 : Math.round(selectedStart / chart.dataObj.x);// начало координат Х
    var maxY = Math.max.apply(null, chart.data.columns[chart.dataObj.chartall[0] + 1].slice(namberStart, namberStart + xPoints).concat(chart.data.columns[chart.dataObj.chartall[1]].slice(namberStart, namberStart + xPoints)));
    var x = (chart.width / xPoints).toFixed(5);
    var y = (bigCanvasHeight / maxY).toFixed(5);
    bigChartData.xPoints = xPoints;
    bigChartData.namberStart = namberStart;
    bigChartData.xStep = x;
    bigChartData.yStep = y;
    // отрисовка большого графика
    canvas.width = allCanvasWidth;
    canvas.height = bigCanvasHeight;

    var context = canvas.getContext('2d');
    bigChartData.context = context;

    for (var i = chart.dataObj.chartall[0]; i < chart.dataObj.chartall[1]; i++) {
        context.beginPath();
        context.lineWidth = width || 2;
        context.lineJoin = 'round';
        context.strokeStyle = chart.data.colors['y' + i];
        context.shadowColor = "rgba(10, 10, 10, .7)";
        context.shadowBlur = .5;
        context.shadowOffsetX = 1.5;
        context.moveTo(1, (canvas.height + 3) - (y * chart.data.columns[i + 1][namberStart]).toFixed(4));
        for (var j = 1; j <= xPoints + 1; j++) {
            context.lineTo(j * x, (canvas.height + 3) - (y * chart.data.columns[i + 1][j + namberStart]).toFixed(4));
        }
        context.stroke();
    }
    // drawing gray lines with numbers // шкала колличества
    var y6 = (canvas.height / 6).toFixed(4);
    var text = Math.round(maxY / 6);
    context.beginPath();
    context.strokeStyle = 'rgba(100, 100, 100, .9)';
    context.lineWidth = .3;
    for (var i = 1; i < 7; i++) {
        context.moveTo(25, y6 * i);
        context.lineTo(canvas.width, y6 * i);
        context.font = '14px sans-serif';
        context.fillStyle = 'rgba(50,50,50, .9)';
        context.shadowColor = "rgba(10, 10, 10, .9)";
        context.shadowBlur = 1;
        context.shadowOffsetX = 0;
        context.fillText(text * i, 1, canvas.height - (y6 * i));
    }
    context.stroke();
    // show Date
    context.beginPath();
    context.fillStyle = 'black';
    context.font = '12px serif';
    for (var i = 0; i < xPoints; i++) {
        context.fillText('| ' + new Date(chart.data.columns[0][namberStart + (i * 7)]).toLocaleDateString(), i * x * 7, canvas.height - 1);
    }
}

function move(e) {
    function clearMove() {
        selectedTimeEl.onmousemove = null;
        selectedTimeEl.onmouseup = null;
        selectedTimeEl.removeEventListener('mousemove', moveEl);
        selectedTimeEl.removeEventListener('mousemove', moveElLeft);
    }
    var rangeX = (e.pageX - selectedTimeEl.getBoundingClientRect().left); // растояние курсора от начала квадрата
    if (rangeX <= 8 && rangeX >= -8) {
        var moveElLeft = function (e) {
            data[0] = selectedTimeEl.getBoundingClientRect().left;
            data[1] = selectedTimeEl.getBoundingClientRect().right;
            var changeWidth = selectedTimeEl.getBoundingClientRect().left - e.pageX;
            selectedTimeEl.style.left = e.pageX + 'px';
            selectedTimeEl.style.width = selectedTimeEl.offsetWidth + changeWidth + 'px';
            setTimeout(function () {
                changeBigChard(smallChart_0, canvasBig, data, 3);
            }, 300)
            selectedTimeEl.onmouseup = clearMove;
            selectedTimeEl.onmouseleave = clearMove;
        }
        selectedTimeEl.addEventListener('mousemove', moveElLeft);
    } else {
        var moveEl = function (e) {
            data[0] = selectedTimeEl.getBoundingClientRect().left;
            data[1] = selectedTimeEl.getBoundingClientRect().right;
            selectedTimeEl.style.left = data[0] < 0 ? '1px' : e.pageX - rangeX + 'px';
            if (data[0] <= 0) selectedTimeEl.removeEventListener('mousemove', moveEl);
            if (data[1] > allCanvasWidth + 3) {
                selectedTimeEl.style.left = allCanvasWidth - selectedTimeEl.offsetWidth - 3 + 'px';
                selectedTimeEl.removeEventListener('mousemove', moveEl);
            }
            setTimeout(function () {
                changeBigChard(smallChart_0, canvasBig, data, 3);
            }, 200)
            selectedTimeEl.onmouseup = clearMove;
            selectedTimeEl.onmouseleave = clearMove;
        }
        selectedTimeEl.addEventListener('mousemove', moveEl);
    }
}
var move2 = function (e) {
    if (selectedTimeEl.getBoundingClientRect().left < 1) selectedTimeEl.style.left = 1 + 'px';
    if (selectedTimeEl.getBoundingClientRect().right > allCanvasWidth) selectedTimeEl.style.left = allCanvasWidth - parseInt(getComputedStyle(selectedTimeEl).width) + 'px';
    var leftEl = parseInt(getComputedStyle(selectedTimeEl).left);
    var widthEl = parseInt(getComputedStyle(selectedTimeEl).width);
    var data = []; // обьект для передачи данных  x y в функцию changeBigChard
    //toch
    var touchobj = e.changedTouches[0]; // первая точка прикосновения
    var startx = parseInt(touchobj.clientX); // положение точки касания по x, относительно левого края браузера
    var rangeX = startx - selectedTimeEl.getBoundingClientRect().left;
    var moveEl = function (e) {
        if (rangeX < 10 && rangeX > -10) {
            var moveElLeft = function () {
                data[0] = selectedTimeEl.getBoundingClientRect().left;
                data[1] = selectedTimeEl.getBoundingClientRect().right;
                var touchobj = e.changedTouches[0] // первая точка прикосновения для данного события
                var dist = parseInt(touchobj.clientX) - startx;
                selectedTimeEl.style.left = leftEl + dist + 'px';
                selectedTimeEl.style.width = widthEl - dist + 'px';
                selectedTimeEl.ontouchend = function () {
                    selectedTimeEl.removeEventListener('touchmove', moveEl);
                }
                changeBigChard(smallChart_0, canvasBig, data, 3);
            };
            moveElLeft();
        } else {
            data[0] = selectedTimeEl.getBoundingClientRect().left;
            data[1] = selectedTimeEl.getBoundingClientRect().right;
            var touchobj = e.changedTouches[0] // первая точка прикосновения для данного события
            var dist = parseInt(touchobj.clientX) - startx;
            selectedTimeEl.style.left = leftEl + dist + 'px';
            selectedTimeEl.ontouchend = function () {
                if (selectedTimeEl.getBoundingClientRect().left < 1) selectedTimeEl.style.left = 1 + 'px';
                if (selectedTimeEl.getBoundingClientRect().right > allCanvasWidth) selectedTimeEl.style.left = allCanvasWidth - parseInt(getComputedStyle(selectedTimeEl).width) + 'px';
                selectedTimeEl.removeEventListener('touchmove', moveEl);
            }
            changeBigChard(smallChart_0, canvasBig, data, 3);
        };
    }
    selectedTimeEl.addEventListener('touchmove', moveEl);
}
function showData(e){
    changeBigChard(smallChart_0, canvasBig, data, 3);
    var click = e.pageX;
    var point =Math.round(click / bigChartData.xStep);
    var namberInArray = bigChartData.namberStart + point;
    var x = new Date(smallChart_0.data.columns[0][namberInArray]).toDateString();
    var y0 = smallChart_0.data.columns[1][namberInArray];
    var y1 = smallChart_0.data.columns[2][namberInArray];
    bigChartData.context.beginPath();
    bigChartData.context.moveTo(point * bigChartData.xStep, bigCanvasHeight);
    bigChartData.context.lineTo(point * bigChartData.xStep, 5);
    bigChartData.context.moveTo(point * bigChartData.xStep + 10, bigCanvasHeight - 20);
    bigChartData.context.fillStyle = 'white';
    bigChartData.context.shadowColor = "rgba(10, 10, 10, .7)";
    bigChartData.context.shadowBlur = 5;
    bigChartData.context.shadowOffsetX = 0;
    bigChartData.context.shadowOffsetY = -1;
    if(click < Math.round(allCanvasWidth / 2)){
        bigChartData.context.fillRect(point * bigChartData.xStep + 1 , bigCanvasHeight - 58, 130, 60);
        bigChartData.context.stroke();
        bigChartData.context.beginPath();
        bigChartData.context.fillStyle = 'gray';
        bigChartData.context.shadowColor = 'white';
        bigChartData.context.shadowBlur = 0;
        bigChartData.context.font = '14px sans-serif';
        bigChartData.context.fillText("| " + x, point * bigChartData.xStep + 10, bigCanvasHeight - 40);
        bigChartData.context.fillStyle = 'green';
        bigChartData.context.fillText("| Joined: "+ y0 , point * bigChartData.xStep + 10, bigCanvasHeight - 20);
        bigChartData.context.fillStyle = 'red';
        bigChartData.context.fillText("| Left: " + y1 , point * bigChartData.xStep + 10, bigCanvasHeight - 5);
        bigChartData.context.stroke();
    }else{
        bigChartData.context.fillRect(point * bigChartData.xStep - 131 , bigCanvasHeight - 58, 130, 60);
        bigChartData.context.stroke();
        bigChartData.context.beginPath();
        bigChartData.context.fillStyle = 'gray';
        bigChartData.context.shadowColor = 'white';
        bigChartData.context.shadowBlur = 0;
        bigChartData.context.font = '14px sans-serif';
        bigChartData.context.fillText("| " + x, point * bigChartData.xStep + 10 - 130, bigCanvasHeight - 40);
        bigChartData.context.fillStyle = 'green';
        bigChartData.context.fillText("| Joined: "+ y0 , point * bigChartData.xStep + 10 - 130, bigCanvasHeight - 20);
        bigChartData.context.fillStyle = 'red';
        bigChartData.context.fillText("| Left: " + y1 , point * bigChartData.xStep + 10 - 130, bigCanvasHeight - 5);
        bigChartData.context.stroke();
    }
}
selectedTimeEl.ondragstart = function() {return false}
selectedTimeEl.onclick = function() {return false}

selectedTimeEl.addEventListener('mousedown', move); // передвижения на маленьком графике ПК
selectedTimeEl.addEventListener('touchstart', function(e){
    selectedTimeEl.onmousedown = null;
    var x = e.changedTouches[0].clientX;
    if(x > this.getBoundingClientRect().left -5 && x < this.getBoundingClientRect().right)
    move2(e);
}); // передвижения на маленьком графике Мобилный
canvasBigParent.addEventListener('click', showData);// показать данные в этой точке при нажании


// BUTTONS
// night mode
var btnNight = document.getElementById('night');
var main = document.getElementById('main');
btnNight.onclick = function () {
    main.classList.toggle('night');
}
// buttons
var btn_checked1 = document.getElementById('checked1');
var btn_checked2 = document.getElementById('checked2');
var btn_next = document.getElementById('btn_next');

var btn_one = document.getElementById('y0');
var btn_two = document.getElementById('y1');
btn_one.onclick = function () {
    btn_checked1.classList.toggle('checked-off');
    smallChart_0.dataObj.chartall[0] = smallChart_0.dataObj.chartall[0] == 0 ? 1 : 0;
    changeBigChard(smallChart_0, canvasBig, false, 3);
}
btn_two.onclick = function () {
    btn_checked2.classList.toggle('checked-off');
    smallChart_0.dataObj.chartall[1] = smallChart_0.dataObj.chartall[1] == 2 ? 1 : 2;
    changeBigChard(smallChart_0, canvasBig, false, 3);
}
var smallChart_0 = new Chart(allCanvasWidth, smallCanvasHeight, jsonData[0]);
smallChart_0.buildChart(canvasSmall, [0, 2], 1);
changeBigChard(smallChart_0, canvasBig, false, 3);
var counter = 0;
var counter = 0;
var send = true;
btn_next.onclick = function() {
    if(send){
        var request = new XMLHttpRequest();
        request.open('GET', '/chart_data.json');
        request.onreadystatechange = function(e) {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    counter++;
                    if(counter >= 4) counter = 0;
                    var response = JSON.parse(this.responseText);
                    jsonData[1] = response[1];
                    jsonData[2] = response[2];
                    jsonData[3] = response[3];
                    jsonData[4] = response[4];
                    smallChart_0 = new Chart(allCanvasWidth, smallCanvasHeight, jsonData[counter]);
                    smallChart_0.buildChart(canvasSmall, [0, 2], 1);
                    changeBigChard(smallChart_0, canvasBig, false, 3);
                    send = false;
                }
                else {
                    console.log('error request!');
                    counter = 0;
                }
            }
        }
   
    request.send(null);
    } else {
    counter++;
    if(counter > 4) counter = 0;
    smallChart_0 = new Chart(allCanvasWidth, smallCanvasHeight, jsonData[counter]);
    var chartsAll = counter >= 4 ? 4 : 2;
    smallChart_0.buildChart(canvasSmall, [0, chartsAll], 1);
    changeBigChard(smallChart_0, canvasBig, false, 3);
  }
}
window.onresize = function(){
    var resizeTimeout;
    
        if ( !resizeTimeout ) {
          resizeTimeout = setTimeout(function() {
            resizeTimeout = null;
            (function(){
                allCanvasWidth = window.innerWidth;
                bigCanvasHeight = canvasBig.offsetHeight;
                smallChart_0 = new Chart(allCanvasWidth, smallCanvasHeight, jsonData[counter]);
                smallChart_0.buildChart(canvasSmall, [0, 2], 1);
                changeBigChard(smallChart_0, canvasBig, false, 3);
            })()
           
           }, 100);
        }  
}

