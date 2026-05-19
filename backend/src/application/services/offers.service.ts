import { stripDates, isUUID } from "../../domain/utils.js";
import { IUnitOfWork } from "../../domain/repositories/unit-of-work.interface.js";

export class OffersService {
  constructor(private uow: IUnitOfWork) {}

  async getAll(userId: string) {
    return await this.uow.freelanceOffers.findByUserId(userId);
  }

  async create(userId: string, rawData: any) {
    const { id, ...raw } = rawData;
    const data = stripDates(raw);
    const safeId = isUUID(id) ? id : undefined;

    if (safeId) {
      const existing = await this.uow.freelanceOffers.findByUserAndId(userId, safeId);

      if (existing.length > 0) {
        const r = await this.uow.freelanceOffers.update(safeId, data);
        return r;
      }
    }

    const r = await this.uow.freelanceOffers.create({
      ...data,
      userId,
      ...(safeId ? { id: safeId } : {}),
    } as any);

    return r;
  }

  async deleteById(userId: string, id: string) {
    if (!isUUID(id)) return true;
    const offer = await this.uow.freelanceOffers.findById(id);
    if (offer && offer.userId === userId) {
      await this.uow.freelanceOffers.delete(id);
    }
    return true;
  }
}

