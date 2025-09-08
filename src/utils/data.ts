import {
  ArrowLeftRight,
  ChartColumn,
  Settings,
  SquareUserRound,
  ChartArea,
  TableProperties,
  type LucideIcon,
  User2Icon,
  Edit2Icon,
  UserPlusIcon,
  Settings2Icon,
  UsersIcon,
  CalendarDays,
  CalendarPlus,
  UserIcon,
  Package,
  Banknote,
  HandCoins,
  ShoppingCart,
  Ban,
  HelpCircle,
  HomeIcon
} from 'lucide-react';

export interface BreadcrumbItem {
  title: string;
  icon?: LucideIcon;
  pattern: string;
}

export const breadcrumbData: BreadcrumbItem[] = [
  // Settings
  { title: 'settings', icon: Settings2Icon, pattern: '/settings' },
  // Users
  { title: 'usersDetail', icon: User2Icon, pattern: '/users/detail/' },
  { title: 'userEdit', icon: Edit2Icon, pattern: '/users/edit/' },
  { title: 'userCreate', icon: UserPlusIcon, pattern: '/users/create' },
  { title: 'multiUserCreate', icon: UsersIcon, pattern: '/users/multi-create' },
  // PDKS Users
  { title: 'pdksUsersDetail', icon: User2Icon, pattern: '/users-list/detail/' },

  // Event Areas
  { title: 'eventDetail', icon: CalendarDays, pattern: '/event/detail/' },
  { title: 'eventCreate', icon: CalendarPlus, pattern: '/event/create' },
  { title: 'eventUserDetail', icon: UsersIcon, pattern: '/event/detail/id/user/id' },
  { title: 'participantUserDetail', icon: UserIcon, pattern: '/all-participants/user' },

  // Shop Products
  { title: 'productDetail', icon: Package, pattern: '/products/detail' },
  { title: 'shoppingCart', icon: ShoppingCart, pattern: '/shopping-cart' }
];

export const menuFooterData = [
  {
    title: 'Ayarlar',
    url: '',
    items: [
      {
        title: 'Ayarlar',
        url: '/settings/customer-profile',
        icon: Settings
      }
    ]
  }
  // {
  //   title: 'Destek',
  //   url: '',
  //   items: [
  //     {
  //       title: 'Support',
  //       url: '/support',
  //       icon: HelpCircle,
  //       isNewFeature: true
  //     }
  //   ]
  // }
];

export const sidebarMenuData = {
  navMain: [
    {
      title: 'Ana Sayfa',
      url: '#',
      items: [
        {
          title: 'Ana Sayfa',
          url: '/',
          icon: HomeIcon
        },
        {
          title: 'Tüm Kullanıcılar',
          url: '/all-users',
          icon: SquareUserRound
        },
        {
          title: 'Destek Talepleri',
          url: '/support-requests',
          icon: HelpCircle,
          notificationCount: 3
        }
      ]
    }
  ],
  navFooter: menuFooterData
};

export const getStatusOptionsData = (t: (key: string) => string) => [
  { label: t('all'), value: 'all' },
  { label: t('active'), value: 'true' },
  { label: t('inactive'), value: 'false' }
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

// Event Creation Options

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
