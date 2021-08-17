
//const { parse } = require("../../../dist/build.js")
// const { parse } = require("../index")
import { parse } from "../index"
//@ts-ignore
global.console = {
    log: jest.fn(),
    debug: console.debug,
    trace: console.trace,
    // map other methods that you want to use like console.table
}
test('2+2=4', () => {
    expect(parse("2+2")?.evaluate()).toBe(4);
});
test('17+32=49', () => {
    expect(parse("17+32")?.evaluate()).toBe(49);
});
test('15-8=7', () => {
    expect(parse("15-8")?.evaluate()).toBe(7);
});