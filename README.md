# pca9536

[![npm Version](http://img.shields.io/npm/v/@johntalton/pca9536.svg)](https://www.npmjs.com/package/@johntalton/pca9536)
![GitHub package.json version](https://img.shields.io/github/package-json/v/johntalton/pca9536)
![CI](https://github.com/johntalton/pca9536/workflows/CI/badge.svg)
![GitHub](https://img.shields.io/github/license/johntalton/pca9536)
[![Downloads Per Month](http://img.shields.io/npm/dm/@johntalton/pca9536.svg)](https://www.npmjs.com/package/@johntalton/pca9536)
![GitHub last commit](https://img.shields.io/github/last-commit/johntalton/pca9536)

Single Port I²C GPIO Expander with four pins.


# Usage / Example

Setting the profile for any pin must set the entire Port (4 pins).

It is common to read the settings and write them back modified, however, care must be taken with the approach when other actions can exist on the bus.

```javascript
import { PCA9536, DIRECTION, SET, CLEAR } from '@johntalton/pca9536'

const bus = /* ... */
const device = PCA9536.from(bus)

await device.setConfiguration({
  gpio0: DIRECTION.OUTPUT,
  gpio1: DIRECTION.INPUT,
  gpio2: DIRECTION.INPUT,
  gpio3: DIRECTION.OUTPUT,
})

/*
set state of outputs the output gpios 0 and 3 (on and off respectively)
gpio 1 and 2 will float-high if not connected, set to "don't care"
*/
await device.setOutputPort({
  gpio0: SET,
  gpio1: CLEAR, // aka DONT_CARE
  gpio2: CLEAR, // aka DONT_CARE
  gpio3: CLEAR
})

const { gpio1, gpio2 } = await device.getInputPort()


```

Note that input polarity only effect when reading from the input port.

Users should take care when changing output port value or direction when connected to external IO.  The write of direction, polarity and value are all done as separate interactions.


## SparkX Quiic Power Switch

The [Sparkfun Power Switch](https://www.sparkfun.com/products/16740) uses the PCA9536 as its main component.  While GPIO1 and GPIO2 are free (and exposed on board), GPIO0 and GPIO3 are used for Main Power and I²C Isolation respectively.


