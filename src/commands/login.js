const Command = require('../base')
const renderShortDesc = require('../utils/renderShortDescription')
const chalk = require('chalk')

class LoginCommand extends Command {
  async run() {
    const { globalConfig } = this.netlify
    const current = globalConfig.get('userId')
    const accessToken = globalConfig.get(`users.${current}.auth.token`)

    if (accessToken) {
      this.log('Already logged in!')
      this.log()
      this.log(`Run ${chalk.cyanBright('netlify status')} for account details`)
      this.log()
      this.log(`To see all available commands run: ${chalk.cyanBright('netlify help')}`)
      this.log()
      return this.exit()
    }

    await this.authenticate()

    return this.exit()
  }
}

LoginCommand.description = `${renderShortDesc('Login to your Netlify account')}

Opens a web browser to acquire an OAuth token.`

module.exports = LoginCommand
