/*
==============================================
BMI Application
==============================================
*/

//waiting for html to load first
(function(){


//creating global variables

var bmiApp = $('#bmi');
var englishForm = $('#English');
var metricForm = $('#Metric');
var buttonForEnglish = $('#calculateEnglish');
var buttonForMetric = $('#calculateMetric')
var displayBmi = $('#bmiResult');
var alertForBmi = 'You need to enter your weight and height, so I can figure out your BMI';

//create an event listener on the tab menu
$(bmiApp).on('click', 'li', function(event){
	event.preventDefault();

	//When clicked on any of two tabs it selects that tab
	$(this).closest(bmiApp).find('.active').removeClass();
	$(this).addClass('active');

	//clicked on any tabs it will show the form related to that tab
	if($(this).text() === "Metric"){
		$(englishForm).css({'display': 'none'});
		$(metricForm).css({'display': "block"});
	}else{
		$(englishForm).css({'display': 'block'});
		$(metricForm).css({'display': "none"});
	}
});

//create event on the calculate button and the end it wll show the bmi score on page
$(bmiApp).on('click', 'button', function(event){
	event.preventDefault();

	//creating variables for inputs
	var weightEn = +$('.weightEn').val();
	var feet = +$('.feetEn').val();
	var inch = +$('.inchEn').val();
	var weightMe = +$('.weightMe').val();
	var heightMe = +$('.heightMe').val();

	//after clicking once it will disable the button so it does not add text
	$(this).prop('disabled', true);

	//the button goes back active after cklicking inside any input and clear the text on the page
	$('input').focus(function(){
				$('button').prop('disabled', false);
				$(displayBmi).text('');
			});

	if($('#bmi .active').text() === "English"){

		//if user leave inputs empty
		if(weightEn == '' || feet == '' || inch == '' ){
			$(displayBmi).text('');
			$(displayBmi).append('<p class="bmiAlert">' + alertForBmi + '</p>');
		}

		//calculation for English bmi and appending the score to the div #bmiResult
			var heightEn = (feet * 12) + inch;
			var bmiEnglish = (weightEn * 703) / (heightEn * heightEn);
			var bmiScore = bmiEnglish.toFixed(2);
		

	}else if($('#bmi .active').text() === "Metric"){

		//if user leave inputs empty
		if(weightMe == '' || heightMe == '' ){
			$(displayBmi).text('');
			$(displayBmi).append('<p class="bmiAlert">' + alertForBmi + '</p>');
		}

		//calculation for English bmi and appending the score to the div #bmiResult
			var bmiMetric = weightMe / (heightMe * heightMe);
			var bmiScore = (bmiMetric*10000).toFixed(2);
		
	};

	//inserting images and texts for different bmi scores
	
	function insertImage(source, text){
		$(displayBmi).text('');
		$(displayBmi).append('<p class="lead">Your BMI score is ' + bmiScore + '</p>');
		$(displayBmi).append('<img src="" class="bmiImage">');
		var imageOfBmi = $('.bmiImage');
		imageOfBmi.attr('src', source);
		imageOfBmi.hide().slideDown('slow');
		$(displayBmi).append('<p class="lead">' + text + '</p>');
		$(bmiApp).css({'margin-bottom': "50px"});
	};

	if(bmiScore < 20){
		insertImage('img/bale.jpg', 'You are underweight! better start eating food more often!');
	}else if(bmiScore >= 20 && bmiScore < 25){
		insertImage('img/james.jpg', 'You are at normal weight! keep up the good work');
	}else if(bmiScore >= 25 && bmiScore < 30){
		insertImage('img/seth.jpg', 'You are overweight! No more junk food for you buddy')
	}else if(bmiScore >= 30 && bmiScore <= 40){
		insertImage('img/zach.jpg', 'You are moderately obese! You better start going to gym')
	}else if(bmiScore > 40 ){
		insertImage('img/john.jpg', 'OMG! You are severly obese! Talk to your doctor today')
	}

});


//function ready ends here
})();
