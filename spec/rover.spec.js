const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!
  it("constructor sets position and default values for mode and generatorWatts", () => {
    let position12 = new Rover(12);
    expect(position12).toEqual({ position: 12, mode: 'Normal', generatorWatts: 110 });
  });

  it("response returned by receiveMessage contains the name of the message", () => {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(2);
    let response = rover.receiveMessage(message);
    expect(response.message.name).toBe(message.name);
  });

  it("response returned by receiveMessage includes two results if two commands are sent in the message", () => {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(2);
    let response = rover.receiveMessage(message);
    expect(response.results.length).toBe(message.commands.length);
  });

  it("responds correctly to the status check command", () => {
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Statud Check', commands);
    let rover = new Rover(200);
    let response = rover.receiveMessage(message);
    expect(response.roverStatus).toStrictEqual({generatorWatts: 110, mode: 'Normal', position: 200});
  });

  it("responds correctly to the mode change command", () => {
    
  })

});
