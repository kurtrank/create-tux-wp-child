const styles = require("./styles");

function color(text, color = "blue") {
	return styles[color] + text + styles.reset;
}

module.exports = color;
