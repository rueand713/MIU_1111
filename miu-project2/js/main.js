/*		Rueben Anderson
		10/31/2011
		MIU 1111
		Project 2
*/

// Wait until the DOM loads
window.addEventListener("DOMContentLoaded", function() {

	// The getElementById Function
	function getId(x) {
		var elementId = document.getElementById(x);
		
		return elementId;
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
		//	routine: ["Exercise:", getId("exercise").value],
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

	function restoreDefault() {
				
		// Set defaults for the form
		getId("sunday").setAttribute("checked", "");
		getId("monday").setAttribute("checked", "");
		getId("tuesday").setAttribute("checked", "");
		getId("wednesday").setAttribute("checked", "");
		getId("thursday").setAttribute("checked", "");
		getId("friday").setAttribute("checked", "");
		getId("saturday").setAttribute("checked", "");
		getId("routineName").value = "";
		getId("workout").value = 15;
		getId("comments").value = "";
		getId("startDate").value = "";
		
		var radios = document.forms[0].exType;
		
		for (var j=0; j<radios.length; j++) {
			radios[j].setAttribute("checked", "");
		};
		
		// Reset the jQuery data fields for the list
		getId("aero").setAttribute("data-collapsed", "true");
		getId("anaero").setAttribute("data-collapsed", "true");
		getId("calisth").setAttribute("data-collapsed", "true");
		getId("flex").setAttribute("data-collapsed", "true");
		getId("matern").setAttribute("data-collapsed", "true");
	};

	function toggleControls(m) {
		switch(m) {
			case "on":
				getId("routineForm").style.display = "none";
				getId("clearLists").style.display = "inline";
				getId("showData").style.display = "none";
				getId("addNew").style.display = "inline";
				getId("body").style.display = "block";
				break;
			case "off":
				getId("routineForm").style.display = "block";
				getId("clearLists").style.display = "inline";
				getId("showData").style.display = "inline";
				getId("addNew").style.display = "none";
				getId("body").style.display = "none";
				break;
			default:
				return false;
		};
	
	};

	function parseTheDate(startVal) {
			var	year = startVal.substring(0, 4),
				month = startVal.substring(5, 7),
				day = startVal.substring(8, 10),
				inDate = new Date(Date.UTC(2011,10,10,0,0,0));
				
				inDate.setFullYear(year);
				inDate.setDate(day);
				inDate.setMonth(month-1);
				
			return Date.parse(inDate);
	};

	function getNewsStream() {
			
		var	values = [],
			values2 = [];
			
		// Takes the date values passed in from newObj sorts the list to find the greatest values
		// Then arranges those from least to greatest
		
		for (var i=0; i < localStorage.length; i++) {
			var key = localStorage.key(i),
				val = localStorage.getItem(key),
				newObj = JSON.parse(val),
				coreVal = newObj.date[1],
				startVal = parseTheDate(newObj.date[1])
				
				values2 = [coreVal, startVal];
				values.push(values2);
		
		};
		
		var	 newArray = [],
			 newVal=[],
			 nVal = values;
	
		// Sorts the values passed in and returns the greatest value per comparision
		// Then pushes that value into an array
		for (var y=0; y<values.length; y++) { 
			newVal = nVal[y][1];
		   
		   for (var x=0; x<values.length; x++) {
				newVal = Math.max(newVal, values[x][1]);
			
			};
		
			newArray.push(newVal);
			// Compares the newly pushed value to the original array
			// Replaces the value that matches in the original array to zero to prevent duel comparisons
			for (var z=0; z<values.length; z++) {
				if (values[z][1] == newVal) {
					values[z][1] = 0;
					break;		// Prevents replacing valid duplicate entries
				};
			};
		};
	
	// Determines order orderType set to old will order the list from oldest to newest
	// orderType of new will order the list from newest to oldest.
		if (orderType == "old") {
			var newArr = [];
			// Arranges the newArr from least to greatest using the values in newArray
			for (var n=newArray.length; n > 0; n--) {
					newArr.push(newArray[n-1])
				}; 
			
			} else {
				newArr = newArray;
			};
	
		return newArr;
	};

	function checkForDubs() {
		var tags = document.getElementsByTagName("div");
		
		for (var i=0, divCount=[]; i<tags.length; i++) {
			var idAttr = tags[i].getAttribute("id");
			
			if (idAttr === "routines") {
				divCount.push(tags[i]);
			};
		
		if (divCount.length >1) {
			var bod = getId("body");
			bod.removeChild(divCount[1]);
			};
		};
	};

	function getData() {
		toggleControls("on");
			getId("startDate").setAttribute("disabled", "");
		//	$.mobile.changePage("#list", "slideup");
	/*			
			if (localStorage.length === 0) {
				autoFillData();
				alert("There is no data in Local Storage! Default data has been added.");
			};
			//Write data from local storage to browser
		var makeDiv = document.createElement("div"),
			makeList = document.createElement("ul"),
			makeAnc = document.createElement("a");
			
			makeDiv.setAttribute("id", "routines");
			makeDiv.appendChild(makeList);
			getId("body").appendChild(makeDiv);
			getId("routines").style.display = "block";
			makeAnc.setAttribute("id", "tOrder");
			makeAnc.setAttribute("href", "#");
			
		if (orderType == "new") {
			makeAnc.innerHTML = "[Ordered by Newest]";
			makeAnc.setAttribute("focused", "false");
			}
				else {
					makeAnc.innerHTML = "[Ordered by Oldest]";
					makeAnc.setAttribute("focused", "true");
				};
				
			makeList.appendChild(makeAnc);
		//	getId("tOrder").addEventListener("click", changeOrder);
			
		var newsStream = getNewsStream();

			// Populates list with the object
		for (var k=0, storCnt=0; k<localStorage.length; k++, storCnt++) {
			var makeLi = document.createElement("li"),
				linksLi = document.createElement("li"),
				makeTitle = document.createElement("a"),
				makeSubList = document.createElement("ul"),
				makeImg = document.createElement("img");
			
			for (var f=0; f < newsStream.length; f++) {
				var key = localStorage.key(f),
					value = localStorage.getItem(key),
					newObj = JSON.parse(value),
					objDate = parseTheDate(newObj.date[1]);
					
				if (objDate == newsStream[k]) {
					makeTitle.setAttribute("href", "#");
					makeTitle.setAttribute("id", "titleControl" + k);
					makeTitle.setAttribute("focused", "false");
					makeLi.setAttribute("id", "title" + k);
					makeImg.setAttribute("id","routineImg"+k);
					makeImg.setAttribute("src","images/maximize.png");
					makeTitle.appendChild(makeImg);
					makeTitle.appendChild(document.createTextNode("Routine " + (k+1)));
					makeList.appendChild(makeTitle);
					makeList.appendChild(makeLi);
					getId("title"+k).style.display = "none";
					makeLi.appendChild(makeSubList);
					getImage(newObj.routineType[1], makeSubList);
					getId("titleControl"+k).style.display = "block";
					
					// Populates the list object's items
					for (var n in newObj) {
							var makeSubLi = document.createElement("li"),
								optSubText = newObj[n][0] + " " + newObj[n][1];
								
								makeSubList.appendChild(makeSubLi);
								makeSubLi.innerHTML = optSubText;
								makeSubList.appendChild(linksLi);
					};
				};
			};
			
			makeRoutineLinks(localStorage.key(k), linksLi); // Creates the edit and delete links for each routine in local storage.
		};
		checkForDubs();
		setListAttributes(storCnt);
		//toggleList(true); */
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
				//	"routine": ["Exercise:", "Anaerobics"],
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
					"date": ["Start:", "2011-10-25"]
				},
				"routine2": {
					"name": ["Routine:", "Free Run"],
				//	"routine": ["Exercise:", "Aerobics"],
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
				//	"routine": ["Exercise:", "Flexibility"],
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
					"date": ["Start:", "2011-09-25"]
				},
				"routine4": {
					"name": ["Routine:", "Double Dip"],
				//	"routine": ["Exercise:", "Calisthenics"],
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
					"date": ["Start:", "2011-09-15"]
				},
				"routine5": {
					"name": ["Routine:", "Warm Ups"],
				//	"routine": ["Exercise:", "Maternity"],
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
					"date": ["Start:", "2011-08-25"]
				},
				"routine6": {
					"name": ["Routine:", "Lower Back"],
				//	"routine": ["Exercise:", "Flexibility"],
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
					"date": ["Start:", "2011-08-15"]
				},
				"routine7": {
					"name": ["Routine:", "Abdominals"],
				//	"routine": ["Exercise:", "Calisthenics"],
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
					"date": ["Start:", "2011-07-25"]
				},
				"routine8": {
					"name": ["Routine:", "Bench"],
				//	"routine": ["Exercise:", "Anaerobics"],
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
					"date": ["Start:", "2011-07-15"]
				},
				"routine9": {
					"name": ["Routine:", "Spar"],
				//	"routine": ["Exercise:", "Aerobics"],
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
					"date": ["Start:", "2011-06-25"]
				},
				"routine10": {
					"name": ["Routine:", "For heart"],
				//	"routine": ["Exercise:", "Aerobics"],
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
					"date": ["Start:", "2011-06-15"]
				},
				"routine11": {
					"name": ["Routine:", "Tricep Targetting"],
				//	"routine": ["Exercise:", "Anaerobics"],
					"routineType": ["Workout:", "Tricep Extension"],
					"sun": ["Sun:", "×"],
					"mon": ["Mon:", ""],
					"tue": ["Tue:", ""],
					"wed": ["Wed:", "×"],
					"thu": ["Thu:", ""],
					"fri": ["Fri:", "×"],
					"sat": ["Sat:", ""],
					"reDu": ["Reps/Duration:", 10],
					"notes": ["Comments:", "Reps / 20lbs"],
					"date": ["Start:", "2011-10-24"]
				},
				"routine12": {
					"name": ["Routine:", "Quick Swim"],
				//	"routine": ["Exercise:", "Aerobics"],
					"routineType": ["Workout:", "Swimming"],
					"sun": ["Sun:", ""],
					"mon": ["Mon:", "×"],
					"tue": ["Tue:", "×"],
					"wed": ["Wed:", ""],
					"thu": ["Thu:", "×"],
					"fri": ["Fri:", "×"],
					"sat": ["Sat:", "×"],
					"reDu": ["Reps/Duration:", 5],
					"notes": ["Comments:", "Laps"],
					"date": ["Start:", "2011-10-10"]
				},
				"routine13": {
					"name": ["Routine:", "Hamstrings"],
				//	"routine": ["Exercise:", "Flexibility"],
					"routineType": ["Workout:", "Hamstring Stretch"],
					"sun": ["Sun:", ""],
					"mon": ["Mon:", "×"],
					"tue": ["Tue:", "×"],
					"wed": ["Wed:", ""],
					"thu": ["Thu:", ""],
					"fri": ["Fri:", ""],
					"sat": ["Sat:", "×"],
					"reDu": ["Reps/Duration:", 30],
					"notes": ["Comments:", "Duration (sec)"],
					"date": ["Start:", "2011-09-20"]
				},
				"routine14": {
					"name": ["Routine:", "Deep Steps"],
				//	"routine": ["Exercise:", "Calisthenics"],
					"routineType": ["Workout:", "Lunges"],
					"sun": ["Sun:", "×"],
					"mon": ["Mon:", "×"],
					"tue": ["Tue:", ""],
					"wed": ["Wed:", "×"],
					"thu": ["Thu:", ""],
					"fri": ["Fri:", ""],
					"sat": ["Sat:", ""],
					"reDu": ["Reps/Duration:", 20],
					"notes": ["Comments:", "Reps hold 5 sec"],
					"date": ["Start:", "2011-09-14"]
				},
				"routine15": {
					"name": ["Routine:", "Stepping"],
				//	"routine": ["Exercise:", "Maternity"],
					"routineType": ["Workout:", "Step Ups"],
					"sun": ["Sun:", "×"],
					"mon": ["Mon:", "×"],
					"tue": ["Tue:", ""],
					"wed": ["Wed:", "×"],
					"thu": ["Thu:", "×"],
					"fri": ["Fri:", ""],
					"sat": ["Sat:", ""],
					"reDu": ["Reps/Duration:", 15],
					"notes": ["Comments:", "Duration (min)"],
					"date": ["Start:", "2011-08-24"]
				},
				"routine16": {
					"name": ["Routine:", "Shoulder/Rotator"],
				//	"routine": ["Exercise:", "Flexibility"],
					"routineType": ["Workout:", "Shoulder Stretch"],
					"sun": ["Sun:", ""],
					"mon": ["Mon:", "×"],
					"tue": ["Tue:", ""],
					"wed": ["Wed:", "×"],
					"thu": ["Thu:", ""],
					"fri": ["Fri:", ""],
					"sat": ["Sat:", ""],
					"reDu": ["Reps/Duration:", 15],
					"notes": ["Comments:", "Duration (sec)"],
					"date": ["Start:", "2011-08-10"]
				},
				"routine17": {
					"name": ["Routine:", "Total Body"],
				//	"routine": ["Exercise:", "Calisthenics"],
					"routineType": ["Workout:", "Pull Ups"],
					"sun": ["Sun:", ""],
					"mon": ["Mon:", "×"],
					"tue": ["Tue:", "×"],
					"wed": ["Wed:", ""],
					"thu": ["Thu:", "×"],
					"fri": ["Fri:", "×"],
					"sat": ["Sat:", ""],
					"reDu": ["Reps/Duration:", 50],
					"notes": ["Comments:", "Reps"],
					"date": ["Start:", "2011-07-24"]
				},
				"routine18": {
					"name": ["Routine:", "Arm & Back"],
				//	"routine": ["Exercise:", "Anaerobics"],
					"routineType": ["Workout:", "Bent Over Rows"],
					"sun": ["Sun:", ""],
					"mon": ["Mon:", ""],
					"tue": ["Tue:", "×"],
					"wed": ["Wed:", ""],
					"thu": ["Thu:", "×"],
					"fri": ["Fri:", ""],
					"sat": ["Sat:", ""],
					"reDu": ["Reps/Duration:", 15],
					"notes": ["Comments:", "Reps / 25lbs"],
					"date": ["Start:", "2011-07-10"]
				},
				"routine19": {
					"name": ["Routine:", "Row your boat!"],
				//	"routine": ["Exercise:", "Aerobics"],
					"routineType": ["Workout:", "Rowing"],
					"sun": ["Sun:", "×"],
					"mon": ["Mon:", ""],
					"tue": ["Tue:", ""],
					"wed": ["Wed:", ""],
					"thu": ["Thu:", ""],
					"fri": ["Fri:", ""],
					"sat": ["Sat:", "×"],
					"reDu": ["Reps/Duration:", 15],
					"notes": ["Comments:", "Duration (min)"],
					"date": ["Start:", "2011-06-20"]
				},
				"routine20": {
					"name": ["Routine:", "Cycling"],
				//	"routine": ["Exercise:", "Aerobics"],
					"routineType": ["Workout:", "Bicycling"],
					"sun": ["Sun:", "×"],
					"mon": ["Mon:", ""],
					"tue": ["Tue:", "×"],
					"wed": ["Wed:", ""],
					"thu": ["Thu:", "×"],
					"fri": ["Fri:", ""],
					"sat": ["Sat:", "×"],
					"reDu": ["Reps/Duration:", 20],
					"notes": ["Comments:", "Duration (min)"],
					"date": ["Start:", "2011-06-14"]
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


	function setListAttributes(storCnt) {
		for (var n = 0, newEvent=""; n < storCnt; n++) {
			newEvent = "titleControl" + n;
			getId(newEvent).addEventListener("click", toggleList);	
		};
	};


	function changeOrder() {
		/*	//Determine which option has been toggled on
			var	newId = getId("tOrder").getAttribute("focused");
			
			if (newId === "false") {
					orderType = "old";
				}
					else if (newId === "true") {
						orderType = "new";
					};
			*/
			//Clear old get data gathered
		var bod = document.getElementsByTagName("body"),
			part = getId("routines");
			bod.removeChild(part);
			
			getData();
	};

	function toggleList(init) {
	//	if (init != true) {	
			var re = /Control/gi,
				re1 = /titleControl/gi,
				idClick = this.id,
				storage = localStorage.length,
				newId = getId(idClick).getAttribute("focused"),
				titler = idClick.replace(re,""),
				imgHandler = idClick.replace(re1,"routineImg");
				
				//Change the display for each control anchor to none
				//Change the images all to maximize
			for (var x = 0; x < storage; x++) {
				getId("title"+x).style.display = "none";
				getId("routineImg"+x).setAttribute("src", "images/maximize.png");
			};
			
			// Determine what options to apply by determining which type of click
			// has been initiated. This is determined by the focused attribute.
			if (newId === "false") {
				getId(titler).style.display = "block";
				
				// Set all focus attributes to false (not clicked)
				for (var z = 0; z < storage; z++) {
					var controller2 = getId("titleControl" + z);
					controller2.setAttribute("focused", "false");
				};
				
				// Set the focused attribute of the id passed in to true (clicked)
				// Set the image to minimized
				getId(idClick).setAttribute("focused", "true");
				getId(imgHandler).setAttribute("src", "images/minimize.png");
			} 
			else {
				// Set the focused attribute of the id passed in to false (unclicked)
				getId(titler).style.display = "none";
				getId(idClick).setAttribute("focused", "false");
				getId(imgHandler).setAttribute("src", "images/maximize.png");
			};
	/*	} // end first if condition 
			else {
				for (var l = 0; l < localStorage.length; l++) {
					getId("title"+l).style.display = "none";
					getId("routineImg"+l).setAttribute("src", "images/maximize.png");
				};
			};*/
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
		//	getId("exercise").value = item.routine[1];
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
		//	addExerciseType();
	};

	
	function resetErrMsg() {
		var	getRoutine = getId("routineName"),
		//	getExercise = getId("exercise"),
			getWorkout = getId("workout"),
			getStartDate = getId("startDate");
			
		//Reset error messages
			errMsg.innerHTML = "";
			errMsg.style.color = "#CC9B73";
			getRoutine.style.border = "1px solid black";
		//	getExercise.style.border = "1px solid black";
			getWorkout.style.border = "1px solid black";
			getStartDate.style.border = "1px solid black";
			getId("rtFreq").style.border = "none";
			getId("workout2").style.border = "none";
	
	};
	
	function validate(e) {
		// Define the elements we want to check
		var	getRoutine = getId("routineName"),
			//getExercise = getId("exercise"),
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
			
		/*	// Exercise validation
			if (getExercise.value === "--Choose An Exercise Type--") {
				err = "Please choose an exercise type."
				
				getExercise.style.border = "2px solid #990000";
				messageArr.push(err);
			};
		*/	
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

	function redirect() {
		var addie = getId("body"),
			subbie = getId("routineForm");
		
		toggleControls("off");
		subbie.style.display = "block";
		addie.style.display = "none";
		restoreDefault();
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
	
	
	function setInlayVars() {
		
		var thisId = this.id,
			localId = ["Running", "Kickboxing", "Swimming", "Bicycling", "Rowing", "Jump Rope", "Squats",
			"Leg Extension", "Dumbbell Curls", "Bench Press", "Tricep Extension", "Bent Over Rows", "Jumping Jacks",
			"Lunges", "Dips", "Crunches", "Pull Ups", "Push Ups", "Hip Flexor Stretch", "Piriformis Stretch",
			"Hamstring Stretch", "Quad Stretch", "Back Stretch", "Shoulder Stretch", "Walking", "Side Lunges",
			"Step Ups", "Lite Swimming", "Lying Abduction", "Wall Squats"],
			container = [
			["aero",["Running", "Kickboxing", "Swimming", "Bicycling", "Rowing", "Jump"]],
			["anaero",["Squats", "Leg", "Dumbbell", "Bench", "Tricep", "Bent"]],
			["calisth",["Jumping", "Lunges", "Dips", "Crunches", "Pull", "Push"]],
			["flex",["Hip", "Piriformis", "Hamstring", "Quad", "Back", "Shoulder"]],
			["matern",["Walking", "Side", "Step", "Lite", "Lying", "Wall"]]
			];
		
			
			
		for (var x=0, w=0; x<container.length; x++) {
		
			for (var y=0; y<container[x][1].length; y++) {
				var newWord = localId[w];
		
				for (var k=0, noSpace=""; k < newWord.length; k++) {
					// Eliminates the white spaces (if any) in the string
					if (!(newWord.charAt(k)==" ")) {
						noSpace += newWord.charAt(k);
					};
				};
				
				// uncapitalize first letter of each string in the array
				var firstLetter = noSpace.charAt(0);
					noSpace = firstLetter.toLowerCase() + noSpace.substring(1,noSpace.length);
				
			
				var newConcat = container[x][0] + container[x][1][y],
					newPrefix = container[x][0];
				
				// If the id of the clicked link equals the id of the new concatenation then
				// check the radio button that corresponds to that given id
				if (thisId == newConcat) {
					getId(noSpace).setAttribute("checked", "checked");
					getId(newPrefix).setAttribute("data-collapsed", "false");
				};
				w++;
			};
		};
	
	};
	
	
	function setInlayLinks() {
		
		var container = [
			["aero",["Running", "Kickboxing", "Swimming", "Bicycling", "Rowing", "Jump"]],
			["anaero",["Squats", "Leg", "Dumbbell", "Bench", "Tricep", "Bent"]],
			["calisth",["Jumping", "Lunges", "Dips", "Crunches", "Pull", "Push"]],
			["flex",["Hip", "Piriformis", "Hamstring", "Quad", "Back", "Shoulder"]],
			["matern",["Walking", "Side", "Step", "Lite", "Lying", "Wall"]]
		];
			
		for (var x=0; x<container.length; x++) {
		
			for (var y=0; y<container[x][1].length; y++) {
				var setClick = container[x][0] + container[x][1][y];
				getId(setClick).addEventListener("click", setInlayVars);
			};
		};
		
	};
	
	
	function setRoutineLinks() {
		var fetchId = ["dumbbell", "running", "hip", "dips", "walking", "back",
						"crunches", "bench", "kickboxing", "jump", "tricep",
						"swimming", "hamstring", "lunges", "step", "shoulder",
						"pull", "bent", "rowing", "bicycling"];
			
			for (var z=0; z < fetchId.length; z++) {
				var getNew = fetchId[z] + "List",
					editDisplay = fetchId[z] + "ListItem";
					
				getId(getNew).addEventListener("click", changeRoutineDisplay);
				getId(editDisplay).style.display = "none";
			};
	};
	
	
	function changeRoutineDisplay() {
		var thisIdList = this.id + "Item",
			fetchId = ["dumbbell", "running", "hip", "dips", "walking", "back",
						"crunches", "bench", "kickboxing", "jump", "tricep",
						"swimming", "hamstring", "lunges", "step", "shoulder",
						"pull", "bent", "rowing", "bicycling"];
						
				
			for (var z=0; z < fetchId.length; z++) {
				var getNew = fetchId[z] + "ListItem";
				getId(getNew).style.display = "none";
			};		
	
			getId(thisIdList).style.display = "block";
	};
	
	

	// Variables
	var exerciseList = ["Aerobics", "Anaerobics", "Calisthenics", "Flexibility", "Maternity"],
		day = [],
		exerciseType = "",
		errMsg = getId("errors"),
		isOld = false,
		orderType = "new";
									
					
					
	// Set the Link & Submit click events						
	var save = getId("submit"),
		showLink = getId("showData"),
		clearLink = getId("clearLists"),
		addLink = getId("addNew");
		
		
	showLink.addEventListener("click", getData);
	clearLink.addEventListener("click", clearData);
	save.addEventListener("click", validate);
	addLink.addEventListener("click", redirect);
	
	// Add Event Listener to List-Inlay home page
	setInlayLinks();
	setRoutineLinks();
	
});