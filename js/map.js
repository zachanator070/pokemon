var world = {
  "0,2":{
    name: 'tree'
  },
  "0,3":{
    name: 'tree'
  },
  "0,4":{
    name: 'tree'
  },
  "0,6":{
    name: 'tree'
  },
  "0,7":{
    name: 'tree'
  },
  "0,8":{
    name:'tree'
  },
  "1,8":{
    name:'water'
  },
  "2,8":{
    name:'water'
  },
  "3,8":{
    name:'water'
  },
  "4,8":{
    name:'water'
  },
  "5,8":{
    name:'water'
  },
  "6,8":{
    name:'water'
  },
  "7,8":{
    name:'water'
  },
  "8,9":{
    name:'tree'
  },
  "1,1":{
    name:'dirt'
  },
  "2,1":{
    name:'dirt'
  },
  "3,1":{
    name:'dirt'
  },
  "4,1":{
    name:'dirt'
  },
  "5,1":{
    name:'dirt'
  },
  "6,1":{
    name:'dirt'
  },
  "7,1":{
    name:'dirt'
  },
  "8,0":{
    name:'tree'
  },
  "1,5":{
    name:'tree'
  },
  "2,5":{
    name:'tree'
  },
  "3,5":{
    name:'water'
  },
  "4,5":{
    name:'water'
  },
  "5,5":{
    name:'water'
  },
  "5,4":{
    name:'water'
  },
  "5,6":{
    name:'water'
  },
  "9,1":{
    name: 'tree'
  },
  "9,2":{
    name: 'tree'
  },
  "9,3":{
    name: 'tree'
  },
  "9,4":{
    name: 'tree'
  },
  "9,5":{
    name: 'tree'
  },
  "9,6":{
    name:'tree'
  },
  "9,7":{
    name: 'tree'
  },
  "9,8":{
    name:'tree'
  },
  "8,1":{
    name: 'grass'
  },
  "8,2":{
    name: 'grass'
  },
  "8,3":{
    name: 'grass'
  },
  "8,4":{
    name: 'grass'
  },
  "8,5":{
    name: 'grass'
  },
  "8,6":{
    name:'grass'
  },
  "8,7":{
    name: 'grass'
  },
  "8,8":{
    name:'grass'
  },
  "6,4":{
    name: 'grass'
  },
  "6,5":{
    name:'grass'
  },
  "6,6":{
    name: 'grass'
  },
  "6,7":{
    name:'grass'
  },
  "7,4":{
    name: 'grass'
  },
  "7,5":{
    name:'grass'
  },
  "7,6":{
    name: 'grass'
  },
  "7,7":{
    name:'grass'
  },
  "5,7":{
    name:"wall"
  },
  "2,6":{
    name: 'character',
    image: 'images/oak.png',
    use: function(){
      var chat = ['Why you must want to battle some pokemon yes?','Here have one of mine!'];
      switchToChatControls(chat,switchToPickerControls);
      delete world['5,7'];
      this.use = function(){
        var chat = ['Try walking around in the tall grass'];
        switchToChatControls(chat,switchToWorldControls);
      };
    }
  }
};
