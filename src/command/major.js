const fs = require('fs-extra')
const path = require('path')
const gitClone = require('git-clone')
const promptSync = require('prompt-sync')
const printf = require('../utils/printf')

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
    gitClone(
      'https://github.com/Risyen/Mia.bio',
      projectPath,
      {
        shallow: true,
      },
      (err) => {
        if (err) return reject(new Error(`Error. ${err}`))
        console.log('')
        resolve()
      }
    )
  })

const done = async (projectPath, projectName) => {
  const pkgPath = path.join(projectPath, 'package.json')
  if (!fs.existsSync(pkgPath)) return
  let pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
  pkg = Object.assign(pkg, {
    name: projectName,
    version: '1.0.0',
  })
  delete pkg.author
}

;(async () => {
  const project = await getProject()
  const projectPath = path.join(process.cwd(), project)
  if (fs.existsSync(projectPath)) {
    throw Error(`Error, "${project}" already exists. Nothing has changed.`)
  }
  const projectName = project
  await installer(projectPath)
})()
