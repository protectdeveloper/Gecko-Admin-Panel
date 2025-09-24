import { BaseAxiosService } from '../BaseAxiosService';
import { GenericResponse } from '../types';
import { GetMqttMessagesDTO, GetMqttStatusDTO } from './Mqtt.types';

export const MqttApi = {
  getMqttStatus: async (): Promise<GetMqttStatusDTO> => {
    const response = await BaseAxiosService.get('management/mqtt/status');
    return response.data;
  },

  getMqttMessages: async (sort?: string): Promise<GetMqttMessagesDTO> => {
    const response = await BaseAxiosService.get('/management/mqtt/messages', { params: { sort } });
    return response.data;
  },

  getMqttStart: async (): Promise<GenericResponse> => {
    const response = await BaseAxiosService.get('/management/mqtt/start');
    return response.data;
  },

  getMqttStop: async (): Promise<GenericResponse> => {
    const response = await BaseAxiosService.get('/management/mqtt/stop');
    return response.data;
  },

  getMqttSubscribeTerminalStatus: async (): Promise<GenericResponse> => {
    const response = await BaseAxiosService.get('/management/mqtt/subscribe-terminal-status');
    return response.data;
  },

  postMqttSubscribe: async (body: { topic: string }): Promise<GenericResponse> => {
    const response = await BaseAxiosService.post('/management/mqtt/subscribe', body);
    return response.data;
  },

  postMqttUnsubscribe: async (body: { topic: string }): Promise<GenericResponse> => {
    const response = await BaseAxiosService.post('/management/mqtt/unsubscribe', body);
    return response.data;
  }
};
