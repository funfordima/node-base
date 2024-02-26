import { EWsCommand } from 'src/constants/ws-command.enum';
import { IGameInit } from 'src/models/game-init.interface';
import { IGame } from 'src/models/game.interface';
import { InstructionDto } from 'src/models/instruction.dto';
import { Instruction } from 'src/models/instruction.model';
import { IRoom } from 'src/models/room.interface';
import { IUserInit } from 'src/models/user-init.interface';
import { IUserReg } from 'src/models/user-reg.interface';
import { IUserRoom } from 'src/models/user-room.interface';

export class DbController {
  rooms: IRoom[] = [];
  private users: IUserRoom[] = [];
  private games: IGame[] = [];

  reg(connectionId: number, user: IUserReg): Instruction<string> {
    let isError = false;
    let errorText = '';
    const currentUser = this.users.find((item) => item.name === user.name);

    if (!currentUser) {
        this.users.push({
          index: connectionId,
          name: user.name,
          password: user.password,
        });
    } else {
      if (currentUser.password !== user.password) {
        isError = true;
        errorText = 'Incorrect password.';
      }
    }

    const currentUserData: IUserRoom = {
      index: connectionId,
      name: user.name,
      password: user.password,
      error: isError,
      errorText: errorText,
    };

    return new InstructionDto<IUserRoom>(EWsCommand.REG, currentUserData).mapDataToJson();
  }

  createRoom(id: number): Instruction<string> {
    const currentRoom = this.rooms.find((item) => item.roomId === id);

    if (!currentRoom) {
      const currentUser = this.users.find((item) => item.index === id);

      if (!currentUser) {
        return new InstructionDto<IRoom[]>(EWsCommand.UPDATE_ROOM, this.rooms).mapDataToJson();
      }

      const roomData = {
        roomId: id,
        roomUsers: [
          {
            name: currentUser.name,
            index: currentUser.index,
            password: currentUser.password,
          },
        ],
      };

      this.rooms.push(roomData);
    }

    return new InstructionDto<IRoom[]>(EWsCommand.UPDATE_ROOM, this.rooms).mapDataToJson();
  }

  addUserToRoom(connectionId: number, data: IGameInit): Instruction<string> {
    const roomId = data?.indexRoom;

    if (roomId !== connectionId) {
      const currentRoom = this.rooms.find((item) => item.roomId === roomId);
      const currentUser = this.users.find((item) => item.index === connectionId);

      if (currentRoom && currentUser && currentRoom.roomUsers.length < 2) {
        currentRoom?.roomUsers.push({ 
          index: connectionId,
          name: currentUser.name,
          password: currentUser.password, 
        });

        const payload = { 
          host: +roomId, 
          client: connectionId, 
          isOnline: true, 
        };

        new InstructionDto<IUserInit>(EWsCommand.ADD_USER_TO_ROOM, payload).mapDataToJson();
      }
    }

    const payload = { 
      host: +roomId, 
      client: connectionId, 
      isOnline: true, 
    };

    return new InstructionDto<IUserInit>(EWsCommand.ADD_USER_TO_ROOM, payload).mapDataToJson();
  }

  updateRooms(): Instruction<string> {
    const availableRooms = this.rooms.filter((room) => room.roomUsers.length < 2);

    return new InstructionDto<IRoom[]>(EWsCommand.UPDATE_ROOM, availableRooms).mapDataToJson();
  }

  createGame(data: IGameInit): Instruction<string> {
    const currentRoom = this.rooms.find((room) => room.roomId === data.indexRoom);
    let game: IGame;

    if (currentRoom) {
      game = {
        idGame: +data.indexRoom,
        hostId: +currentRoom?.roomUsers[0].index,
        clientId: +currentRoom?.roomUsers[1].index,
        isOnline: true,
        data: [],
      };

      this.games.push(game);
    } else {
      game = {
        idGame: +data.indexRoom,
        hostId: +data.indexRoom,
        clientId: -1,
        isOnline: false,
        data: [],
      };

      this.games.push(game);
    }

    return new InstructionDto<IGame>(EWsCommand.CREATE_GAME, game).mapDataToJson();
  }
}
