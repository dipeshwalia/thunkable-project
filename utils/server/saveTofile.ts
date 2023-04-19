const fs = require("fs")

export function saveToFile({ projects }: { projects: any }, filePath: string) {
  fs.writeFileSync(filePath, JSON.stringify(projects, null, 4))
}
