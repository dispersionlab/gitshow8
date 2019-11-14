// Voltage-controlled oscillator example
// by Andrew Belt

// JavaScript isn't ideal for audio generating and processing due to it being 10-100 less efficient than C++, but it's still an easy way to learn simple DSP.

config.frameDivider = 1
config.bufferSize = 1


var phase = 0
function process(block) {
	
	// Knob ranges from -5 to 5 octaves
	var pitch = block.knobs[0] * 10 - 5
	// Input follows 1V/oct standard
	pitch += block.inputs[0][0]		
	// amp = block.inputs[1][0]
	// tape.push
	// The relationship between 1V/oct pitch and frequency is `freq = 2^pitch`.

	// https://vcvrack.com/manual/VoltageStandards.html#pitch-and-frequencies
	var freq = 111.6256
	freq += freq * Math.pow(2, pitch)
	bufSizeKnob = Math.round(block.knobs[1] * 120)
	block.bufferSize += bufSizeKnob
	
	frameDivKnob = Math.round(block.knobs[2] * 32)
	frameDivider = config.frameDivider + frameDivKnob

	if (block.inputs[1][0] === 0){

	} else {
		block.bufferSize = block.inputs[1][0] + bufSizeKnob
	}
	
	if (block.inputs[2][0] === 0){

	} else {
		frameDivider = frameDivider + Math.round(block.inputs[2][0] * 4)
	}

	block.sampleTime += block.knobs[3] * 10

	if (block.inputs[3][0] !== 0){
		block.sampleTime = block.sampleTime + (block.inputs[3][0] / 22050)

		if (block.inputs[4][0] !== 0){
			block.sampleTime += block.inputs[4][0] / 100
		}
	}

	display(freq + ' ' + pitch)


	// Set all samples in output buffer
	var deltaPhase = frameDivider * block.sampleTime * freq
	for (var i = 0; i < block.bufferSize; i++) {
		// Accumulate phase
		phase += deltaPhase
		// Wrap phase around range [0, 1]
		phase %= 1
		// Convert phase to sine output
		block.outputs[0][i] = Math.sin(2 * Math.PI * phase) * 5
		// tape[i] = (block.inputs[0][i])
		// block.outputs[1][i] = tape[tap1]

	}



}
