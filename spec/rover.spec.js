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
    let rover = new Rover(40);
    let response = rover.receiveMessage(message);
    expect(response.message).toBe(message.name);
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
    expect(response.results[0].roverStatus).toStrictEqual({generatorWatts: 110, mode: 'Normal', position: 200});
  });

  it("responds correctly to the mode change command", () => {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message('Test message with mode change command', commands);
    let rover = new Rover(10);
    let response = rover.receiveMessage(message);
    expect(response.results[0].completed).toBe(true);
    expect(rover.mode).toBe('LOW_POWER');
  });

  it("responds with a false completed value when attempting to move in LOW_POWER mode", () => {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 500)];
    let message = new Message('Low power mode then move', commands);
    let rover = new Rover(0);
    let response = rover.receiveMessage(message);
    expect(response.results[1].completed).toBe(false);
  })

  it("responds with the position for the move command", () => {
    let commands = [new Command('MOVE', 300)];
    let message = new Message('MOVE', commands);
    let rover = new Rover(0);
    let response = rover.receiveMessage(message);
    expect(response.results[0].completed).toBe(true);
    expect(rover.position).toBe(300);
  })

});
