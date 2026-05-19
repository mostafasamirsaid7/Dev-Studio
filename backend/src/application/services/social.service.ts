import { stripDates, isUUID } from "../../domain/utils.js";
import { IUnitOfWork } from "../../domain/repositories/unit-of-work.interface.js";

export class SocialService {
  constructor(private uow: IUnitOfWork) {}

  async getAll(userId: string) {
    return await this.uow.socialDrafts.findByUserId(userId);
  }

  async create(userId: string, rawData: any) {
    const { id, ...raw } = rawData;
    const data = stripDates(raw);
    const safeId = isUUID(id) ? id : undefined;
    const existing = safeId
      ? await this.uow.socialDrafts.findByUserAndId(userId, safeId)
      : [];

    if (existing.length > 0) {
      const r = await this.uow.socialDrafts.update(safeId!, data);
      return r;
    } else {
      const r = await this.uow.socialDrafts.create({
        ...data,
        userId,
        ...(safeId ? { id: safeId } : {}),
      } as any);
      return r;
    }
  }

  async createBulk(userId: string, items: any[]) {
    if (!items.length) {
      return [];
    }
    const values = items.map(({ id, ...raw }) => {
      const data = stripDates(raw);
      const safeId = isUUID(id) ? id : undefined;
      return { ...data, userId, ...(safeId ? { id: safeId } : {}) } as any;
    });

    return await this.uow.socialDrafts.createMany(values);
  }

  async deleteById(userId: string, id: string) {
    if (!isUUID(id)) {
      return true;
    }
    const draft = await this.uow.socialDrafts.findById(id);
    if (draft && draft.userId === userId) {
      await this.uow.socialDrafts.delete(id);
    }
    return true;
  }
}

