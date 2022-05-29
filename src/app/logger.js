function userInputLog(idLog,taskLog, detailLog, objectLog) {
  console.log(`task ID: ${idLog}`)
  console.log(`task name: ${taskLog}`)
  console.log(`task detail: ${detailLog}`)
  console.log(`task object: ${objectLog}`)
}

export {userInputLog as inputLog}