import { stripDates, isUUID } from "../../domain/utils.js";
import { IUnitOfWork } from "../../domain/repositories/unit-of-work.interface.js";
import { IScraperService } from "../../domain/services/scraper.interface.js";

export class JobsService {
  constructor(
    private uow: IUnitOfWork,
    private scraperService: IScraperService,
  ) {}

  async getSaved(userId: string) {
    return await this.uow.savedJobs.findByUserId(userId);
  }

  async saveJob(userId: string, rawData: any) {
    const { id, ...raw } = rawData;
    const data = stripDates(raw);
    const safeId = isUUID(id) ? id : undefined;

    if (safeId) {
      const existing = await this.uow.savedJobs.findByUserAndId(userId, safeId);

      if (existing.length > 0) {
        const r = await this.uow.savedJobs.update(safeId, data);
        return r;
      }
    }

    const r = await this.uow.savedJobs.create({
      ...data,
      userId,
      ...(safeId ? { id: safeId } : {}),
    } as any);

    return r;
  }

  async deleteSavedById(userId: string, id: string) {
    if (!isUUID(id)) {
      return true;
    }
    const job = await this.uow.savedJobs.findById(id);
    if (job && job.userId === userId) {
      await this.uow.savedJobs.delete(id);
    }
    return true;
  }

  async getRemoteJobs(tag: string) {
    return await this.scraperService.getRemoteJobs(tag);
  }

  async scrapeJobs(
    query: string,
    location: string,
    days: number,
    sources: string[],
  ) {
    return await this.scraperService.scrapeJobs(query, location, days, sources);
  }
}

