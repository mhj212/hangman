var game = {

	Hangman: function (){
		var self = this;
		self.hintButton = $("#hintbutton");
		self.giveUpButton = $("#giveupbutton");
		self.guessedletters = [];
		self.inprogress = true;
		self.tries = 10;
		$('#tries').text('You have ' + self.tries + ' tries left');

		var words = ["cheese", "tacos", "burrito", "carnitas", "chocolate","rigatoni","souffle","coffee","cappuccino","ravioli","tortellini","eggplant","tomato","cherry","apple","orange","carrot","tiramisu","strawberry","mango","clementine","sushi","noodles","almond","cashew","walnut"];
		self.answer = words[Math.floor(Math.random() * words.length)];

		var array_of_blanks = [];
		for (var i = 0; i < self.answer.length; i++) { array_of_blanks.push('_'); }
		self.blanks = array_of_blanks;
		$('#word').text(array_of_blanks.join(' '));

		self.guess = function (guessed_letter){

			if (self.guessedletters.indexOf(guessed_letter) != -1 ) {
				$('#messages').text('you already guessed the letter ' + guessed_letter + '!');
			}
			else
			{

			  if (self.answer.indexOf(guessed_letter) === -1) {

			  	$('#messages').text('The letter "' + guessed_letter + '" is not in the word');
          		self.tries--;
          		$('#tries').text(self.tries + ' tries are left');

          		self.guessedletters.push(guessed_letter);
         	    $('#guessedletters').html('incorrect letters: <span style="color:#d2322d;">' + self.guessedletters.join(', ') + '</span>');

         	    if (self.tries === 0){
         	    	self.gameOver();
         	    }

			  
			}
			else
			{

				  for (var i = 0; i < self.answer.length; i++){
					  	if (self.answer[i] === guessed_letter){
					  		self.blanks[i] = guessed_letter;
					  	    $('#messages').text('the letter "' + guessed_letter + '" is in this word!');

					  	}
				  }
			self.updateBlanks();
			
			}
			
		}}
		

		self.gameOver = function (){
			self.inprogress = false;
			$('#messages').html('sorry, you are out of tries.<br> The answer was <b>"' + self.answer + '"</b>');
			self.gameReset();
		}

		self.gameReset = function (){
			$("#startgame").fadeIn();
			$("#keyboard-message, #hintbutton, #giveupbutton").hide();
		}

		self.updateBlanks = function (){
			var update_blanks = self.blanks.join(' ');
			$("#word").text(update_blanks);
			self.verifySolution();

		}

		self.verifySolution = function (){
			var blanks_array = self.blanks.join('');
			if (blanks_array === self.answer) {
				self.youWin();
			}
		}

		self.youWin = function (){
			self.inprogress = false;
			 $('#messages').text('You are a winner!');
			 self.gameReset();
		}

		self.hintButton.click(function(){
			self.hint();
		});

		self.hint = function(){
		$("#hintbutton").attr('disabled', true);
		var blanks_indexes = [];
			for (var x = 0; x < self.blanks.length; x++)
			{
			   if ( self.blanks[x] === "_"){
			   	blanks_indexes.push(x);
			   }
			}

		      var randomnumber = Math.floor( Math.random() * blanks_indexes.length );
		      var random_index = blanks_indexes[randomnumber];
		      var random_index_letter = self.answer[random_index];
		      self.blanks[random_index] = random_index_letter;
		      self.updateBlanks();
		}

		self.giveUpButton.click(function (){
			self.giveUp();
		});

		self.giveUp = function(){
		  self.inprogress = false;
		  self.tries = 0;
		  $('#tries').text(self.tries + ' tries left');
		   $('#messages').html('The answer was <b>"' + self.answer + '"</b>');
		   self.gameReset(); 
		}
		




	}
}

$(document).ready(function(){
 var startgame;
	$("#startgame").click(function(){
	  
	  $("#keyboard-message").fadeIn();
	  $("#giveupbutton").fadeIn();
	  $("#hintbutton").fadeIn();
	  $("#hintbutton").attr('disabled', false);
	  $("#guessedletters").text("");
	  $("#messages").text("");
	  $("#startgame").hide();

	
	 startgame = new game.Hangman();

	});


    $(document).on('keyup', function (info) { 
      if (startgame.inprogress === true) {
        var input_code = String.fromCharCode(info.which);
        var guessed_letter = input_code.toLowerCase();
        $('#messages').text('');

        console.log(guessed_letter);
        if ( guessed_letter.match(/[a-z]/) ) {
          startgame.guess(guessed_letter); 
        }else{
          $('#messages').text('That character is invalid, please enter a letter!');
        }
      }
    });


});
