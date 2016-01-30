/**
 * @author clalonde
 */

//**********************************
//MY SCORM OBJECT
//**********************************

var _scorm;


var globalData = {};
globalData.currentPage =  1;
globalData.questionDone = [];
globalData.questionnaireDone = [];
globalData.videoDone = [];
globalData.examAccess = false;
globalData.avatar = "";


//**********************************


function Scorm() {

    $('<div />', { id: 'scorm' }).appendTo('body');

	var that = this;

	var userData;
	var suspendData;
	var scorm = pipwerks.SCORM;

    var defaultData = globalData;


	this.init = function() {

		console.log('SCORM: INIT');
		lmsConnected = scorm.init();

		if(lmsConnected) {
			console.log('SCORM: SCORM ET D2L CONNECTER!');

			userData = scorm.get("cmi.suspend_data");

			if(userData != '') {
				userData = JSON.parse(userData);

				console.log('SCORM: UserData after init.');
				console.log(userData);

                globalData = userData;

			}
			else{
				console.log('SCORM: Obj vide, donc defaultData utilisé');
				userData = defaultData;
				that.save(defaultData);
			}
		}
		else{
			console.log('SCORM: Ne peut connecter SCORM, pas connecté à D2L');
			userData = defaultData;
			console.log(userData);
		}

        $('#scorm').data('save', that.save);
        $('#scorm').data('delete', that.clear);
	};

    this.save = function(newData) {
		if(lmsConnected) {
			console.log('SCORM: save');
			scorm.set("cmi.suspend_data", JSON.stringify(newData));

			var _newData = scorm.get("cmi.suspend_data");
			_newData = JSON.parse(_newData);
		}
		else {
//			console.log("SCORM: Cannot save, pas connecter à D2L");
		}
	};

	this.clear = function(){
		if(lmsConnected) {
			console.log('SCORM: clear');

            globalData = {};
            globalData.currentPage =  1;
            globalData.questionDone = [];
            globalData.questionnaireDone = [];
            globalData.videoDone = [];
            globalData.examAccess = false;
            globalData.avatar = "";

			console.log('userData de clear: ');
			console.log(globalData);
			that.save(globalData);

			console.log('SCORM: userData after clear');
			console.log(globalData);
		}
		else {
			console.log("SCORM: Cannot delete, pas connecter à D2L");
		}
	};

	this.terminate = function() {
		if(lmsConnected) {
			console.log('SCORM: Session SCORM with D2L over');
			scorm.quit();
		}
		else {
			console.log("SCORM: Cannot quit, pas connecter à D2L");
		}
	};
}


$(function() {
	_scorm = new Scorm();
	_scorm.init();
});
