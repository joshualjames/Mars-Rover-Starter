class Rover {
   constructor(position) {
      this.position = position;
      this.mode = "Normal";
      this.generatorWatts = 110;
   }
   receiveMessage(message) {
      let response = {
         message: message,
         results: message.commands
      }
      response['completed'] = true;
      for (let i = 0; i < message.commands.length; i++){
         if (message.commands[i].commandType === 'STATUS_CHECK') {
            response['roverStatus'] = {
               mode: this.mode,
               generatorWatts: this.generatorWatts,
               position: this.position
            }
         }
      };
      return response;
  
   }
};

module.exports = Rover;