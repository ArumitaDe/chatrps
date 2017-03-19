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
var currentusers =[];
var unpairedusers=[];
var chatpairs=[];
updateCurrentUsers();
function updateCurrentUsers()
{
                            // Adds values to the currentusers array;
dataRef.ref().child('users').on("child_added", function(snapshot) {

                                 
                                 var childData = snapshot.val();
                                 console.log("snapshot is : " + snapshot.val());
                                 currentusers.push(childData.userid);
                                 
                                 console.log("currentusers array in child added: " + currentusers);
                                                                   
                                                        });
    dataRef.ref().child('chatpairs').on("child_added", function(snapshot) {

                                 
                                 var childData = snapshot.val();
          console.log("currentusers  chatpairs array in child added: 1 " +  chatpairs);
                                 console.log("snapshot is : " + snapshot.val());
                                 chatpairs.push(childData.me);
                                 chatpairs.push(childData.chatpair);
                                 console.log("currentusers  chatpairs array in child added: 2 " +  chatpairs);
                                                                   
                                                        });
    
    dataRef.ref().child('Unpairedrecord').on("child_added", function(snapshot) {
                                var childData = snapshot.val();
                              // if((childData.username>0)&&(childData.username<=maxusers))
                                 unpairedusers.push(childData.username);
                                console.log("Unpairedrecord array in child added: " + unpairedusers);
         });
        
        dataRef.ref().child('Unpairedrecord').on("child_removed", function(snapshot) {
                                var itemRemoved = snapshot.val().username;
                              // if((childData.username>0)&&(childData.username<=maxusers))
                                 var index = unpairedusers.indexOf(itemRemoved);
                                 unpairedusers.splice(index, 1);
                                 
                                console.log("unpaireduser popped " + unpairedusers);
                                 
                                                                   
                                                        });
                                // Removes values from the currentusers array;
dataRef.ref().child('users').on("child_removed", function(snapshot) {

                                 var itemRemoved = snapshot.val().userid;
                                 console.log("child_removed is : " + itemRemoved);
                                 console.log("currentusers array in child removed: " + currentusers);
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

    console.log("inside write function"); 

   dataRef.ref().child('users/'+ userId).set({  

            username: name,

            wins: wins,

            losses: losses,

            userid: userId 

                                                    });

                                                    }

function removeUserData(userid){
    
    console.log("inside removeUserData"); 
   dataRef.ref().child('users/'+ userid).remove() 
   console.log("UserData removed");
    
                        }

function writeUnpairedrecord(userId) {
    console.log(" inside writeUnpairedrecord"); 
   dataRef.ref().child('Unpairedrecord/'+userId).set({  
       
            username: userId,
          
                                                    });
                                                    }

function removeUnpairedrecord(userId) {
    console.log("inside removeUnpairedrecord"); 
   dataRef.ref().child('Unpairedrecord/'+userId).remove() 
   console.log(" removed");
    
    
   
    
  // var adaRef = firebase.database().ref('users/ada');
//adaRef.remove()    
          
          
                                                    
                                                    }
 function recordchatpairs(userid1,userid2) {
    console.log("inside recordchatpairs"); 
     //chatpairs.push(userid1);
     //chatpairs.push(userid1);
   dataRef.ref().child('chatpairs/'+userid1).set({  
       
            me:userid1,
            chatpair : userid2
          
                                                    });}
        


function removechatpairs(itemRemoved){
    console.log("itemRemoved : " + itemRemoved);
    var pair=0;
    console.log("inside removechatpairs chatpairs is " +  chatpairs);
    console.log("inside removechatpairs");
    var index=chatpairs.indexOf(itemRemoved);
     console.log("chatpairs.indexOf(itemRemoved)" + index);
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
    
    console.log("inside removechatpairs .....chatpair removed   pair is " + pair );
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
                                    console.log("id is:" + Id);
                                    function checkuserId(presentId) {
                                                            console.log("id is:" + Id+" presentId is: "+presentId);
                                                            //return Id != presentId;
                                                            if(Id==presentId)return false;
                                                            else return true;
                                                                    }
                                    
                                    console.log("currentusers in assignunique id is : " + currentusers);
                                    var result = currentusers.every(checkuserId);
                                    console.log("currentusers.every(checkuserId) = " + result);
                                    if (result == true) {
                                                console.log("new id is : " + Id);
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
                                                console.log("uh oh id is duplicated :" + userId );
                                                if (currentusers.length == maxusers) {
                                                            console.log("max no of users reached");
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
                           console.log($('#send-button').val());
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
                           
                            console.log($('#userName').val());
                            assignUniqueId($('#userName').val())   ;
                          
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
      console.log(somObj.losses);
      
    }, function(errorObject) {
      console.losomObjg("Errors handled: " + errorObject.code);
    });
*/