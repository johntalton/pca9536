

export const REGISTER = {
  INPUT_PORT: 0x00,
	OUTPUT_PORT: 0x01,
	POLARITY_INVERSION: 0x02,
	CONFIGURATION: 0x03
}

export const REGISTER_DEFAULT = {
	INPUT_PORT: 0b1111_0000,
	OUTPUT_PORT: 0b1111_1111,
	POLARITY_INVERSION: 0b0000_0000,
	CONFIGURATION: 0b1111_1111
}

export const SET = 1
export const CLEAR = 0

export const DIRECTION = {
	INPUT: SET,
	OUTPUT: CLEAR
}

export const POLARITY = {
	RETAINED: CLEAR,
	INVERTED: SET
}

function parseRegister(valueByte) {
	const LOWER_FOUR_MASK = 0b0000_1111

	const valueBits = valueByte & LOWER_FOUR_MASK

	const gpio0 = ((valueBits & 0b0001) === 0b0001) ? SET : CLEAR
	const gpio1 = ((valueBits & 0b0010) === 0b0010) ? SET : CLEAR
	const gpio2 = ((valueBits & 0b0100) === 0b0100) ? SET : CLEAR
	const gpio3 = ((valueBits & 0b1000) === 0b1000) ? SET : CLEAR

	return {
		gpio0,
		gpio1,
		gpio2,
		gpio3
	}
}

async function getRegister(bus, register) {
	const ab = await bus.readI2cBlock(register, 1)

	const dv = new DataView(ab)
	const valueByte = dv.getUint8(0)

	return parseRegister(valueByte)
}

async function setRegister(bus, register, values) {

	// const byteValue = values.gpio0 | values.gpio1 << 1 | values.gpio2 << 2 ...
	const byteValue = (values.gpio0 === SET ? 0b0001 : 0)
		| (values.gpio1 === SET ? 0b0010 : 0)
		| (values.gpio2 === SET ? 0b0100 : 0)
		| (values.gpio3 === SET ? 0b1000 : 0)

	const u8 = Uint8Array.from([ byteValue ])
	return bus.writeI2cBlock(register, u8)
}


export class Common {
	static async getInputPort(bus) {
		return getRegister(bus, REGISTER.INPUT_PORT)
	}

	static async getOutputPort(bus) {
		return getRegister(bus, REGISTER.OUTPUT_PORT)
	}

	static async setOutputPort(bus, portValues) {
		return setRegister(bus, REGISTER.OUTPUT_PORT, portValues)
	}

	static async getPolarityInversion(bus) {
		return getRegister(bus, REGISTER.POLARITY_INVERSION)
	}

	static async setPolarityInversion(bus, inversionValues) {
		return setRegister(bus, REGISTER.POLARITY_INVERSION, inversionValues)
	}

	static async getConfiguration(bus) {
		return getRegister(bus, REGISTER.CONFIGURATION)
	}

	static async setConfiguration(bus, configValues) {
		return setRegister(bus, REGISTER.CONFIGURATION, configValues)
	}
}