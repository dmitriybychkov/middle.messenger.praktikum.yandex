
import { User, Chat, Message } from './interfacesAPI';

const BASE_URL = 'https://ya-praktikum.tech/api/v2';


const createURL = (resource: string | null) => {
  if (!resource) {
    return null;
  }

  return `${BASE_URL}/resources${resource}`;
};

function formatDate(dateUnhandled: string | null): string | null {
  if (!dateUnhandled) {
    return null;
  }
  const date = new Date(dateUnhandled);
  const nowDate = new Date();
  const allMonths = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
  const currentMonth = allMonths[date.getMonth()];
  const day = date.getDate();
  const hours = date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`;
  const minutes = date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`;
  const delay = nowDate.getDate() - day;

  let resultDate = `${day}${currentMonth}`;

  if (delay < 1) {
    resultDate = `${hours}:${minutes}`;
  }

  if (delay === 1) {
    resultDate = 'Вчера';
  }

  return resultDate;
}

export const transformUserFromApi = (data: User): User => ({
  id: data.id,
  login: data.login,
  first_name: data.first_name,
  second_name: data.second_name,
  display_name: data.display_name,
  avatar: createURL(data.avatar),
  phone: data.phone,
  email: data.email,
});

export const transformChatsFromApi = (data: Chat[]): Chat[] => data?.map((chat : Chat) => ({
  avatar: createURL(chat.avatar),
  id: chat.id,
  title: chat.title,
  created_by: chat.created_by,
  unread_count: chat.unread_count,
  last_message: {
    content: chat.last_message?.content,
    time: formatDate(chat.last_message?.time) as string,
    user: {
      id: chat.last_message?.user.id,
      login: chat.last_message?.user.login,
      first_name: chat.last_message?.user.first_name,
      second_name: chat.last_message?.user.second_name,
      display_name: chat.last_message?.user.display_name,
      avatar: createURL(chat.last_message?.user.avatar),
      phone: chat.last_message?.user.phone,
      email: chat.last_message?.user.email,
    },
  },
}));

export const transformMessagesFromApi = (data: Message[]|Message) => {
  if (Array.isArray(data)) {
    return data.map((message) => ({
      chat_id: message.chat_id,
      content: message.content,
      file: message.file || null,
      id: message.id,
      is_read: message.is_read,
      time: formatDate(message.time),
      type: message.type,
      user_id: message.user_id,
    }));
  }
  return {
    chat_id: data.chat_id,
    content: data.content,
    file: data.file || null,
    id: data.id,
    is_read: data.is_read,
    time: formatDate(data.time),
    type: data.type,
    user_id: data.user_id,
  };
};
