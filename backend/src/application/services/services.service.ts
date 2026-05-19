import { stripDates, isUUID } from "../../domain/utils.js";
import { IUnitOfWork } from "../../domain/repositories/unit-of-work.interface.js";

export class MyServicesService {
  constructor(private uow: IUnitOfWork) {}

  async getAll(userId: string) {
    return await this.uow.myServices.findByUserId(userId);
  }

  async create(userId: string, rawData: any) {
    const { id, ...raw } = rawData;
    const data = stripDates(raw);
    const safeId = isUUID(id) ? id : undefined;

    if (safeId) {
      const existing = await this.uow.myServices.findByUserAndId(userId, safeId);

      if (existing.length > 0) {
        const r = await this.uow.myServices.update(safeId, data);
        return r;
      }
    }

    const r = await this.uow.myServices.create({
      ...data,
      userId,
      ...(safeId ? { id: safeId } : {}),
    } as any);

    return r;
  }

  async deleteById(userId: string, id: string) {
    if (!isUUID(id)) {
      return true;
    }
    const serv = await this.uow.myServices.findById(id);
    if (serv && serv.userId === userId) {
      await this.uow.myServices.delete(id);
    }
    return true;
  }
}

