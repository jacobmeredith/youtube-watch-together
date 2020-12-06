export interface IStateInterface {
  messages: Array<{ id: string, content: string, from: string|null }>,
  user: string|null,
  room: string|null,
  video: string,
  state: string,
  time: number,
  connection: any|null
}

export interface IActionInterface {
  type: string,
  payload: any
}

export const defaultState: IStateInterface = {
  messages: [],
  user: null,
  room: null,
  video: 'TTuGlJMJoOI',
  state: 'onPlay',
  time: 0,
  connection: null
};

export function reducer(state: IStateInterface, action: IActionInterface): IStateInterface {
  switch(action.type) {
    case 'IO_CONNECTED': {
      return {
        ...state,
        connection: action.payload
      }
    }
    case 'IO_CLOSE': {
      return {
        ...state,
        connection: action.payload
      }
    }
    case 'ROOM_CREATE': {
      state.connection?.emit('NEW_ROOM', action.payload);
      return {
        ...state,
        user: action.payload
      };
    }
    case 'ROOM_UPDATE': {
      return {
        ...state,
        room: action.payload
      };
    }
    case 'ROOM_JOIN': {
      state.connection?.emit('JOIN_ROOM', action.payload);
      return {
        ...state,
        user: action.payload.user,
        room: action.payload.room
      };
    }
    case 'MESSAGE_CREATE': {
      state.connection?.emit('NEW_MESSAGE', { content: action.payload, from: state.user });
      return {
        ...state,
        messages: [...state.messages, { id: '', content: action.payload, from: state.user }]
      }
    }
    case 'MESSAGE_RECIEVED': {
      if (action.payload.from === state.user) return state;
      return {
        ...state,
        messages: [...state.messages, { id: '', content: action.payload.content, from: action.payload.from }]
      }
    }
    case 'VIDEO_CHANGE': {
      state.connection?.emit('CHANGE_VIDEO', action.payload);
      return {
        ...state,
        video: action.payload
      };
    }
    case 'VIDEO_RECIEVED': {
      return {
        ...state,
        video: action.payload
      }
    }
    case 'VIDEO_UPDATE': {
      state.connection?.emit('UPDATE_VIDEO', action.payload);
      return {
        ...state,
        state: action.payload.type,
        time: action.payload.time
      };
    }
    case 'VIDEO_EVENT': {
      return {
        ...state,
        state: action.payload.type,
        time: action.payload.time
      };
    }
    default: {
      throw new Error('Please provide an action type');
    }
  }
};
