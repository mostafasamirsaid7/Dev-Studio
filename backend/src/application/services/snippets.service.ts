import { stripDates, isUUID } from "../../domain/utils.js";
import { IUnitOfWork } from "../../domain/repositories/unit-of-work.interface.js";

export class SnippetsService {
  constructor(private uow: IUnitOfWork) {}

  async getAll(userId: string) {
    return await this.uow.snippets.findByUserId(userId);
  }

  async create(userId: string, rawData: any) {
    const { id, ...raw } = rawData;
    const data = stripDates(raw);
    const safeId = isUUID(id) ? id : undefined;
    const existing = safeId
      ? await this.uow.snippets.findByUserAndId(userId, safeId)
      : [];

    if (existing.length > 0) {
      const r = await this.uow.snippets.update(safeId!, data);
      return r;
    } else {
      const r = await this.uow.snippets.create({
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

    return await this.uow.snippets.createMany(values);
  }

  async deleteById(userId: string, id: string) {
    if (!isUUID(id)) {
      return true;
    }
    const snip = await this.uow.snippets.findById(id);
    if (snip && snip.userId === userId) {
      await this.uow.snippets.delete(id);
    }
    return true;
  }
}

