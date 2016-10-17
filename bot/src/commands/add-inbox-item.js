import { get, post } from '../utils';

const CONFIRMATION_MESSAGES = [
  'naturally',
  'of course',
  'splendid',
  'jolly good',
  'noted',
  'point taken',
  'at your service',
  'sounds good'
];

const ERROR_MESSAGES = [
  'uh-oh, that didn\'t work out',
  'something went wrong'
];

function randElem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export const AddInboxItem = {
  name: 'add-inbox-item',

  matches(str) {
    return true;
  },

  execute(bot, author, channel, text) {
    const update = {
      author,
      channel,
      status: 'inbox',
      resolved: false,
      text
    };
    return post(`${bot.api_url}/updates`, update, 'json').then(resp => {
      bot.logAction(author, channel, {
        command: AddInboxItem.name,
        id: resp._id,
      });
    }).then(
      () => randElem(CONFIRMATION_MESSAGES),
      () => randElem(ERROR_MESSAGES)
    );
  },

  test(bot, author, channel, text) {
    return `The command will insert a new inbox item for author "${author}" with message "${text}"`;
  },

  revert(bot, id) {
    return post(`${bot.api_url}/updates/delete/${id}`);
  }
};
