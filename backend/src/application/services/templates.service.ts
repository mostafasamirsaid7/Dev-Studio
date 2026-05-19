import { stripDates, isUUID } from "../../domain/utils.js";
import { IUnitOfWork } from "../../domain/repositories/unit-of-work.interface.js";

export class TemplatesService {
  constructor(private uow: IUnitOfWork) {}

  async getAll(userId: string) {
    return await this.uow.templates.findByUserId(userId);
  }

  async create(userId: string, rawData: any) {
    const { id, ...raw } = rawData;
    const data = stripDates(raw);
    const safeId = isUUID(id) ? id : undefined;
    const existing = safeId
      ? await this.uow.templates.findByUserAndId(userId, safeId)
      : [];

    if (existing.length > 0) {
      const r = await this.uow.templates.update(safeId!, data);
      return r;
    } else {
      const r = await this.uow.templates.create({
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

    return await this.uow.templates.createMany(values);
  }

  async deleteById(userId: string, id: string) {
    if (!isUUID(id)) {
      return true;
    }
    const templ = await this.uow.templates.findById(id);
    if (templ && templ.userId === userId) {
      await this.uow.templates.delete(id);
    }
    return true;
  }
}

