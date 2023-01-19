let req = { query: { skill_id: ['1','2'] } }

let { skill_id, type } = req.query

let sql = 'select id, title from jobs where expire_time > CURRENT_TIMESTAMP'
let bindings = []

if (typeof skill_id === 'string') {
  sql += ' and skill_id = $' + (bindings.length + 1)
  bindings.push(skill_id)
} else if (Array.isArray(skill_id)) {
  sql += ' and (false'
  skill_id.forEach(skill => {
    sql += ' or skill_id = $' + (bindings.length + 1)
    bindings.push(skill)
  })
  sql += ')'
}

console.log({ sql, bindings })
