//Generate vehicle object
function vehicle(){
	var vehicle = document.createElement("div");
	vehicle.classList.add("vehicle");
	vehicle.position = "left";
	
	var vehicleRender = document.createElement("div");
	vehicleRender.classList.add("vehicleRender");
	var vehicleColor =  Math.floor(Math.random() * 5 + 1);
	vehicleRender.style.backgroundImage = "url('src/multitasking/image/vehicle_" + vehicleColor +".png')";
	vehicle.appendChild(vehicleRender);

	//Add multi-touch support
	var hammer = new Hammer(vehicle);
	hammer.on("panleft panright tap press", function (ev) {
        vehicleMove(vehicle, ev.type);
        console.log(ev.type);
    });
	return vehicle;
}

//Switch vehicle to another road
function vehicleMove(v, direction){
	if(direction == "panright" && v.position == "left"){
		v.parentNode.removeChild(v);
		fields[v.fieldNum].tracks[1].appendChild(v);
		v.position = "right";
		v.moveButton.style.backgroundImage = "url('src/multitasking/image/sliderLeft.png')";
	}else if(direction == "panleft" && v.position == "right"){
		v.parentNode.removeChild(v);
		fields[v.fieldNum].tracks[0].appendChild(v);
		v.position = "left";
		v.moveButton.style.backgroundImage = "url('src/multitasking/image/sliderRight.png')";
	}
}