import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";

import bcrypt from "bcrypt";

import { Client } from "../../entities/client.entity";
import { IClientUpdate } from "../../interfaces/client.interface";

const updateClientService = async (id: string, clientData: IClientUpdate) => {
  const clientRepository = AppDataSource.getRepository(Client);

  const client = await clientRepository.findOneBy({
    id,
  });

  if (!client) {
    throw new AppError("Client not found", 404);
  }

  if (clientData.password) {
    clientData.password = await bcrypt.hash(clientData.password, 10);
  }

  await clientRepository.update(client.id, {
    ...clientData,
  });
};

export default updateClientService;
