/**
 * utils func
 * author:Xerxes Break
 */

const chalk = require('chalk')

const logColor = (text) => chalk.hex('#bdbdbd')(text)

const cyanColor = (text) => chalk.cyan(text)

const dangerColor = (text) => chalk.hex('#e5156a')(text)

const prompText = (text) => {
  text = text.replace('project name', chalk.bold('project name'))
  return logColor(text)
}

const welcome = () => {
  const name = chalk.hex('#FEFEFE').bold('blog')
  const text = chalk.hex('#32CD32')(`  Welcome to ${name} installer`)
  console.log(text)
}

module.exports = {
  logColor,
  cyanColor,
  dangerColor,
  prompText,
  welcome,
}
