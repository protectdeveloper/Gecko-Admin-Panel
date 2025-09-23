export type GetMqttStatusDTO = {
  isConnected: boolean;
  message: string;
};

export type GetMqttMessagesDTO = {
  messages: {
    topic: string;
    data: {
      process: string;
      status: string;
      device_id: string;
      customer_id: string;
      timestamp: number;
    };
    receivedAt: string;
    customer: {
      customerName: string;
      customerCode: string;
    };
    machine: {
      machineName: string;
      version: string;
    };
  }[];
};
