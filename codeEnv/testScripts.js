//for testing scripts; stuff that isn't intended to remain in the final code.



//                               _                          _ _                __ _      _     _     
//                              (_)                        | | |              / _(_)    | |   | |    
//    __ _  ___ ___ ___  ___ ___ _ _ __   __ _           __| | |__           | |_ _  ___| | __| |___ 
//   / _` |/ __/ __/ _ \/ __/ __| | '_ \ / _` |         / _` | '_ \          |  _| |/ _ \ |/ _` / __|
//  | (_| | (_| (_|  __/\__ \__ \ | | | | (_| |        | (_| | |_) |         | | | |  __/ | (_| \__ \
//   \__,_|\___\___\___||___/___/_|_| |_|\__, |         \__,_|_.__/          |_| |_|\___|_|\__,_|___/
//                                        __/ |                                                      
//                                       |___/                                 

async function setTempToData(path) //request data from database using readDB(), and set it to a data named temp
{
  await readDB(path + '/').then((response) => { //read db, when get a return parse it as 'response'
    if (response !== false) {
      temp = response;
      console.log('temp set to data');
    }
  });
}

//If i request a readDB of 'users/user0', which is parsed as 'response' I can access data like this:
// reponse.data = the data within the field named 'data'. no parsing required.

// this works in conjunction with:
// writecustompath('users/user0/', String([12,14,15]))
// this data is written: "11,14,15"