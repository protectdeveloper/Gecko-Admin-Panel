import {
  Settings,
  type LucideIcon,
  User2Icon,
  Settings2Icon,
  HelpCircle,
  HomeIcon,
  Building2,
  MonitorCog,
  Package,
  CalendarRange,
  ArrowRightLeft,
  RadioTower,
  ShieldCheck
} from 'lucide-react';

export interface BreadcrumbItem {
  title: string;
  icon?: LucideIcon;
  pattern: string;
}

export const breadcrumbData: BreadcrumbItem[] = [
  { title: 'settings', icon: Settings2Icon, pattern: '/settings' },
  { title: 'usersDetail', icon: User2Icon, pattern: '/users/detail/' }
];

export const menuFooterData = [
  {
    title: 'Ayarlar',
    url: '/settings/customer-profile',
    icon: Settings
  }
];

export const sidebarMenuData = {
  navMain: [
    {
      title: 'Ana Sayfa',
      url: '/',
      icon: HomeIcon
    },
    {
      title: 'Admin Logları',
      url: '/admin-logs',
      icon: ShieldCheck
    },
    {
      title: 'Firma',
      url: '#',
      icon: Building2,
      items: [
        {
          title: 'Firmalar',
          url: '/customers'
        },
        {
          title: 'Firma Makineleri',
          url: '/customers/machines'
        }
      ]
    },
    {
      title: 'Makine',
      url: '#',
      icon: MonitorCog,
      items: [
        {
          title: 'Makineler',
          url: '/machines'
        },
        {
          title: 'Makine Tipleri',
          url: '/machines/types'
        }
      ]
    },
    {
      title: 'Paket',
      url: '#',
      icon: Package,
      items: [
        {
          title: 'Paketler',
          url: '/packages'
        },
        {
          title: 'Paket İçeriği',
          url: '/packages/content'
        },
        {
          title: 'Paket Tipleri',
          url: '/packages/types'
        }
      ]
    },
    {
      title: 'Resmi Tatiller',
      url: '/public-holidays',
      icon: CalendarRange
    },
    {
      title: 'Geçiş Yöntemleri',
      url: '/access-methods',
      icon: ArrowRightLeft
    },
    {
      title: 'Bağlantılar',
      url: '/connections',
      icon: RadioTower
    },
    {
      title: 'Destek Talepleri',
      url: '/support-requests',
      icon: HelpCircle
    }
  ],
  navFooter: menuFooterData
};

export const getStatusOptionsData = (t: (key: string) => string) => [
  { label: t('staticData.statusOptions.all'), value: 'all' },
  { label: t('staticData.statusOptions.active'), value: 'true' },
  { label: t('staticData.statusOptions.inactive'), value: 'false' }
];

export const getIsAuthorizedOptionsData = (t: (key: string) => string) => [
  { label: t('staticData.isAuthorizedOptions.all'), value: 'all' },
  { label: t('staticData.isAuthorizedOptions.authorized'), value: 'true' },
  { label: t('staticData.isAuthorizedOptions.unauthorized'), value: 'false' }
];

export const getIsOnlineOptionsData = (t: (key: string) => string) => [
  { label: t('staticData.isOnlineOptions.all'), value: 'all' },
  { label: t('staticData.isOnlineOptions.online'), value: 'true' },
  { label: t('staticData.isOnlineOptions.offline'), value: 'false' }
];

export const getRequestTypeData = (t: (key: string) => string) => [
  { label: t('staticData.requestTypeOptions.all'), value: 'all' },
  { label: t('staticData.requestTypeOptions.get'), value: 'GET' },
  { label: t('staticData.requestTypeOptions.post'), value: 'POST' },
  { label: t('staticData.requestTypeOptions.put'), value: 'PUT' },
  { label: t('staticData.requestTypeOptions.delete'), value: 'DELETE' }
];

export const getLocationOptionsData = (t: (key: string) => string) => [
  { label: t('all'), value: 'all' },
  { label: t('entry'), value: 'true' },
  { label: t('exit'), value: 'false' }
];

export const getMissingTypeOptionsData = (t: (key: string) => string) => [
  { value: 'all', label: t('all') },
  { value: 'late_entry', label: t('lateEntry') },
  { value: 'early_exit', label: t('earlyExit') }
];

export const getInvitationSendingTypeData = (t: (key: string) => string) => [
  { label: t('eventCreate.sms'), id: '1', disabled: false },
  { label: t('eventCreate.email'), id: '2', disabled: true }
  // { label: t('eventCreate.both'), id: '3' }
];

export const getDisplayTypeData = (t: (key: string) => string) => [
  { label: t('eventCreate.now'), id: '1' },
  { label: t('eventCreate.daysBefore'), id: '2' }
];

export const getEntryPolicyPlaceholderData = (t: (key: string) => string) => [
  { label: t('eventCreate.entryPolicy1'), id: '1' },
  { label: t('eventCreate.entryPolicy2'), id: '2' }
];

export const getReservationConfirmationSettingData = (t: (key: string) => string) => [
  { label: t('eventCreate.automaticApproval'), id: '1' },
  { label: t('eventCreate.authorizedUserApproval'), id: '2' }
];

export const getParticipationProcedureData = (t: (key: string) => string) => [
  { label: t('eventCreate.invitation'), id: '1' },
  { label: t('eventCreate.reservation'), id: '2' },
  { label: t('eventCreate.both'), id: '3' }
];

export const getEventTypeData = (t: (key: string) => string) => [
  { label: t('eventCreate.routine'), id: '1' },
  { label: t('eventCreate.limited'), id: '2' }
];

export const getReminderTypeData = (t: (key: string) => string) => [
  { label: t('eventCreate.reminderType1'), id: '1' },
  { label: t('eventCreate.reminderType2'), id: '2' }
];

export const getEventStatusData = (t: (key: string) => string) => [
  { label: t('eventList.planned'), id: 'planned' },
  { label: t('eventList.ongoing'), id: 'start' },
  { label: t('eventList.break'), id: 'break' },
  { label: t('eventList.completed'), id: 'finished' },
  { label: t('eventList.canceled'), id: 'canceled' }
];

export const getEventParticipationStatusData = (t: (key: string) => string) => [
  { label: t('all'), id: 'all' },
  { label: t('eventUserDetail.approved'), id: 'true' },
  { label: t('eventUserDetail.rejected'), id: 'false' }
];

export const getEventDetailParticipantStatusData = (t: (key: string) => string) => [
  { label: t('eventDetail.allParticipants'), value: 'participants' },
  { label: t('eventDetail.participantsAwaitingApproval'), value: 'awaiting' },
  { label: t('eventDetail.bannedUsers'), value: 'banned' }
];

export const getSupportRequestUrgencyStatusData = (t: (key: string) => string) => [
  { label: t('support.lowStatus'), value: 'low' },
  { label: t('support.normalStatus'), value: 'normal' },
  { label: t('support.urgentStatus'), value: 'urgent' }
];

export const getSupportRequestTypeData = (t: (key: string) => string) => [
  { value: 'technical', label: t('support.technical') },
  { value: 'billing', label: t('support.billing') },
  { value: 'general', label: t('support.general') }
];
