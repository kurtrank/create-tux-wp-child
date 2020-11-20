#!/usr/bin/env node
const { prefix } = require("./data");
const clone = require("./modules/clone");
const install = require("./modules/install");
const color = require("./modules/color");

// Get argument for name
let name = process.argv[2];
const branchArg = process.argv[3] ? process.argv[3].split("=") : false;
const branch =
	branchArg && "branch" === branchArg[0] && branchArg[1] ? branchArg[1] : false;

if (name) {
	// Has name, start cloning
	name = prefix + name;
	console.log(color(`\nGenerating ${name} WordPress theme\n`));
	start();
} else {
	console.warn(
		color(
			"\nPlease provide a name as the first argument to this command.",
			"yellow"
		)
	);
}

function start() {
	if (clone(name, branch)) {
		// Clone sucess, run setup
		console.log(color("\nRepo cloned successfully, beginning setup...\n"));
		install(name);
	} else {
		// Clone fail, log error message
		console.error(
			"\nClone failed, make sure you have access to thelearninghouse/tux-wp-child"
		);
	}
}
