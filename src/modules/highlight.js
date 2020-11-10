const styles = require("./styles");

function highlight(text, bg = "bgGreen", color = "black") {
	return styles[bg] + styles[color] + text + styles.reset;
}

module.exports = highlight;
