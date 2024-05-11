import { Common } from './common.js'
export * from './common.js'

export class PCA9536 {
	#bus

	static from(bus, options) { return Promise.resolve(new PCA9536(bus, options)) }

	constructor(bus, options) { this.#bus = bus }

	async getInputPort() { return Common.getInputPort(this.#bus) }

	async getOutputPort() { return Common.getOutputPort(this.#bus) }

	async setOutputPort(values) { return Common.setOutputPort(this.#bus, values) }

	async getPolarityInversion() { return Common.getPolarityInversion(this.#bus) }

	async setPolarityInversion(values) { return Common.setPolarityInversion(this.#bus, values) }

	async getConfiguration() { return Common.getConfiguration(this.#bus) }

	async setConfiguration(values) { return Common.setConfiguration(this.#bus, values) }

}