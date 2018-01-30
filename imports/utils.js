import moment from 'moment';
import find from 'lodash.find';
import 'moment-timezone';

export function time(day, timeStr) {
  const d = moment(day, 'DD/MM/YYYY');
  const t = moment.duration(timeStr, 'HH:mm');

  d.minutes(t.minutes());
  d.hours(t.hours());

  return d;
}

export const timezone = 'Indian/Reunion';

export const businessHours = [
  // specify an array instead
  {
    dow: [1, 2, 3], // Monday, Tuesday, Wednesday
    start: '08:00', // 8am
    end: '18:00' // 6pm
  },
  {
    dow: [4, 5], // Thursday, Friday
    start: '10:00', // 10am
    end: '16:00' // 4pm
  }
];

export const isInBusinessHours = bh => date => {
  const refDate = date.tz(timezone).format('DD/MM/YYYY');
  const dayHours = find(bh, ({dow}) => !!find(dow, d => d === date.day()));
  if (dayHours) {
    const min = time(refDate, dayHours.start);
    const max = time(refDate, dayHours.end);

    return date.isSameOrBefore(max) && date.isSameOrAfter(min);
  }

  return false;
};
