import { cron } from 'https://deno.land/x/deno_cron/cron.ts';

const createSchedule = (schedule: string) => {
  return (callback: () => void) => {
    cron(schedule, () => {
        callback();
    });
  }
}

export default createSchedule;
