export interface Chat {
  id: string;
  message: string;
  timestamp: string;
  isAdmin: boolean;
  name: string;
  avatar?: string;
}

export interface SupportItem {
  id: string;
  name: string;
  email: string;
  date: string;
  read: boolean;
  labels: string[];
  supportTitle: string;
  supportDescription: string;
  supportPhoto: string[];
  supportType: 'technical' | 'billing' | 'general';
  chats: Chat[];
}

export interface Support {
  supportId: string;
  userId: string;
  userFullName: string;
  userEmail: string;
  createdAt: string;
  isRead: boolean;
  supportTitle: string;
  supportDescription: string;
  supportType: 'technical' | 'billing' | 'general';
}

export const supportData: Support[] = [
  {
    supportId: '1',
    userId: '1',
    userFullName: 'John Doe',
    userEmail: 'john@example.com',
    createdAt: new Date().toISOString(),
    isRead: false,
    supportTitle: 'Uygulama Giriş Sorunu',
    supportDescription: 'Uygulamaya giriş yaparken sürekli hata alıyorum. Şifre doğru olmasına rağmen sisteme giriş yapamıyorum.',
    supportType: 'technical'
  },
  {
    supportId: '2',
    userId: '2',
    userFullName: 'Jane Smith',
    userEmail: 'jane@example.com',
    createdAt: new Date().toISOString(),
    isRead: false,
    supportTitle: 'Fatura Sorunu',
    supportDescription: 'Faturamda bir hata var. Lütfen kontrol edin.',
    supportType: 'billing'
  },
  {
    supportId: '3',
    userId: '3',
    userFullName: 'Ali Veli',
    userEmail: 'ali@example.com',
    createdAt: new Date().toISOString(),
    isRead: false,
    supportTitle: 'Genel Bilgi Talebi',
    supportDescription: 'Ürünleriniz hakkında daha fazla bilgi almak istiyorum.',
    supportType: 'general'
  },
  {
    supportId: '4',
    userId: '4',
    userFullName: 'Ayşe Yılmaz',
    userEmail: 'ayse.yilmaz@example.com',
    createdAt: new Date().toISOString(),
    isRead: false,
    supportTitle: 'Hesap Sorunu',
    supportDescription: 'Hesabımda bir sorun var. Lütfen kontrol edin.',
    supportType: 'billing'
  },
  {
    supportId: '5',
    userId: '5',
    userFullName: 'Mehmet Yılmaz',
    userEmail: 'mehmet.yilmaz@example.com',
    createdAt: new Date().toISOString(),
    isRead: false,
    supportTitle: 'Ödeme Sorunu',
    supportDescription: 'Ödeme işlemi sırasında bir hata alıyorum. Lütfen kontrol edin.',
    supportType: 'billing'
  }
];

// Sample data
export const supportItem: SupportItem[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    date: new Date().toISOString(),
    read: false,
    labels: ['support'],
    supportTitle: 'Uygulama Giriş Sorunu',
    supportDescription: 'Uygulamaya giriş yaparken sürekli hata alıyorum. Şifre doğru olmasına rağmen sisteme giriş yapamıyorum.',
    supportPhoto: ['https://picsum.photos/200/200', 'https://picsum.photos/201/201'],
    supportType: 'technical',
    chats: [
      {
        id: '1',
        message: 'Merhaba, uygulamaya giriş yaparken sorun yaşıyorum. Yardımcı olabilir misiniz?',
        timestamp: new Date().toISOString(),
        isAdmin: false,
        name: 'John Doe'
      },
      {
        id: '2',
        message:
          'Merhaba, size yardımcı olmaktan memnuniyet duyarım. Öncelikle uygulamanızın güncel versiyonda olduğundan emin olalım.',
        timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
        isAdmin: true,
        name: 'Support Team',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=support'
      },
      {
        id: '3',
        message: 'Evet, uygulama güncel. Dün güncelleme yaptım.',
        timestamp: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
        isAdmin: false,
        name: 'John Doe'
      }
    ]
  }
];
