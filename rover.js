class Rover {
   constructor(position) {
      this.position = position;
      this.mode = "Normal";
      this.generatorWatts = 110;
   }
   receiveMessage(message) {
      let response = {
         message: message.name,
         results: message.commands
      }
      for (let i = 0; i < message.commands.length; i++){
         if (message.commands[i].commandType === 'STATUS_CHECK') {
            response.results[i].roverStatus = {
               mode: this.mode,
               generatorWatts: this.generatorWatts,
               position: this.position
            }
            response.results[i].completed = true ;
         } else if (message.commands[i].commandType === 'MODE_CHANGE') {
            this.mode = message.commands[i].value;
            response.results[i].completed = true;
         } else if (message.commands[i].commandType === 'MOVE' && this.mode === 'LOW_POWER') {
            response.results[i].completed = false;
         } else if (message.commands[i].commandType === 'MOVE') {
            this.position = message.commands[i].value;
            response.results[i].completed = true;
         }
      }
      console.log(response)
      return response;
   }
};

module.exports = Rover;