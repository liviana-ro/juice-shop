/*
 * Demo route pentru Snyk PR Check — SQL Injection intenționat (CWE-89)
 */

const models = require('../models/index')

module.exports = function userLookupDemo () {
  return (req, res, next) => {
    const username = req.query.username || ''

    // Input-ul din query string ajunge direct în interogare, fără parametrizare
    models.sequelize.query(`SELECT id, username, email FROM Users WHERE username = '${username}'`)
      .then(([users]) => {
        res.json({ status: 'success', data: users })
      })
      .catch(error => {
        next(error)
      })
  }
}
