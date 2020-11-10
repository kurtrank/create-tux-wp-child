const { spawnSync } = require("child_process");

function run(cmd, args, dir = "./") {
	return spawnSync(cmd, args, { cwd: dir, stdio: "inherit" });
}

module.exports = run;
