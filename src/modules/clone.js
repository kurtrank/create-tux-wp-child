/**
 * Internal Dependencies
 */
const { url } = require("../data");
const run = require("./run");
const color = require("./color");

/**
 * External Dependencies
 */
const { rmSync } = require("fs");

function clone(dest, branch = false) {
	const cmd = run("git", [
		"clone",
		"--verbose",
		"--depth=1",
		"--no-single-branch",
		url,
		dest,
	]);

	if (cmd.status == 0) {
		if (branch) {
			const checkout = run("git", ["checkout", branch], `./${dest}`);
			if (checkout.status != 0) {
				console.log(
					color(
						`\nLooks like the \`${branch}\` branch could not be checked out, using the default branch instead...`,
						"yellow"
					)
				);
			}
		}

		// Delete .git folder
		rmSync(`${dest}/.git`, { recursive: true, force: true });
		return true;
	} else {
		return false;
	}
}

module.exports = clone;
