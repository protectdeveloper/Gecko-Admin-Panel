import { formatTimeToHourMinute } from './formatTime';

export const eventAreadays = [
  { key: 'monday', label: 'eventCreate.monday', startLabel: 'eventCreate.mondayStart', endLabel: 'eventCreate.mondayEnd' },
  { key: 'tuesday', label: 'eventCreate.tuesday', startLabel: 'eventCreate.tuesdayStart', endLabel: 'eventCreate.tuesdayEnd' },
  {
    key: 'wednesday',
    label: 'eventCreate.wednesday',
    startLabel: 'eventCreate.wednesdayStart',
    endLabel: 'eventCreate.wednesdayEnd'
  },
  {
    key: 'thursday',
    label: 'eventCreate.thursday',
    startLabel: 'eventCreate.thursdayStart',
    endLabel: 'eventCreate.thursdayEnd'
  },
  { key: 'friday', label: 'eventCreate.friday', startLabel: 'eventCreate.fridayStart', endLabel: 'eventCreate.fridayEnd' },
  {
    key: 'saturday',
    label: 'eventCreate.saturday',
    startLabel: 'eventCreate.saturdayStart',
    endLabel: 'eventCreate.saturdayEnd'
  },
  { key: 'sunday', label: 'eventCreate.sunday', startLabel: 'eventCreate.sundayStart', endLabel: 'eventCreate.sundayEnd' }
] as const;

export const normalizeTimesOrder = (times: { dayOfWeek: string; startTime: string; endTime: string }[] = []) => {
  const dayOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;

  return dayOrder.map((day) => {
    const matched = times.find((t) => t.dayOfWeek === day);
    const start = matched ? formatTimeToHourMinute(matched.startTime) : '00:00';
    const end = matched ? formatTimeToHourMinute(matched.endTime) : '23:59';

    return {
      dayOfWeek: day,
      startTime: start,
      endTime: end,
      isChecked: matched ? !(start === '00:00' && end === '00:00') : true
    };
  });
};

export const eventTypeSwitcher = (status: string, t: (key: string) => string) => {
  switch (status) {
    case 'timed':
      return {
        label: t('eventList.timed'), // Devam Ediyor
        color: 'bg-green-500'
      };
    case 'routine':
      return {
        label: t('eventList.routine'), // Rutin
        color: 'bg-red-500'
      };
    default:
      return {
        label: t('eventList.undefined'), // Beklemede
        color: 'bg-red-500'
      };
  }
};

export const eventStatusSwitcher = (status: string, t: (key: string) => string) => {
  switch (status) {
    case 'planned':
      return {
        label: t('eventList.planned'), // Planlandı
        color: 'bg-blue-500'
      };
    case 'canceled':
      return {
        label: t('eventList.canceled'), // İptal Edildi
        color: 'bg-red-500'
      };
    case 'finished':
      return {
        label: t('eventList.completed'), // Tamamlandı
        color: 'bg-orange-500'
      };
    case 'start':
      return {
        label: t('eventList.ongoing'), // Devam Ediyor Başladı
        color: 'bg-yellow-500'
      };
    default:
      return {
        label: t('eventList.undefined'),
        color: 'bg-gray-500'
      };
  }
};

export const eventInvitationTypeSwitcher = (type: string, t: (key: string) => string) => {
  switch (type) {
    case 'reservation':
      return {
        label: t('eventList.reservation'),
        color: 'bg-blue-500'
      };
    case 'invitation':
      return {
        label: t('eventList.invitation'),
        color: 'bg-purple-500'
      };
    case 'invitation_and_reservation':
      return {
        label: t('eventList.invitationAndReservation'),
        color: 'bg-yellow-500'
      };
    default:
      return {
        label: t('eventList.undefined'),
        color: 'bg-gray-500'
      };
  }
};

export const eventParticipationStatusSwitcher = (isCompleted: boolean, isApproved: boolean, t: (key: string) => string) => {
  if (!isCompleted) {
    return {
      text: t('eventUserDetail.pending'),
      color: 'bg-yellow-500'
    };
  }

  // Completion true ise approval durumuna göre switch
  switch (String(isApproved)) {
    case 'true':
      return {
        text: t('eventUserDetail.approved'),
        color: 'bg-green-500'
      };
    case 'false':
      return {
        text: t('eventUserDetail.rejected'),
        color: 'bg-red-500'
      };
    default:
      return {
        text: t('eventUserDetail.pending'),
        color: 'bg-yellow-500'
      };
  }
};

export const eventUserApprovedLabelSwitcher = (type: string, t: (key: string) => string) => {
  switch (type) {
    case 'automatic':
      return t('eventUserDetail.automatic');
    default:
      return t('eventUserDetail.undefined');
  }
};
