/*		Rueben Anderson
		10/25/2011
		MIU 1111
		Project 1
*/

// Wait until the DOM loads
window.addEventListener("DOMContentLoaded", function() {

	// The getElementById Function
	function getId(x) {
		var elementId = document.getElementById(x);
		
		return elementId;
	};


	// Create and populate the select field element.
	function makeOpts() {
		var formTag = document.getElementsByTagName("form"),
			selectLi = getId("select"),
			selectOpt1 = getId("opt1"),
			selectOpt2 = getId("opt2"),
			makeSelect = document.createElement("select");
			makeSelect.setAttribute("id", "exercise");
		
	// Create the default option
		var optDef = document.createElement("option");
			optDef.setAttribute("label", "--Choose An Exercise Type--");
			optDef.innerHTML = "--Choose An Exercise Type--";
			makeSelect.appendChild(optDef);
		
	// option populating loop		
		for (var j=0; j < exerciseList.length; j++) {
			var makeOption = document.createElement("option"),
				optText = exerciseList[j];
				
				makeOption.setAttribute("value", optText);
				makeOption.innerHTML = optText;
				makeSelect.appendChild(makeOption);
		};
		
		selectLi.appendChild(makeSelect);
		
};

	function getCheckBoxValue() {
		// Checks for checkboxes with a checked state
		// Stores empty string for unchecked states & an x for checked states
		var daysArray = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"],
			exerciseArr = ["Running", "Kickboxing", "Swimming", "Bicycling", "Rowing", "Jump Rope", "Squats",
			"Leg Extension", "Dumbbell Curls", "Bench Press", "Tricep Extension", "Bent Over Rows", "Jumping Jacks",
			"Lunges", "Dips", "Crunches", "Pull Ups", "Push Ups", "Hip Flexor Stretch", "Piriformis Stretch",
			"Hamstring Stretch", "Quad Stretch", "Back Stretch", "Shoulder Stretch", "Walking", "Side Lunges",
			"Step Ups", "Lite Swimming", "Lying Abduction", "Wall Squats"];
	
		for (var l=0; l<daysArray.length; l++) {
			if (getId(daysArray[l]).checked) {
				day[l] = "×";		// ascii value for multiplication symbol
			}
				else {
					day[l] = ""
				};
		};
		
		for (var j=0; j<exerciseArr.length; j++) {
			var newWord = exerciseArr[j];
			
			for (var k=0, noSpace=""; k < newWord.length; k++) {
			// Eliminates the white spaces (if any) in the string
				if (!(newWord.charAt(k)==" ")) {
					noSpace += newWord.charAt(k);
				};
			};
			// uncapitalize first letter of each string in the array
			var firstLetter = noSpace.charAt(0);
				noSpace = firstLetter.toLowerCase() + noSpace.substring(1,noSpace.length);
			
			if (getId(noSpace).checked) {
				exerciseType = exerciseArr[j];		// stores the id of the radio box that is checked
			};										// using the newly formed strings but stores the unedited version of the strings
		};											// this is for aesthetic purposes when retrieving the data.
	};

	function setCheckBoxValue(item) {
		// Checks for checkboxes with a checked state
		// Adds a checked value to the checked attribute for true
		
			if (item.sun[1] == "×") {
				getId("sunday").setAttribute("checked", "checked");
			}
			
			if (item.mon[1] == "×") {
				getId("monday").setAttribute("checked", "checked");
			}
			
			if (item.tue[1] == "×") {
				getId("tuesday").setAttribute("checked", "checked");
			}
			
			if (item.wed[1] == "×") {
				getId("wednesday").setAttribute("checked", "checked");
			}
			
			if (item.thu[1] == "×") {
				getId("thursday").setAttribute("checked", "checked");
			}
			
			if (item.fri[1] == "×") {
				getId("friday").setAttribute("checked", "checked");
			}
			
			if (item.sat[1] == "×") {
				getId("saturday").setAttribute("checked", "checked");
			}
			
			for (var k=0, noSpace=""; k < item.routineType[1].length; k++) {
			// Eliminates the white spaces (if any) in the string
				if (!(item.routineType[1].charAt(k)==" ")) {
					noSpace += item.routineType[1].charAt(k);
				};
			};
			// uncapitalize first letter of the string
			var firstLetter = noSpace.charAt(0);
				noSpace = firstLetter.toLowerCase() + noSpace.substring(1,noSpace.length);
				getId(noSpace).setAttribute("checked", "checked");
	};

	function storeData(key) {
		
		// Checks if there is no key, which means this is a new routine and needs a new key.
		if (!key) {	
			var id = Math.floor(Math.random()*100000001),
				isNew = true;
		} 
			else {
				// Set the id to the existing key that is being edited so that the data will be overwritten.
				// This key is the same key being passed from the editSubmit event handler.
				var	id = key,
					isNew = false;
			};
	
	// Stores all form field values in an object.
	// Object properties contain arrays with the form lable and input value.
		getCheckBoxValue();
		var item = {
			name: ["Routine:", getId("routineName").value],
			routine: ["Exercise:", getId("exercise").value],
			routineType: ["Workout:", exerciseType],
			sun: ["Sun:", day[0]],
			mon: ["Mon:", day[1]],
			tue: ["Tue:", day[2]],
			wed: ["Wed:", day[3]],
			thu: ["Thu:", day[4]],
			fri: ["Fri:", day[5]],
			sat: ["Sat:", day[6]],
			reDu: ["Reps/Duration:", getId("workout").value],
			notes: ["Comments:", getId("comments").value],
			date: ["Start:", getId("startDate").value]
		};
	
		localStorage.setItem(id, JSON.stringify(item));
		isOld = false;
		getId("startDate").setAttribute("disabled", "");
		if (isNew === true) {
			alert("Routine Added!");
		}
			else {
				alert("Routine Updated!");
			};
	};

	function toggleControls(m) {
		switch(m) {
			case "on":
				getId("routineForm").style.display = "none";
				getId("clearLists").style.display = "inline";
				getId("showData").style.display = "none";
				getId("addNew").style.display = "inline";
				break;
			case "off":
				getId("routineForm").style.display = "block";
				getId("clearLists").style.display = "inline";
				getId("showData").style.display = "inline";
				getId("addNew").style.display = "none";
				getId("routines").style.display = "none";
				break;
			default:
				return false;
		};
	
	};

	function getData() {
		toggleControls("on");
			getId("startDate").setAttribute("disabled", "");
			
			if (localStorage.length === 0) {
				autoFillData();
				alert("There is no data in Local Storage! Default data has been added.");
			};
			//Write data from local storage to browser
		var makeDiv = document.createElement("div"),
			makeList = document.createElement("ul");
			
			makeDiv.setAttribute("id", "routines");
			makeDiv.appendChild(makeList);
			document.body.appendChild(makeDiv);
			getId("routines").style.display = "block";
	
		for (var k=0; k<localStorage.length; k++) {
			var makeLi = document.createElement("li"),
				linksLi = document.createElement("li"),
				key = localStorage.key(k),
				value = localStorage.getItem(key),
				newObj = JSON.parse(value),
				makeSubList = document.createElement("ul");
				
				makeList.appendChild(makeLi);
				makeLi.appendChild(makeSubList);
				getImage(newObj.routineType[1], makeSubList);
				
				for (var n in newObj) {
					var makeSubLi = document.createElement("li"),
						optSubText = newObj[n][0] + " " + newObj[n][1];
						
						makeSubList.appendChild(makeSubLi);
						makeSubLi.innerHTML = optSubText;
						makeSubList.appendChild(linksLi);
				};
			makeRoutineLinks(localStorage.key(k), linksLi); // Creates the edit and delete links for each routine in local storage.
		};
	};

	// Get the appropriate image for the exercise category
	function getImage(imgName, makeSubList) {
			for (var k=0, noSpace=""; k < imgName.length; k++) {
			// Eliminates the white spaces (if any) in the string
				if (!(imgName.charAt(k)==" ")) {
					noSpace += imgName.charAt(k);
				};
			};
			// uncapitalize first letter of each string in the array
			var firstLetter = noSpace.charAt(0);
				noSpace = firstLetter.toLowerCase() + noSpace.substring(1,noSpace.length);
			
			// Get image file names by returning the substring from index 0 to the first space
			imgName = noSpace;
			imgName = getId(imgName).value;
		
		var endMark = imgName.indexOf(" ");
		
		if (endMark === -1) {
			imgName = imgName.substring(0,imgName.length);
		}
			else {
				imgName = imgName.substring(0, endMark);
			};
		
		var imageLi = document.createElement("li"),
			newImg = document.createElement("img"),
			setSrc = newImg.setAttribute("src", "images/" + imgName + ".png");
			
			makeSubList.appendChild(imageLi);
			imageLi.appendChild(newImg);
		
	};

	// JSON Object which will auto populate local storage.
	function autoFillData() {
		var json = {
				"routine1": {
					"name": ["Routine:", "Free Weights"],
					"routine": ["Exercise:", "Anaerobics"],
					"routineType": ["Workout:", "Dumbbell Curls"],
					"sun": ["Sun:", ""],
					"mon": ["Mon:", "×"],
					"tue": ["Tue:", ""],
					"wed": ["Wed:", "×"],
					"thu": ["Thu:", ""],
					"fri": ["Fri:", "×"],
					"sat": ["Sat:", ""],
					"reDu": ["Reps/Duration:", 15],
					"notes": ["Comments:", "Reps / 25lb weights"],
					"date": ["Start:", "2011-10-15"]
				},
				"routine2": {
					"name": ["Routine:", "Free Run"],
					"routine": ["Exercise:", "Aerobics"],
					"routineType": ["Workout:", "Running"],
					"sun": ["Sun:", ""],
					"mon": ["Mon:", ""],
					"tue": ["Tue:", "×"],
					"wed": ["Wed:", ""],
					"thu": ["Thu:", "×"],
					"fri": ["Fri:", ""],
					"sat": ["Sat:", "×"],
					"reDu": ["Reps/Duration:", 3],
					"notes": ["Comments:", "Duration (miles)"],
					"date": ["Start:", "2011-10-15"]
				},
				"routine3": {
					"name": ["Routine:", "Flexor"],
					"routine": ["Exercise:", "Flexibility"],
					"routineType": ["Workout:", "Hip Flexor Stretch"],
					"sun": ["Sun:", ""],
					"mon": ["Mon:", ""],
					"tue": ["Tue:", "×"],
					"wed": ["Wed:", "×"],
					"thu": ["Thu:", ""],
					"fri": ["Fri:", ""],
					"sat": ["Sat:", "×"],
					"reDu": ["Reps/Duration:", 30],
					"notes": ["Comments:", "Duration (sec)"],
					"date": ["Start:", "2011-10-15"]
				},
				"routine4": {
					"name": ["Routine:", "Double Dip"],
					"routine": ["Exercise:", "Calisthenics"],
					"routineType": ["Workout:", "Dips"],
					"sun": ["Sun:", "×"],
					"mon": ["Mon:", "×"],
					"tue": ["Tue:", ""],
					"wed": ["Wed:", "×"],
					"thu": ["Thu:", ""],
					"fri": ["Fri:", ""],
					"sat": ["Sat:", ""],
					"reDu": ["Reps/Duration:", 20],
					"notes": ["Comments:", "Reps"],
					"date": ["Start:", "2011-10-15"]
				},
				"routine5": {
					"name": ["Routine:", "Warm Ups"],
					"routine": ["Exercise:", "Maternity"],
					"routineType": ["Workout:", "Walking"],
					"sun": ["Sun:", "×"],
					"mon": ["Mon:", "×"],
					"tue": ["Tue:", ""],
					"wed": ["Wed:", "×"],
					"thu": ["Thu:", "×"],
					"fri": ["Fri:", ""],
					"sat": ["Sat:", ""],
					"reDu": ["Reps/Duration:", 35],
					"notes": ["Comments:", "Duration (min)"],
					"date": ["Start:", "2011-10-15"]
				},
				"routine6": {
					"name": ["Routine:", "Lower Back"],
					"routine": ["Exercise:", "Flexibility"],
					"routineType": ["Workout:", "Back Stretch"],
					"sun": ["Sun:", "×"],
					"mon": ["Mon:", ""],
					"tue": ["Tue:", "×"],
					"wed": ["Wed:", "×"],
					"thu": ["Thu:", ""],
					"fri": ["Fri:", "×"],
					"sat": ["Sat:", ""],
					"reDu": ["Reps/Duration:", 15],
					"notes": ["Comments:", "Duration (sec)"],
					"date": ["Start:", "2011-10-15"]
				},
				"routine7": {
					"name": ["Routine:", "Abdominals"],
					"routine": ["Exercise:", "Calisthenics"],
					"routineType": ["Workout:", "Crunches"],
					"sun": ["Sun:", ""],
					"mon": ["Mon:", ""],
					"tue": ["Tue:", "×"],
					"wed": ["Wed:", ""],
					"thu": ["Thu:", "×"],
					"fri": ["Fri:", ""],
					"sat": ["Sat:", "×"],
					"reDu": ["Reps/Duration:", 50],
					"notes": ["Comments:", "Reps"],
					"date": ["Start:", "2011-10-15"]
				},
				"routine8": {
					"name": ["Routine:", "Bench"],
					"routine": ["Exercise:", "Anaerobics"],
					"routineType": ["Workout:", "Bench Press"],
					"sun": ["Sun:", ""],
					"mon": ["Mon:", "×"],
					"tue": ["Tue:", "×"],
					"wed": ["Wed:", ""],
					"thu": ["Thu:", "×"],
					"fri": ["Fri:", "×"],
					"sat": ["Sat:", ""],
					"reDu": ["Reps/Duration:", 20],
					"notes": ["Comments:", "Reps / 110lbs"],
					"date": ["Start:", "2011-10-15"]
				},
				"routine9": {
					"name": ["Routine:", "Spar"],
					"routine": ["Exercise:", "Aerobics"],
					"routineType": ["Workout:", "Kickboxing"],
					"sun": ["Sun:", "×"],
					"mon": ["Mon:", ""],
					"tue": ["Tue:", ""],
					"wed": ["Wed:", ""],
					"thu": ["Thu:", ""],
					"fri": ["Fri:", ""],
					"sat": ["Sat:", "×"],
					"reDu": ["Reps/Duration:", 90],
					"notes": ["Comments:", "Duration (min)"],
					"date": ["Start:", "2011-10-15"]
				},
				"routine10": {
					"name": ["Routine:", "For heart"],
					"routine": ["Exercise:", "Aerobics"],
					"routineType": ["Workout:", "Jump Rope"],
					"sun": ["Sun:", "×"],
					"mon": ["Mon:", ""],
					"tue": ["Tue:", "×"],
					"wed": ["Wed:", ""],
					"thu": ["Thu:", "×"],
					"fri": ["Fri:", ""],
					"sat": ["Sat:", "×"],
					"reDu": ["Reps/Duration:", 5],
					"notes": ["Comments:", "Duration (min)"],
					"date": ["Start:", "2011-10-15"]
				}
		};
		
		// Store the JSON object into local storage
		for (var n in json) {
			var id = Math.floor(Math.random()*100000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		};
	};


	/* Make Routine Links
	   Create the edit and delete links for reach stored item when displayed. */
	function makeRoutineLinks(key, linksLi) {
		
			// Define edit delete link variables
		var editLink = document.createElement("a"),
			editText = "Edit Routine",
			deleteLink = document.createElement("a"),
			deleteText = "Delete Routine";
			
			// Add edit single routine link
			editLink.href = "#";
			editLink.key = key;
			editLink.addEventListener("click", editRoutine);
			editLink.innerHTML = editText;
			linksLi.appendChild(editLink);
			
			// Add line break
		var breakTag = document.createElement("br");
			linksLi.appendChild(breakTag);	
			
			// Add delete single routine link
			deleteLink.href = "#";
			deleteLink.key = key;
			deleteLink.addEventListener("click", deleteRoutine);
			deleteLink.innerHTML = deleteText;
			linksLi.appendChild(deleteLink);
	};

	function deleteRoutine() {
		var ask = confirm("Are you sure you want to delete this routine?");
		
		if (ask) {
			localStorage.removeItem(this.key);
			alert("Routine has been successfully removed!");
			window.location.reload();
		}
			else {
				alert("The routine was not deleted.");
			};
	};

	function editRoutine() {
		// Reset error messages just incase the user inputs invalid info and then chooses 
		// to edit another routine. Which would not reset them because they reset in the validator function.
		resetErrMsg();
		
		// The routine is being edited so a true value is assigned to the isOld variable to 
		// prevent the validator from forcing a new updated start date and to prevent backdating the field is disabled.
		if (this.key) {
			isOld = true;
			getId("startDate").setAttribute("disabled", "disabled");
		};
		
		// Grab the data from the Local Storage item
		var value = localStorage.getItem(this.key),
			item = JSON.parse(value);
			
			// Shows the form
			toggleControls("off");
	
			// Populate the form fields with current lcoalStorage values.
			getId("routineName").value = item.name[1];
			getId("exercise").value = item.routine[1];
			getId("workout").value = item.reDu[1];
			getId("comments").value = item.notes[1];
			getId("startDate").value = item.date[1];
			
			// Function that populates the checkbox fields.
			setCheckBoxValue(item);
			
			// Remove the initial listener from the input button
			save.removeEventListener("click", storeData);
			// Change submit button value to edit button
			getId("submit").value = "Edit Routine";
			
		var	editSubmit = getId("submit");
			// Save the key value in this function as a property of the edit submit event
			// So the value may be reused when the edited data is saved.
			editSubmit.addEventListener("click", validate);
			editSubmit.key = this.key;
			
			// Make sure to set the exercise type to block
			addExerciseType();
	};

	
	function resetErrMsg() {
		var	getRoutine = getId("routineName"),
			getExercise = getId("exercise"),
			getWorkout = getId("workout"),
			getStartDate = getId("startDate");
			
		//Reset error messages
			errMsg.innerHTML = "";
			errMsg.style.color = "#CC9B73";
			getRoutine.style.border = "1px solid black";
			getExercise.style.border = "1px solid black";
			getWorkout.style.border = "1px solid black";
			getStartDate.style.border = "1px solid black";
			getId("rtFreq").style.border = "none";
			getId("workout2").style.border = "none";
	
	};
	
	function validate(e) {
		// Define the elements we want to check
		var	getRoutine = getId("routineName"),
			getExercise = getId("exercise"),
			getWorkout = getId("workout"),
			getStartDate = getId("startDate"),
			dayValidator = [
				[getId("sunday")],
				[getId("monday")],
				[getId("tuesday")],
				[getId("wednesday")],
				[getId("thursday")],
				[getId("friday")],
				[getId("saturday")]
			],
			validateRadio = document.forms[0].exType;
			
			// Call function to reset error messages
			resetErrMsg();
			
			
			// Get error messages
		var	messageArr = [],
			err = "";
			
			// Routine validation
			if (getRoutine.value === "") {
				err = "Please input a name for this routine.";
			
				getRoutine.style.border = "2px solid #990000";
				messageArr.push(err);
			};
			
			// Exercise validation
			if (getExercise.value === "--Choose An Exercise Type--") {
				err = "Please choose an exercise type."
				
				getExercise.style.border = "2px solid #990000";
				messageArr.push(err);
			};
			
			// Workout validation
			if (getWorkout.value <= 0) {
				err = "Please choose a value greater than 0.";
				
				getWorkout.style.border = "2px solid #990000";
				messageArr.push(err);
			};
			
			
			// Checkbox validation
			for (var z=0, err=""; z < dayValidator.length; z++) {
				if (dayValidator[z][0].checked) {
					err += "chk";
				}
					else {
						err += "";
					};
			};
			
			if (err === "") {
				err = "Please choose atleast 1 day for this routine.";
				
				getId("rtFreq").style.border = "1px solid #990000";
				messageArr.push(err);
			};
			
			// Radiobox validation
			for (var r=0, err=""; r < validateRadio.length; r++) {
				if (validateRadio[r].checked) {
					err += "chk";
				}
					else {
						err += "";
					};
			};
			
			if (err === "") {
				err = "Please choose an exercise for this routine.";
				
				getId("workout2").style.border = "1px solid #990000";
				messageArr.push(err);
			};
			
			
			// StartDate validation
			var re = /\d{4}-{1}\d{2}-{1}\d{2}/;
			if (re.test(getStartDate.value) === false) {
				err = "Please enter a date in valid format.";
				
				getStartDate.style.border = "2px solid #990000";
				messageArr.push(err);
			}
				else {	
					if (isOld === false) {
						var startVal = getStartDate.value,
							year = startVal.substring(0, 4),
							month = startVal.substring(5, 7),
							day = startVal.substring(8, 10),
							today = new Date(),
							inDate = new Date();
							inDate.setFullYear(year);
							inDate.setDate(day);
							inDate.setMonth(month-1);
												
						if (Date.parse(inDate) < Date.parse(today)) {
							err = "Please enter the current date or a future date.";
						
							getStartDate.style.border = "2px solid #990000";
							messageArr.push(err);
						};
					};
				};
				
			
						
			// If there are errors, display them on the screen
			if (messageArr.length >= 1 ) {
				for (var u=0; u < messageArr.length; u++) {
					var txt = document.createElement("li");
					
					txt.innerHTML = messageArr[u];
					errMsg.appendChild(txt);
				};
				errMsg.style.color = "#990000";
				e.preventDefault();
				return false;
			}
				else {
					// If everything is ok save the data. Send the key value from the edit data function
					// This key value was passed through the editSubmit event listener as a property.
					storeData(this.key);
				};
			
	};


	function clearData() {
		if (localStorage.length === 0) {
			alert("There is no data to clear!");
		}
			else {
				localStorage.clear();
				alert("All routines have been removed!");
				window.location.reload();
				return false;
			};
	
	};
	
	function getRangeValue() {
		var value = getId("rangeVal");
		
		
		// Input the value of the range into the span tag following it
		value.innerHTML = "";
		value.innerHTML = updateRange.value;
	};
	
	function addExerciseType() {
		getId("aerobics").style.display = "none";
		getId("anaerobics").style.display = "none";
		getId("calisthenics").style.display = "none";
		getId("flexibility").style.display = "none";
		getId("maternity").style.display = "none";
		getId("wDescript").innerHTML = "Reps/Duration:";
		
		for (var i=0; i < exerciseList.length; i++) {
			if (catClick.value === "Aerobics") {
				getId("aerobics").style.display = "block";
				getId("wDescript").innerHTML = "Duration:";
			}
			else if (catClick.value === "Anaerobics") {
				getId("anaerobics").style.display = "block";
				getId("wDescript").innerHTML = "Repetitions:";
			}
			else if (catClick.value === "Calisthenics") {
				getId("calisthenics").style.display = "block";
				getId("wDescript").innerHTML = "Repetitions:";
			}
			else if (catClick.value === "Flexibility") {
				getId("flexibility").style.display = "block";
				getId("wDescript").innerHTML = "Duration:";
			}
			else if (catClick.value === "Maternity") {
				getId("maternity").style.display = "block";
				getId("wDescript").innerHTML = "Reps/Duration:";
			};
		};
	};



	// Variables
	var exerciseList = ["Aerobics", "Anaerobics", "Calisthenics", "Flexibility", "Maternity"],
		day = [],
		exerciseType = "",
		errMsg = getId("errors"),
		isOld = false;
			
		makeOpts();							
					
					
	// Set the Link & Submit click events						
	var save = getId("submit"),
		showLink = getId("showData"),
		clearLink = getId("clearLists"),
		updateRange = getId("workout"),
		catClick = getId("exercise");
		
		
	showLink.addEventListener("click", getData);
	clearLink.addEventListener("click", clearData);
	save.addEventListener("click", validate);
	updateRange.addEventListener("mousemove", getRangeValue);
	catClick.addEventListener("click", addExerciseType);

});