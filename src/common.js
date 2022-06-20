

const REGISTER = {
  INPUT_PORT: 0x00,
	OUTPUT_PORT: 0x01,
	POLARITY_INVERSION: 0x02,
	CONFIGURATION: 0x03
}

const REGISTER_DEFAULT = {
	INPUT_PORT: 0b1111_0000,
	OUTPUT_PORT: 0b1111_1111,
	POLARITY_INVERSION: 0b0000_0000,
	CONFIGURATION: 0b1111_1111
}

export class Common {
	static async getInputPort(bus) {
		return {
			0: 0,
			1: 0,
			2: 0,
			3: 0
		}
	}

	static async getOutputsPort(bus) {
		return {
			0: 0,
			1: 0,
			2: 0,
			3: 0
		}
	}

	static async setOutputPort(bus, portValues) {}

	static async getPolarityInversion(bus) {
		return {

		}
	}

	static async setPolarityInversion(bus, inverstionValues) {

	}

	static async getConfiguration(bus) {
		return {

		}
	}

	static async setConfiguration(bus, config) {

	}

}