import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const isLogin = request.cookies.get('isLogin')?.value;
  const isSendVerifyCode = request.cookies.get('isSendVerifyCode')?.value;

  const isAuthPage = request.nextUrl.pathname.startsWith('/auth');
  const isVerifyPage = request.nextUrl.pathname.startsWith('/auth/verify');

  if (isLogin === 'true' && token) {
    if (isAuthPage) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // /auth/verify route'una erişim kontrolü
  if (isVerifyPage && isSendVerifyCode !== 'true') {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  if (isLogin !== 'true' && !isAuthPage) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|downloadFiles|test-widget.html).*)']
};
