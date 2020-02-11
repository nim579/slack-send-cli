const comm = require('commander');
const app = require('./index');
const pkg = require('../package.json');


comm
  .version(pkg.version, '-v, --version', 'Output the current version')
  .name('slack-send')
  .usage('[options] <message>')
  .option('-w, --webhook <url>',       'Slack webhook URL',      process.env['SLACK_SEND_CLI_URL'])
  .option('-c, --channel <name>',      'Channel or user name',   process.env['SLACK_SEND_CLI_CHANNEL'])
  .option('-e, --emoji <name>',        'Emoji name for userpic', process.env['SLACK_SEND_CLI_EMOJI'])
  .option('-p, --picture <url>',       'Userpic URL',            process.env['SLACK_SEND_CLI_PICTURE'])
  .option('-n, --username <username>', 'Username',               process.env['SLACK_SEND_CLI_USERNAME'])
  .option('-s, --status <username>',   'Message status');

comm.parse(process.argv);

const params = {
  webhook:  comm.webhook,
  channel:  comm.channel,
  emoji:    comm.emoji,
  picture:  comm.picture,
  username: comm.username,
};

const message = comm.args.join(' ').trim().replace(/\\n/g, '\n');

app.send(params, message, comm.status).then( ()=> {
  console.log('Success sent');
}, error => {
  console.error(error.message);
});
