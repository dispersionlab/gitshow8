// Voltage-controlled oscillator example
// by Andrew Belt

// JavaScript isn't ideal for audio generating and processing due to it being 10-100 less efficient than C++, but it's still an easy way to learn simple DSP.

config.frameDivider = 1
config.bufferSize = 1

let tape = []

var phase = 0
var phase2 = 0
function process(block) {
	// tape.length = 44100
	// Knob ranges from -5 to 5 octaves
	var pitch = block.knobs[0] * 10 - 5
	// Input follows 1V/oct standard
	pitch += block.inputs[0][0]		
	// amp = block.inputs[1][0]
	// tape.push
	// The relationship between 1V/oct pitch and frequency is `freq = 2^pitch`.
	// Default frequency is middle C (C4) in Hz.
	// https://vcvrack.com/manual/VoltageStandards.html#pitch-and-frequencies
	var freq = 111.6256 * Math.pow(2, pitch)

	// crush = 
	block.bufferSize += Math.round(block.knobs[1] * 1024)
	
	// Set all samples in output buffer
	var deltaPhase = config.frameDivider * block.sampleTime * freq
	for (var i = 0; i < block.bufferSize; i++) {
		// Accumulate phase
		phase += deltaPhase
		// Wrap phase around range [0, 1]
		phase %= 1
		// Convert phase to sine output
		block.outputs[0][i] = Math.sin(2 * Math.PI * phase) * 5
		// tape[i] = (block.inputs[0][i])
		// block.outputs[1][i] = tape[tap1]
		display(block.bufferSize)

	}



}
