const run = require("./run");
const replace = require("replace-in-file");
const process = require("process");
const color = require("./color");
const highlight = require("./highlight");
const { githubBase, githubUser } = require("../data");
const { rmdirSync, unlinkSync, writeFileSync, readFile } = require("fs");

function install(dest) {
	const themeDir = `${process.cwd()}/${dest}`;
	const packageFile = `${themeDir}/package.json`;
	const package = require(packageFile);
	const themeName = dest.toUpperCase().replace(/-/g, " ");
	const repoUrl = githubBase + dest;

	process.stdout.write("Updating file contents...");
	// clear changelog
	writeFileSync(`${dest}/CHANGELOG.md`, "", (err) => {
		if (err) throw err;
	});
	// delete package-lock
	unlinkSync(`${dest}/package-lock.json`, (err) => {
		if (err) throw err;
	});

	// update package.json
	package.version = "1.0.0";
	package.name = dest;
	package.description = `${themeName} child theme`;
	package.repository.url = repoUrl;

	writeFileSync(packageFile, JSON.stringify(package, null, 2), (err) => {
		if (err) return console.log(err);
	});

	// update tux-wp-child to match new repo in build files
	try {
		const results = replace.sync({
			files: [`${themeDir}/.*`, `${themeDir}/*`],
			from: [/tux-wp-child/g, "TUX WP Child", "# TUX Child Theme Starter"],
			to: [dest, themeName, `# ${themeName} Child Theme`],
		});
		// console.log("Replacement results:", results);
	} catch (error) {
		console.error("Replacement error occurred:", error);
	}

	// replace version number in theme CSS
	try {
		const results = replace.sync({
			files: `${themeDir}/style.css`,
			from: /Version: (.*)/g,
			to: "Version: 1.0.0",
		});
	} catch (error) {
		console.error("Replacement error occurred:", error);
	}
	process.stdout.write("done\n");

	run(`git`, ["init"], dest);
	run(`git`, ["add", "."], dest);
	run(`git`, ["commit", "-m", "Init"], dest);
	run(
		`git`,
		["remote", "add", "origin", `git@github.com:${githubUser}/${dest}.git`],
		dest
	);
	run(`git`, ["branch", "-M", "master"], dest);

	console.log(
		highlight(`\nNew theme initialized and connected to ${repoUrl}\n`)
	);

	console.log(color(`Installing dependencies...\n`));
	run(`npm`, ["install"], dest);

	console.log(
		highlight("\nDependencies installed. Theme is ready for development!")
	);
	console.log(
		"\nMove into the new theme folder and run `" +
			color("npm run dev", "cyan") +
			"` to start"
	);
}

module.exports = install;
