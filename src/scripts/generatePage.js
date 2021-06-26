const chalk = require("chalk");
const path = require("path");
const fs = require("fs");
const resolve = (...file) =>path.resolve(__dirname, ...file);
const log = msg => console.log(chalk.green(msg));
const successLog = msg => console.log(chalk.blue(msg));
const errorLog = err => console.log(chalk.red(err));
const template = require("./template")

const generateFile = (path, data) => {
  console.log("genarateFile", path, data)
  if (fs.existsSync(path)) {
    errorLog(`${path}文件已经存在`)
    return false
  }

  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, "utf8", err => {
      if (err) {
        errorLog(err.message)
        reject(err)
      } else {
        resolve(true)
      }
    })
  })
}

const type = process.argv[2].split("=")[1]

if (type === "page") {
  log("请输入要生成的页面路径，会生成在src/目录下")
} else if (type === "component") {
  log("请输入要生成的组件路径，会生成在src/目录下")
} else {
  log("请输入要生成的页面或组件路径，会生成在src/目录下")
}

// /*
let pageName = ""

process.stdin.on("data", async chunk => {
  const inputName = String(chunk).trim().toString()
  let pageFullPathName = resolve("../../src/", inputName)
  const pageFullDirectory = path.dirname(pageFullPathName)
  const hasComponentExists = fs.existsSync(pageFullPathName)

  if (hasComponentExists) {
    errorLog(`${inputName}页面已存在，请重新输入`)
    return false
  } else {
    log(`正在生成页面目录${pageFullDirectory}`)
    await doExistDirectoryCreate(pageFullDirectory)
  }

  try {
    if (inputName.includes("/")) {
      const inputArr = inputName.split("/")
      pageName = inputArr[inputArr.length - 1]
    } else {
      pageName = inputName
    }
    log(`正在生成文件${pageName}`)
    if(type === "component") {
      await generateFile(`${pageFullPathName}.json`, template.componentJsonTemplate())
      await generateFile(`${pageFullPathName}.scss`, template.componentScssTemplate(pageName))
      await generateFile(`${pageFullPathName}.wxml`, template.componentWxmlTemplate(pageName))
      await generateFile(`${pageFullPathName}.ts`, template.pageTsTemplate(pageName))
    } else {
      await generateFile(`${pageFullPathName}.json`, template.pageJsonTemplate(pageName))
      await generateFile(`${pageFullPathName}.scss`, template.pageScssTemplate(pageName))
      await generateFile(`${pageFullPathName}.wxml`, template.pageWxmlTemplate(pageName))
      await generateFile(`${pageFullPathName}.ts`, template.pageTsTemplate(pageName))
    }
    successLog("生成成功")
  } catch (e) {
    errorLog(e.message)
  }

  process.stdin.emit("end")
})
// */


process.stdin.on("end", () => {
  log("exit")
  process.exit()
})

function doExistDirectoryCreate (directory) {
  return new Promise(resolve => {
    mkdirs(directory, () => {
      resolve(true)
    })
  })
}

function mkdirs (directory, callback) {
  var exists = fs.existsSync(directory)
  if (exists) {
    callback()
  } else {
    mkdirs(path.dirname(directory), () => {
      fs.mkdirSync(directory)
      callback()
    })
  }
}
