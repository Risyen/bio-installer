const fs = require('fs-extra')
const path = require('path')
const gitClone = require('git-clone')
const promptSync = require('prompt-sync')
const printf = require('../utils/printf')

const spinner = require('../utils/loading')

const igonreList = ['.git']

const getProject = async (required = false) => {
  const prompt = promptSync()
  const answer = printf.prompText(
    `>You need to name the project${required ? '(required)' : ''}:''<`
  )
  let project = prompt(answer)
  if (project === null) throw new Error('Error. Nothing has changed.')
  if (!project) project = getProject(true)
  return project
}

const installer = (projectPath) =>
  new Promise((resolve, reject) => {
    spinner.start('template installing...')
    gitClone(
      'https://github.com/Risyen/Mia.bio',
      projectPath,
      {
        shallow: true,
      },
      (err) => {
        if (err) return reject(new Error(`Error. ${err}`))
        spinner.succeed(true)
        spinner.start('installation is Complete, Enjoy it')
        spinner.succeed()
        resolve()
      }
    )
  })

const done = async (projectPath, projectName) => {
  await Promise.all(
    igonreList.map(async (name) => {
      const ignoreFile = path.join(projectPath, name)
      await fs.remove(ignoreFile)
    })
  )
  const pkgPath = path.join(projectPath, 'package.json')
  if (!fs.existsSync(pkgPath)) return
  let pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
  pkg = Object.assign(pkg, {
    name: projectName,
    version: '1.0.0',
  })
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2))
}

const entrance = (async () => {
  const project = await getProject()
  const projectPath = path.join(process.cwd(), project)
  if (fs.existsSync(projectPath)) {
    throw Error(`Error, "${project}" already exists. Nothing has changed.`)
  }
  const projectName = project
  await installer(projectPath)
  await done(projectPath, projectName)
})()

module.exports = entrance
