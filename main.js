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
 writeUserData('1', 'name1', '', '');
 writeUserData('2', 'name2', '', '');
 writeUserData('3', 'name3', '', '');
 writeUserData('4', 'name4', '', '');

var maxusers = 10;
var currentusers =[];
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
                                // Removes values from the currentusers array;
dataRef.ref().child('users').on("child_removed", function(snapshot) {

                                 var itemRemoved = snapshot.val().userid;
                                 console.log("child_removed is : " + itemRemoved);
                                 console.log("currentusers array in child removed: " + currentusers);
                                 var index = currentusers.indexOf(itemRemoved);
                                 array.splice(index, 1);
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
                                                writeUserData (Id, username, '', '');
                                                IsValid = true;
                                                        }
                                    else {
                                                console.log("uh oh id is duplicated :" + Id);
                                                if (currentusers.length == maxusers) {
                                                            console.log("max no of users reached");
                                                            IsValid = true;
                                                                                }
                                         }


                                                    }

                        }
//Assign New Id
function getAndPushUniqueId(username) {

                            var currentusers = getcurrentUsers();

                                     }

$("#submit-username").on("click", function(event) {

                            event.preventDefault();
                            console.log($('#userName').val());
                            assignUniqueId($('#userName').val())
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