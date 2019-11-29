const fs = require("fs")

function clean(str) {
  str = str.replace(/\(|\)/g, "")
  let arr = []
  str.split("\n").forEach(one => {
    // @todo
    arr.push(one.split(", "))
  })

  // fs.writeFileSync("./out.json", JSON.stringify(arr))
}

let s = fs.readFileSync("./base.data.js", "utf-8")
clean(s)
