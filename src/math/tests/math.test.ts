
//const { parse } = require("../../../dist/build.js")
// const { parse } = require("../index")
import { parse } from "../index"
import { constant, reduce } from "../utils";
//@ts-ignore
global.console = {
    log: jest.fn(),
    debug: console.debug,
    trace: console.trace,
    // map other methods that you want to use like console.table
}
test('reduce test', () => {
    expect(reduce(10, 5)).toStrictEqual([2, 1]);
    expect(reduce(72, 12)).toStrictEqual([6, 1]);
    expect(reduce(16, 12)).toStrictEqual([4, 3]);
    expect(reduce(57, 13)).toStrictEqual([57, 13]);
});
test('2+2=4', constant(
    expect(parse("2+2").force("2+2").evaluate().toString()).toBe("4")
));
test('17+32=49', constant(
    expect(parse("17+32").force("17+32").evaluate().toString()).toBe("49")
));
test('15-8=7', constant(
    expect(parse("15-8").force("15-8").evaluate().toString()).toBe("7")
));
test('10x+15x=25x', constant(
    expect(parse("10x+15x").force("10x+15x").evaluate().toString()).toBe("25x")
));
test('2x+2=2x+2', constant(
    expect(parse("2x+2")?.force("2x+2").evaluate().toString()).toBe("2x+2")
));
test('2x+2+3x+7=5x+9', constant(
    expect(parse("2x+2+3x+7")?.force("2x+2+3x+7").evaluate().toString()).toBe("5x+9")
));
test('2/4 = 1/2', constant(
    expect(parse("2/4")?.force("2/4 failed to parse").simplify().toString()).toBe("1/2")
));
test('72/12 = 6', constant(
    expect(parse("72/12")?.force("72/12").simplify().toString()).toBe("6")
));
test('2*(2+3) = 10', constant(
    expect(parse("2*(2+3)")?.force("2*(2+3)").simplify().toString()).toBe("10")
));
