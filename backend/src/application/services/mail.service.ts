import { stripDates, isUUID } from "../../domain/utils.js";
import { IUnitOfWork } from "../../domain/repositories/unit-of-work.interface.js";

export class MailService {
  constructor(private uow: IUnitOfWork) {}

  async getAll(userId: string) {
    return await this.uow.mailTemplates.findByUserId(userId);
  }

  async create(userId: string, rawData: any) {
    const { id, ...raw } = rawData;
    const data = stripDates(raw);
    const safeId = isUUID(id) ? id : undefined;
    const existing = safeId
      ? await this.uow.mailTemplates.findByUserAndId(userId, safeId)
      : [];

    if (existing.length > 0) {
      const r = await this.uow.mailTemplates.update(safeId!, data);
      return r;
    } else {
      const r = await this.uow.mailTemplates.create({
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

    return await this.uow.mailTemplates.createMany(values);
  }

  async deleteById(userId: string, id: string) {
    if (!isUUID(id)) {
      return true;
    }
    const mailTemplate = await this.uow.mailTemplates.findById(id);
    if (mailTemplate && mailTemplate.userId === userId) {
      await this.uow.mailTemplates.delete(id);
    }
    return true;
  }
}

