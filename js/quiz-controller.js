jQuery(document).ready(function($) {

	// Start score at zero
	var totalQuestions = $('.question-panel').length;
	var totalCorrect = 0;
	var finalScore = 0;

	// Form progression animation
	// Adapted from Atakan Goktepe's "Multi Step Form" demo
	// http://codepen.io/atakan/pen/gqbIz
	var current_fs, next_fs, previous_fs; //fieldsets
	var left, opacity, scale; //fieldset properties which we will animate
	var animating; //flag to prevent quick multi-click glitches

	$(".next").click(function(){
		if(animating) return false;
		animating = true;
		
		current_fs = $(this).parent();
		next_fs = $(this).parent().next();
		
		//activate next step on progressbar using the index of next_fs
		$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
		
		//show the next fieldset
		next_fs.show(); 
		//hide the current fieldset with style
		current_fs.animate({opacity: 0}, {
			step: function(now, mx) {
				//as the opacity of current_fs reduces to 0 - stored in "now"
				//1. scale current_fs down to 80%
				scale = 1 - (1 - now) * 0.2;
				//2. bring next_fs from the right(50%)
				left = (now * 50)+"%";
				//3. increase opacity of next_fs to 1 as it moves in
				opacity = 1 - now;
				current_fs.css({
	        'transform': 'scale('+scale+')',
	        'position': 'absolute'
	      });
				next_fs.css({'left': left, 'opacity': opacity});
			}, 
			duration: 800, 
			complete: function(){
				current_fs.hide();
				animating = false;
			}, 
			//this comes from the custom easing plugin
			easing: 'easeInOutBack'
		});
	});

	$(".previous").click(function(){
		if(animating) return false;
		animating = true;
		
		current_fs = $(this).parent();
		previous_fs = $(this).parent().prev();
		
		//de-activate current step on progressbar
		$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
		
		//show the previous fieldset
		previous_fs.show(); 
		//hide the current fieldset with style
		current_fs.animate({opacity: 0}, {
			step: function(now, mx) {
				//as the opacity of current_fs reduces to 0 - stored in "now"
				//1. scale previous_fs from 80% to 100%
				scale = 0.8 + (1 - now) * 0.2;
				//2. take current_fs to the right(50%) - from 0%
				left = ((1-now) * 50)+"%";
				//3. increase opacity of previous_fs to 1 as it moves in
				opacity = 1 - now;
				current_fs.css({'left': left});
				previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
			}, 
			duration: 800, 
			complete: function(){
				current_fs.hide();
				animating = false;
			}, 
			//this comes from the custom easing plugin
			easing: 'easeInOutBack'
		});
	});

	$(".submit").click(function(){
		return false;
	});

	// Click Action for each question in quiz

	$("#msform").change(function () {

		// quiz JSON object to check selection against
		var dataSource = 'http://variano.site/wp-json/wp/v2/quiz/16';

		// Incorrect and Correct Alert Boxes as variables
		var wrongAnswer = '<div class="alert alert-danger"><strong>Bummer!</strong> That\'s Incorrect.</div>';
		var rightAnswer = '';
		var answerExplain = '';

		// Get the value of the current answer and determine current question
		var checkedNow = $("input[name='selector']:checked");
		var pickedAnswer = checkedNow.siblings("label").html();
		var panelNum = checkedNow.parents("fieldset").attr("data-panel");

		// Set default value to false, until we know it's true
		var correct = false;

		// Check selected answer against data from the JSON object to determine if correct
		$.getJSON(dataSource, function(data) {
			$.each(data.acf.quiz_container[panelNum].answers_container, function(i, ques) {
				if(this.answer == pickedAnswer && this.is_correct == "Correct") {
					// Indicate that answer is correct.
					correct = true;
					// Increment score and update final score on last panel.
					totalCorrect++;
					finalScore = (totalCorrect / totalQuestions) * 100;
					finalScore = Math.floor(finalScore);
					$(".final-score").html('You Scored ' + finalScore + '%');
					rightAnswer += '<div class="alert alert-success">';
					rightAnswer += this.answer_message;
					rightAnswer += '</div>';
				} else {
					// Just update final score on last panel.
					// Will eventually refactor this as a function
					// we can call on
					finalScore = (totalCorrect / totalQuestions) * 100;
					finalScore = Math.floor(finalScore);
					$(".final-score").html('You Scored ' + finalScore + '%');
				}
			});

			// Disable current radio options so no other values can be selected
			// Also, show 'Next' button
			checkedNow.closest(".radio-list").css("pointer-events", "none");
			$(".prog-" + panelNum).show();

			// Show relevant alert box based on whether or not correct
			if(correct == false) {
				checkedNow.closest(".radio-list").after(wrongAnswer);
			} else {
				checkedNow.closest(".radio-list").after(rightAnswer);
			}

		});

	});

	// Quick fix to change text for final question's button
	$("#msform .next:last").attr("value", "Calculate My Score");

});

