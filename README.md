# Slack CLI sending messages by webhook

## Install

Globally:
```sh
$ npm install -g slack-send-cli
$ slack-send Test message
```

Locally:
```sh
$ npm install slack-send-cli
$ npx slack-send Test message
```

## CLI usage

```sh
slack-send '<Text message>'
```

### Configuration

* Defaults from hook settings

Environment variables:
* `SLACK_SEND_CLI_URL`
* `SLACK_SEND_CLI_CHANNEL`
* `SLACK_SEND_CLI_EMOJI`
* `SLACK_SEND_CLI_PICTURE`
* `SLACK_SEND_CLI_USERNAME`

Options:
* `-w --webhook <url>` — Slack webhook URL
* `-c --channel <name>` — Channel or user name, e.g. `some_channel`, `#channel`, `@username`
* `-e --emoji <name>` — Emoji name for userpic, e.g. `:confused:`, `:confused:`
* `-p --picture <url>` — Userpic URL
* `-n --username <username>` — Username
* `-s --status <username>` — Message status, e.g. `error`, `fail`, `success`, `warning`, `warn`, `info`, `#FF0000`


## Programmatically usage

As class:
```js
const SlackSend = require('slack-send-cli');

const slack = new SlackSend({
  webhook: 'https://hooks.slack.com/services/...'
  channel: 'general'
  emoji: 'confused'
  picture: 'https://cdn...'
  username: 'Alert Bot'
});

slack.send('Hello world!', 'success', (err) => {
  if (err) {
    console.error(err);
    return;
  }
}).then( () => {
  console.log('ok')
}, err => {
  console.error(err);
});

```

Or as function:
```js
const slack = require('slack-send-cli');

slack.send({
  webhook: 'https://hooks.slack.com/services/...'
  channel: 'general'
  emoji: 'confused'
  picture: 'https://cdn...'
  username: 'Alert Bot'
}, 'Hello world!', 'success', (err) => {
  if (err) {
    console.error(err);
    return;
  }
}).then( () => {
  console.log('ok')
}, err => {
  console.error(err);
});
```

### Class
* `constructor(params)`
  * `[Object]` params
    * `[String]` webhook
    * `[String]` channel
    * `[String]` emoji
    * `[String]` picture
    * `[String]` username

  * *returns* `[class SlackSend]`

* `send(message, [status], [callback])`
  * `[String]` message
  * `[String]` status *(optional)*
  * `[Function]` status *(optional)*
  * *returns* `Promise`

### Function
* `send(params, message, [status], [callback])`
  * `[Object]` params
    * `[String]` webhook
    * `[String]` channel
    * `[String]` emoji
    * `[String]` picture
    * `[String]` username
  * `[String]` message
  * `[String]` status *(optional)*
  * `[Function]` status *(optional)*
  * *returns* `Promise`
