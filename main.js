// Initialize Firebase
var config = {  
    apiKey: "AIzaSyDNefCqQ0CekR4HYqYyMpgyQknZu1WN9FA",
    authDomain: "chatrps-460f5.firebaseapp.com",
    databaseURL: "https://chatrps-460f5.firebaseio.com",
    storageBucket: "chatrps-460f5.appspot.com",
    messagingSenderId: "279782790334" 
              }; 
firebase.initializeApp(config);

var dataRef = firebase.database();
 var userId =0; 

var maxusers = 10;
var wins=0;
var losses=0;
var ties=0;
var currentusers =[];
var unpairedusers=[];
var chatpairs=[];
updateCurrentUsers();
var choice='empty';
 $("#rock").hide();
    $("#paper").hide();
    $("#scissors").hide();
var playerchoice='empty';
function updateCurrentUsers()
{
                            // Adds values to the currentusers array;
dataRef.ref().child('users').on("child_added", function(snapshot) {

                                 
                                 var childData = snapshot.val();
                                 console.log("snapshot is : " + snapshot.val());
                                 currentusers.push(childData.userid);
                                 console.log("currentusers array in child added: " + currentusers);
                                                                   
                                                        });
    

                            // Adds values to the currentusers array;
dataRef.ref().child('users').on("value", function(snapshot) {

                                  console.log("in update wins losses");
                                 $('#wins').html("No of wins " + wins);
                                 $('#losses').html("No of losses " +losses);
                                 $('#ties').html("No of ties " +ties);
                                                                   
                                                        });
    
    
    
    
    
   
    dataRef.ref().child('chatpairs').on("child_added", function(snapshot) {

                                 
                                 var childData = snapshot.val();
          console.log("currentusers  chatpairs array in child added: 1 " +  chatpairs);
                                 console.log("snapshot is : " + snapshot.val());
                                 chatpairs.push(childData.me);
                                 chatpairs.push(childData.chatpair);
                                 console.log("currentusers  chatpairs array in child added: 2 " +  chatpairs);
                                   startconversation(childData.me,childData.chatpair);                                 
                                                        });
    
     dataRef.ref().child('chatpairs/user').on("child_added", function(snapshot) {
                         
                                 var childData = snapshot.val();
          console.log("currentusers  chatpairs array in child added: 1 " +  chatpairs);
                                 console.log("snapshot is : " + snapshot.val());
                                 chatpairs.push(childData.me);
                                 chatpairs.push(childData.chatpair);
                                 console.log("currentusers  chatpairs array in child added: 2 " +  chatpairs);
                                   startconversation(childData.me,childData.chatpair);    
    
                                                        });
    
      dataRef.ref().child('rpsresult').on("child_added", function(snapshot) {
                         
                                 var childData = snapshot.val();
                                         console.log(" dataRef.ref().child('rpsresult/'+userId).on(child_added, function(snapshot)"); 

                                 if(childData.pair==userId)
                                     
                                    { $('#opponent').html("You chose : "  + childData.opponentschoice+" <br> Your opponent chose : " + childData.mychoice + "<br><b> You " + childData.result + "</b>");
                                     
                                         if(childData.result=='win')
                                         wins++ ;
                                        if(childData.result=='lose')
                                        losses++;
                                        if(childData.result=='tie')
                                        ties++;
                                     
                                     
                                     
                                   //  var hopperRef = dataRef.child("users/" +userId);
dataRef.ref().child("users/" +userId).update({
  "wins": wins,
     "losses": losses,
     "ties": ties
});
                                     
                                     $("#messagebox2").html("");
                                  dataRef.ref().child('rpsresult/'+ childData.me).remove() ;
                                   choice='empty';
                                    playerchoice='empty';
                                 $("#rock").show();
                                 $("#paper").show();
                                 $("#scissors").show();}
                                 
                                                        });
    
    
    
    
    dataRef.ref().child('Unpairedrecord').on("child_added", function(snapshot) {
                                var childData = snapshot.val();
                              // if((childData.username>0)&&(childData.username<=maxusers))
                                 unpairedusers.push(childData.username);
                                
         });
     dataRef.ref().child('rps').on("child_added", function(snapshot) {
                                var childData = snapshot.val();
                              // if((childData.username>0)&&(childData.username<=maxusers))
                               console.log("inside dataRef.ref().child('rps').on(child_added, function(snapshot)"); 
         
         console.log("childData.pair :"+childData.pair+"childData.choice: "+childData.choice,"userId is:"+userId);
                                if((childData.pair)==userId)
                               { 
                                   
                                   playerchoice=childData.choice;
                                   dataRef.ref().child('rps/'+ childData.me).remove() ;
                                   if(choice=='empty')
                                      { console.log("inside the if");
                                    $("#messagebox2").html("<b>Your opponent has played. Please select a choice button to play</b>");
                                   }
                                    else 
                                    {
                                        playrps(choice,playerchoice);
                                    }
                                        }
         
         });
    
    dataRef.ref().child('chats').on("child_added", function(snapshot) {
                                var childData = snapshot.val();
                              // if((childData.username>0)&&(childData.username<=maxusers))
        //console.log("chats childData.conv " +  childData.conv + " childData.chatpair " + childData.chatpair);
                                 if(userId==childData.chatpair)
                               $('#chat-history').append("<br>" + childData.conv);
         dataRef.ref().child('chats/'+childData.me).remove() ;
        
         });
        
        dataRef.ref().child('Unpairedrecord').on("child_removed", function(snapshot) {
                                var itemRemoved = snapshot.val().username;
                              // if((childData.username>0)&&(childData.username<=maxusers))
                                 var index = unpairedusers.indexOf(itemRemoved);
                                 unpairedusers.splice(index, 1);
                                 
                                //console.log("unpaireduser popped " + unpairedusers);
                                 
                                                                   
                                                        });
                                // Removes values from the currentusers array;
dataRef.ref().child('users').on("child_removed", function(snapshot) {

                                 var itemRemoved = snapshot.val().userid;
                                 //console.log("child_removed is : " + itemRemoved);
                                 //console.log("currentusers array in child removed: " + currentusers);
                                 var index = currentusers.indexOf(itemRemoved);
                                 currentusers.splice(index, 1);
                                  removechatpairs(itemRemoved);
                                 if(unpairedusers.includes(itemRemoved))
                                 {
                                     removeUnpairedrecord(itemRemoved);
                                    //var index = unpairedusers.indexOf(itemRemoved);
                                    // unpairedusers.splice(index, 1);
                                 }
                                    
                                    
                      });
}
 
    

                   


function writeUserData(userId, name, wins, losses) {

    //console.log("inside write function"); 

   dataRef.ref().child('users/'+ userId).set({  

            username: name,

            wins: wins,

            losses: losses,
       
            ties:ties,

            userid: userId 

                                                    });

                                                    }

function removeUserData(userid){
    
    //console.log("inside removeUserData"); 
   dataRef.ref().child('users/'+ userid).remove() 
   //console.log("UserData removed");
    
                        }

function writeUnpairedrecord(userId) {
    //console.log(" inside writeUnpairedrecord"); 
   dataRef.ref().child('Unpairedrecord/'+userId).set({  
       
            username: userId,
          
                                                    });
                                                    }

function removeUnpairedrecord(userId) {
    //console.log("inside removeUnpairedrecord"); 
   dataRef.ref().child('Unpairedrecord/'+userId).remove() 
   //console.log(" removed");
    
    
   
    
  // var adaRef = firebase.database().ref('users/ada');
//adaRef.remove()    
          
          
                                                    
                                                    }
 function recordchatpairs(userid1,userid2) {
    //console.log("inside recordchatpairs"); 
     //chatpairs.push(userid1);
     //chatpairs.push(userid1);
   dataRef.ref().child('chatpairs/'+userid1).set({  
       
            me:userid1,
            chatpair : userid2
          
                                             });
 
       }



       function startconversation(userid1,userid2){
           
           $('#messagebox1').html("Your user id is : " + userId);
           if(userId==userid1)
           {$('#messagebox1').append("<br>You are now connected to " + userid2);
           }
            if(userId==userid2)
               $('#messagebox1').append("<br>You are now connected to " +userid1);
           
           
       //     dataRef.ref().child('chatpairs/'+userid1).set({  
       
     //  conversation:
          
         //                                    });
           
           
       }

function removechatpairs(itemRemoved){
    //console.log("itemRemoved : " + itemRemoved);
    var pair=0;
    //console.log("inside removechatpairs chatpairs is " +  chatpairs);
    //console.log("inside removechatpairs");
    var index=chatpairs.indexOf(itemRemoved);
     //console.log("chatpairs.indexOf(itemRemoved)" + index);
    if((index)%2==0)
        {   pair=chatpairs[index+1];
            chatpairs.splice(index, 2);
        }
        
    else
    {    pair=chatpairs[index-1];
     
        chatpairs.splice((index-1), 2);
     }
    
     dataRef.ref().child('chatpairs/'+ itemRemoved).remove();
     dataRef.ref().child('chatpairs/'+ pair).remove();
    
    //console.log("inside removechatpairs .....chatpair removed   pair is " + pair );
     if(unpairedusers.length>0)
                                                 {var value=unpairedusers[(unpairedusers.length)-1];
                                                  removeUnpairedrecord(value);
                                                  recordchatpairs(pair,value);
                                                 }
                                                else
                                                {writeUnpairedrecord(pair);}


}

  
   
   
  
       
    
    
    


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
                                }

function assignUniqueId(username) {
                        var IsValid = false;
                        while (IsValid == false) {
                                    var Id = getRandomInt(1, maxusers);
                                    //console.log("id is:" + Id);
                                    function checkuserId(presentId) {
                                                            //console.log("id is:" + Id+" presentId is: "+presentId);
                                                            //return Id != presentId;
                                                            if(Id==presentId)return false;
                                                            else return true;
                                                                    }
                                    
                                    //console.log("currentusers in assignunique id is : " + currentusers);
                                    var result = currentusers.every(checkuserId);
                                    //console.log("currentusers.every(checkuserId) = " + result);
                                    if (result == true) {
                                                //console.log("new id is : " + Id);
                                                userId=Id;
                                                writeUserData (Id, username, '', '');
                                                //get unpaired record, if atleast 1, pop and pair, else push yourself into the unpaired record.
                                                if(unpairedusers.length>0)
                                                 {var value=unpairedusers[(unpairedusers.length)-1];
                                                  removeUnpairedrecord(value);
                                                  recordchatpairs(userId,value)
                                                 }
                                                else
                                                {writeUnpairedrecord(userId);
                                                }
                                                IsValid = true;
                                                        }
                                    else {
                                                //console.log("uh oh id is duplicated :" + userId );
                                                if (currentusers.length == maxusers) {
                                                            //console.log("max no of users reached");
                                                            IsValid = true;
                                                                                }
                                         }


                                                    }

                        }
//Assign New Id
/*function pair() {
                while(unpairedusers.length>=2)
                {
                   var element1 = unpairedusers.pop();
                   var element2=unpairedusers.pop();
                   gameon(element1,element2);        

                }
    
function gameon(element1,element2){
                    
                  dataRef.ref().child('users/'+ element1).set({  
                       opponent : element2;
                       chathistory : '';
                                          });
                 dataRef.ref().child('users/'+ element2).set({  
                       opponent : element1;
                       chathistory : '';
                                          });
                
                
                
                }*/
    
/*$("##send-button").on("click", function(event) {

                           event.preventDefault();
                           //console.log($('#send-button').val());
                           dataRef.ref().child('users/'+ myId).set({
                           chathistory : 'whatever is captured'
                                          });
                                                    });*/

      
$(window).on('beforeunload', function ()
    {    
    
        removeUserData(userId);
        
       
       alert("hi");
        return false;
    });



   
$("#submit-username").on("click", function(event) {

                            event.preventDefault();
                           
                            //console.log($('#userName').val());
                            assignUniqueId($('#userName').val())   ;
                            $("#signin").hide();
     $("#rock").show();
                                 $("#paper").show();
                                 $("#scissors").show();

                          
   });
$("#send-button").on("click", function(event) {

                  var index=chatpairs.indexOf(userId);
    
     $('#chat-history').append("<br>" + userId + " : " + $('#chat-text').val());
    
    if((index)%2==0)
        {   pair=chatpairs[index+1];
           
        }
        
    else
    {    pair=chatpairs[index-1];
     
     }         
  
   dataRef.ref().child('chats/'+userId).set({  
       
            me:userId,
            chatpair : pair,
            conv : userId + " : " + $('#chat-text').val()
          
                                             });
 $('#chat-text').val('');
      });
          
                          
function playrps(me,opponent)

{    
     console.log("inside function playrps(me,opponent)");
    
    var result='';
    if((me=='rock')&&(opponent=='paper'))
    result='lose';
    if((me=='rock')&&(opponent=='scissors'))
    result='win';
    if((me=='rock')&&(opponent=='rock'))
    result='tie';
  if((me=='paper')&&(opponent=='paper'))
    result='tie';
    if((me=='paper')&&(opponent=='scissors'))
    result='lose';
    if((me=='paper')&&(opponent=='rock'))
    result='win';
  if((me=='scissors')&&(opponent=='paper'))
    result='win';
    if((me=='scissors')&&(opponent=='scissors'))
    result='tie';
    if((me=='scissors')&&(opponent=='rock'))
    result='lose';
 
 if(result=='win')
     var opponentresult = 'lose';
 if(result=='lose')
     var opponentresult = 'win';
 if(result=='tie')
     var opponentresult = 'tie';
    
    
    if(result=='win')
      wins++ ;
 if(result=='lose')
     losses++;
 if(result=='tie')
     ties++;
    
    dataRef.ref().child("users/" +userId).update({
  "wins": wins,
     "losses": losses,
     "ties": ties
});
                     
 
  var index=chatpairs.indexOf(userId);

    if((index)%2==0)
        {   pair=chatpairs[index+1];
           
        }
        
    else
    {    pair=chatpairs[index-1];
     
     }   
    
    $('#opponent').html("You chose : "  + me+" <br> Your opponent chose : " + opponent + "<br><b> You " + result + "</b>");
    $("#messagebox2").html("");
                                    choice='empty';
                                    playerchoice='empty';
                                 $("#rock").show();
                                 $("#paper").show();
                                 $("#scissors").show();
    
 
  dataRef.ref().child('rpsresult/'+userId).set({  
       
            me:userId,
            mychoice : me,
            opponentschoice:opponent,
            pair:pair,
            result : opponentresult
            
                                             });
     
  
}

function rpsgame(choice)
{    
    console.log("inside function rpsgame(choice)");
    var pair;
    var index;
    if((playerchoice)=='rock'|| (playerchoice)=='paper'||(playerchoice)=='scissors')
        playrps(choice,playerchoice);
        
        else if (playerchoice=='empty')
      {     
      index=chatpairs.indexOf(userId);
    
    if((index)%2==0)
        {   pair=chatpairs[index+1];
           
        }
        
    else
    {    pair=chatpairs[index-1];
     
     }         
  
   dataRef.ref().child('rps/'+userId).set({  
       
            me:userId,
            choice:choice,
            pair:pair
            
                                             });
    
    
      }
    
}

$("#rock").on("click", function(event) {

                           choice='rock';
    $("#rock").hide();
    $("#paper").hide();
    $("#scissors").hide();
     $('#opponent').html("Waiting for your opponent");
    rpsgame(choice);

                          
   });
$("#paper").on("click", function(event) {

                           choice='paper';
    $("#rock").hide();
    $("#paper").hide();
    $("#scissors").hide();
    $('#opponent').html("Waiting for your opponent");
    rpsgame(choice);

                          
   });
$("#scissors").on("click", function(event) {

                           choice='scissors';
    $("#rock").hide();
    $("#paper").hide();
    $("#scissors").hide();
    $('#opponent').html("Waiting for your opponent");
    
    rpsgame(choice);

                          
   });
                    

// var somObj=snapshot.val();
//  console.log("snapshot is : " + snapshot);
// console.log("snapshot.val() is : " + snapshot.val());
//  console.log("snapshot.users is : " + snapshot.val().username );
//currentusers.push(somObj.users.1);
//  console.log("currentusers is " + currentusers);




/*var pairedusers=[];
var unpairedusers=[];
var session=[];
 dataRef.ref().on("child_added", function(snapshot) {
      var somObj=snapshot.val();
     currentusers.push(somObj.name);
     
   
    console.log("currentusers is "+currentusers);
     
     
    
     
    if(somObj.paired==false)
    {
        unpairedusers.push(somObj.name);
        
        
    }
     else
    pairedusers.push(somObj.name);
     
   });   
     if(unpairedusers.length>1)
         for (var i =0;i<(unpairedusers.length-1);i=i+2)
         {   dataRef.ref().on("value", function(snapshot) {
             unpairedusers[i];unpairedusers[i+1]}
         console.log(somObj);
   console.log(somObj.name);
      console.log(somObj.wins);
      console.log(somObj.losees);
      
    }, function(errorObject) {
      console.losomObjg("Errors handled: " + errorObject.code);
    });
*/