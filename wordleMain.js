//All images are from me. The icons come from "code.org". 
//The app name is based off of the popular game "Wordle"


//Variables:

//The data set came from "code.org"
var allWordsList = getColumn("Words", "Word");
var correctWord = "";
var inputLength = 0;
var currentRow=1;
var guess = "";

//Filter Lists:
var fiveLetterWords = [];
var splitPlayerInput = [];
var splitCorrectWord = [];


//onEvents:

//When the "Start Game" Button is clicked
onEvent("startButton","click",function(){
  newFiveLetterWord();
  setScreen("gameScreen");
});

//A student in my APCSP helped me with this onEvent.
//When the player types in the text input
onEvent("playerInput","input",function(){
  guess = getText("playerInput");
  //Set input length to 0 if the text input is blank
  if(inputLength==0)
  {
    inputLength=guess.length;
  }
 
  //If the user presses "backspace", then it calls the "backSpace" function
  if(guess.length<inputLength)
  {
    backSpace(guess);
  }
  //Set inputLength to how many characters are present in text input
  else
  {
    inputLength=guess.length;
  }
  updateText(guess);
});


//A student in my APCSP helped me with this onEvent.
//If the user presses "Enter" on the keyboard
onEvent("gameScreen","keydown",function(event){
  if(event.key == "Enter")
  {
    guess = getText("playerInput").toUpperCase();
    //Only execute if "playerInput" is 5 letters long
    if (guess.length==5)
    {
      //Set the text input to blank.
      setText("playerInput","");
      splitWord(guess);
      //Go down to the next row
      currentRow++;
    }
  }
});

//A student in my APCSP helped me with this onEvent.
//If the user presses the "Confirm" button on the screen
onEvent("confirmButton","click",function(){
  guess = getText("playerInput").toUpperCase();
  //Only execute if "playerInput" is 5 letters long
  if (guess.length==5)
  {
    //Set the text input to blank.
    setText("playerInput","");
    splitWord(guess);
    //Go down to the next row
    currentRow++;
  }
});

//When the user presses the "Restart" button after the game ends
onEvent("NewGameButton", "click", function() {
  setScreen("titleScreen");
  resetGame();
});


//Functions:

//****************************************************************
//Function Name: newFiveLetterWord
//Description : Every time the "Start Game" button is clicked,
// change "correctWord" to a different randomized word.
//****************************************************************
function newFiveLetterWord (){
  fiveLetterWords = [];
  //Filters the "allWordsList" to contain only 5 letter words
  for (var i=0; i<allWordsList.length; i++)
  {
    if (allWordsList[i].length == 5)
    {
      appendItem(fiveLetterWords, allWordsList[i]);
    }
  }
  //Sets "correctWord" to a random 5 letter word based on the filtered list.
  correctWord = fiveLetterWords[randomNumber(0, fiveLetterWords.length)].toUpperCase();
  console.log(correctWord.toUpperCase());
}

//****************************************************************
//Function Name: updateText
//Description : Allows the user to type in the input box down below
// and will display in the boxes up above.
//Parameter {string} : What the user inputted (guess)
//****************************************************************
//A student in my APCSP helped me with this function.
function updateText(input)
{
  //Only updates the text boxes if the "playerInput" doesn't exceed
  //5 characters and if correct row is less than or equal to 6.
  if(input.length<6 && currentRow <= 6)
  {
    //Sets the boxes to each letter that the player inputs
    for(var i=0; i<input.length;i++)
    {
      setText("R"+currentRow+"_"+i,input[i].toUpperCase());
      setProperty("R"+currentRow+"_"+i, "border-width", 1.5);
      setProperty("R"+currentRow+"_"+i, "border-color", "black");
    }
  }
}

//****************************************************************
//Function Name: backSpace
//Description : When the user deletes a letter in the text input, it
// will also delete the letter in the boxes above as well.
//Parameter {string} : What the user inputted (guess)
//****************************************************************
//A student in my APCSP helped me with this function.
function backSpace(input)
{
  //The current row has to be less than or equal to 6
  if(currentRow <= 6)
  {
    //Sets the unused boxes back to blank
    for(var i=input.length;i<5;i++)
    {
      setText("R"+currentRow+"_"+i,"");
      setProperty("R"+currentRow+"_"+i, "border-width", 1);
      setProperty("R"+currentRow+"_"+i, "border-color", rgb(211,211,211));
    }
  }
}

//****************************************************************
//Function Name: splitWord
//Description : Places each letter in "correctWord" and the "guess"
// in each of their corresponding lists, with each letter
// as an individual element.
//Parameter {string} : What the user inputted (guess.toUpperCase())
//****************************************************************
function splitWord(input)
{
  //Places all of the correct word's letters in a list, with each
  //letter being a different element.
  splitCorrectWord = [];
  for(var i=0; i<correctWord.length; i++)
  {
    appendItem(splitCorrectWord, correctWord[i]);
  }
  console.log(splitCorrectWord);
  //Places all of the player input's letters in a list, with each
  //letter being a different element.
  splitPlayerInput = [];
  for(var j=0; j<input.length; j++)
  {
    appendItem(splitPlayerInput, input[j]);
  }
  console.log(splitPlayerInput);
  changeColor(splitPlayerInput, splitCorrectWord);
}

//****************************************************************
//Function Name: changeColor
//Description : Places each letter in "correctWord" and the "guess"
// in each of their corresponding lists, with each letter
// as an individual element.
//Parameters {lists} : splitPlayerInput and splitCorrectWord
//****************************************************************
function changeColor(guess, correct){
  //First, it checks to see if there are any letters in "splitPlayerInput"
  //that are in the correct spot. 
  for(var i=0; i<guess.length; i++)
  {
    if (guess[i] == correct[i])
    {
      //If there are, then it removes the letter in the "splitCorrectWord"
      //list and replaces it with "green".
      removeItem(splitCorrectWord, i);
      insertItem(splitCorrectWord, i, "green");
    }
  }
  
  //Second, it checks to see the position of the letters in "splitPlayerInput".
  //Depending on where they're located, their background color changes. 
  for(var j=0; j<guess.length; j++)
  {
    //If an element in "splitCorrectWord" is "green" (we changed the letters in the correct
    //spot to "green" in the first loop), then set the background color to "lightgreen".
    if (correct[j] == "green")
    {
      setProperty("R"+currentRow+"_"+j, "background-color", "lightgreen");
    }
    
    //If the first letter "splitPlayerWord" is found in "splitCorrectWord", remove the 
    //letter in "splitCorrectWord" and set it to "yellow". Set the background color to "yellow"
    else if (guess[j] == correct[0])
    {
      setProperty("R"+currentRow+"_"+j, "background-color", "yellow");
      removeItem(correct, 0);
      insertItem(correct, 0, "yellow");
    }
   
    //If the second letter "splitPlayerWord" is found in "splitCorrectWord", remove the 
    //letter in "splitCorrectWord" and set it to "yellow". Set the background color to "yellow"
    else if (guess[j] == correct[1])
    {
      setProperty("R"+currentRow+"_"+j, "background-color", "yellow");
      removeItem(correct, 1);
      insertItem(correct, 1, "yellow");
    }
    
    //If the third letter "splitPlayerWord" is found in "splitCorrectWord", remove the 
    //letter in "splitCorrectWord" and set it to "yellow". Set the background color to "yellow"
    else if (guess[j] == correct[2])
    {
      setProperty("R"+currentRow+"_"+j, "background-color", "yellow");
      removeItem(correct, 2);
      insertItem(correct, 2, "yellow");
    }
    
    //If the fourth letter "splitPlayerWord" is found in "splitCorrectWord", remove the
    //letter in "splitCorrectWord" and set it to "yellow". Set the background color to "yellow"
    else if (guess[j] == correct[3])
    {
      setProperty("R"+currentRow+"_"+j, "background-color", "yellow");
      removeItem(correct, 3);
      insertItem(correct, 3, "yellow");
    }
    
    //If the fifth letter "splitPlayerWord" is found in "splitCorrectWord", remove the 
    //letter in "splitCorrectWord" and set it to "yellow". Set the background color to "yellow"
    else if (guess[j] == correct[4])
    {
      setProperty("R"+currentRow+"_"+j, "background-color", "yellow");
      removeItem(correct, 4);
      insertItem(correct, 4, "yellow");
    }
    
    //If a letter isn't found in "splitCorrectWord", set the background color to "grey".
    else
    {
      setProperty("R"+currentRow+"_"+j, "background-color", "grey");
    }
  }
  //If the player guessed the word correctly, SplitCorrectWord should be:
  //["green", "green", "green", "green", "green"]
  winGame(correct);
}

//****************************************************************
//Function Name: winGame
//Description : Checks to see if the player guessed the correct word
// after 6 tries. If they guess it in less than 6 tries,
// they win, if they don't, they lose.
//Parameter {list} : splitCorrectWord
//****************************************************************
function winGame(correct)
{
  //Checks to see if the user guessed the words in 6 tries. If they
  //did, then "WinOrLose_Label" is updated to display that the player won.
  if (currentRow <= 6 && correct.join() == "green,green,green,green,green")
  {
    setProperty("WinOrLose_Label", "text", "Congratulations! You guessed the word!");
    updateResultScreen();
  }
  //If the user took 6 tries and didn't guess the word, it updates
  //the "WinOrLose_Label" to display that the player lost. 
  else if (currentRow == 6)
  {
    setProperty("WinOrLose_Label", "text", "You didn't guess the word correctly. The word was:\n
    + correctWord);
    updateResultScreen();
  }
}

//****************************************************************
//Function Name: updateResultScreen
//Description : Displays "WinOrLose_Label", "NewGameButton", and
// a blocker in front of the text input to prevent the
// player from typing.
//****************************************************************
function updateResultScreen()
{
  //Displays all of the hidden "Results" labels
  setProperty("WinOrLose_Label", "hidden", false);
  setProperty("NewGameButton", "hidden", false);
  setProperty("text_Blocker", "hidden", false);
}

//****************************************************************
//Function Name: resetGame
//Description : Resets the whole game. It does this by hiding the 
// labels, setting the variables back to their initial
// values, and clearing all of the text boxes.
//****************************************************************
function resetGame()
{
  //Resets the "inputLength" and "currentRow" to their default values.
  inputLength = 0;
  currentRow = 1;
  //Hides all of the "Results" labels.
  setProperty("WinOrLose_Label", "hidden", true);
  setProperty("NewGameButton", "hidden", true);
  setProperty("text_Blocker", "hidden", true);
  //Resets all of the boxes to be blank.
  //Row "tracker"
  for(var i=0; i<=4; i++)
  {
    //Box "tracker"
    for(var j=1; j<=6; j++)
    {
      setProperty("R"+j+"_"+i, "text", "");
      setProperty("R"+j+"_"+i, "background-color", rgb(242, 242, 242));
      setProperty("R"+j+"_"+i, "border-color", rgb(211, 211, 211));
    }
  }
}
