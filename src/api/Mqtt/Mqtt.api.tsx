import { BaseAxiosService } from '../BaseAxiosService';
import { GenericResponse } from '../types';
import { GetMqttMessagesDTO, GetMqttStatusDTO } from './Mqtt.types';

export const MqttApi = {
  getMqttStatus: async (): Promise<GetMqttStatusDTO> => {
    const response = await BaseAxiosService.get('/Mqtt/status');
    return response.data;
  },

  getMqttMessages: async (sort?: string): Promise<GetMqttMessagesDTO> => {
    const response = await BaseAxiosService.get('/Mqtt/messages', { params: { sort } });
    return response.data;
  },

  postMqttStart: async (): Promise<GenericResponse> => {
    const response = await BaseAxiosService.post('/Mqtt/start');
    return response.data;
  },

  postMqttStop: async (): Promise<GenericResponse> => {
    const response = await BaseAxiosService.post('/Mqtt/stop');
    return response.data;
  },

  postMqttSubscribeTerminalStatus: async (): Promise<GenericResponse> => {
    const response = await BaseAxiosService.post('/Mqtt/subscribe-terminal-status');
    return response.data;
  },

  postMqttSubscribe: async (topic: string): Promise<GenericResponse> => {
    const response = await BaseAxiosService.post('/api/v1/Mqtt/subscribe', topic);
    return response.data;
  },

  postMqttUnsubscribe: async (topic: string): Promise<GenericResponse> => {
    const response = await BaseAxiosService.post('/api/v1/Mqtt/unsubscribe', topic);
    return response.data;
  }
};
