import { cron } from 'https://deno.land/x/deno_cron/cron.ts';
import { Schedule } from "./interfaces.ts";

const createSchedule = (schedule: Schedule) => {

  if (!schedule.cron) {
    throw new Error('not set schedule settings');
  }

  return (callback: () => void) => {
    cron(schedule.cron, () => {
        callback();
    });
  }
}

export default createSchedule;
