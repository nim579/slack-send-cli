const got = require('got');

class SlackSend {
  constructor(params = {}) {
    if (!params.webhook) throw new Error('Webhook URL not defined');
    this.params = params;
  }

  send(message, status, callback) {
    if (typeof status === 'function') {
      callback = status;
    }

    if (!message || typeof message !== 'string') {
      const error = new Error('Invalid message string');
      if (typeof callback === 'function') callback(error);
      return Promise.reject(error);
    }

    const data = {};
    if (this.params.channel)  data.channel    = this.params.channel;
    if (this.params.emoji)    data.icon_emoji = this.params.emoji;
    if (this.params.picture)  data.icon_url   = this.params.picture;
    if (this.params.username) data.username   = this.params.username;

    if (status) {
      let color = null;

      switch (status) {
        case 'success':
        case 'ok':
          color = 'good';
          break;
        case 'info':
          color = '#439FE0';
          break;
        case 'warning':
        case 'warn':
          color = 'warning';
          break;
        case 'error':
        case 'danger':
        case 'fail':
          color = 'danger';
          break;
        default:
          color = status;
      }

      data.fallback = message;
      data.attachments = [
        {
          color: color,
          text: message,
          fallback: message,
          mrkdwn_in: ["text"]
        }
      ];
    } else {
      data.text = message;
      data.fallback = message;
    }

    return got.post(this.params.webhook, {json: data})
      .then( () => {
        if (typeof callback === 'function') callback(null, true);
        return true;
      }, (error) => {
        if (typeof callback === 'function') callback(error);
        throw error;
      });
  }

  static send(params, message, status, callback) {
    if (typeof status === 'function') {
      callback = status;
    }

    try {
      const slack = new SlackSend(params);
      return slack.send(message, status, callback);
    } catch (err) {
      if (typeof callback === 'function') callback(err);
      return Promise.reject(err);
    }
  }
};

module.exports = SlackSend;
