import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { i18n } from '../i18n-config';

import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

function getLocale(request: NextRequest): string | undefined {
    // Negotiator expects plain object so we need to transform headers
    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

    // Use negotiator and intl-localematcher to get best locale
    let languages = new Negotiator({ headers: negotiatorHeaders }).languages();
    // @ts-ignore locales are readonly
    const locales: string[] = i18n.locales;
    return matchLocale(languages, locales, i18n.defaultLocale);
}

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Ignore paths in the public directory
    if (['/manifest.json', '/favicon.ico'].includes(pathname)) return;

    // Check if there is any supported locale in the pathname
    const pathnameIsMissingLocale = i18n.locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    // If there is no locale in the pathname, default to 'en'
    if (pathnameIsMissingLocale) {
        const locale = getLocale(request) || 'en';

        // Do not redirect, just rewrite to the default locale
        const newPathname = `/${locale}${pathname}`;
        return NextResponse.rewrite(new URL(newPathname, request.url));
    }
}

export const config = {
    // Matcher ignoring `/_next/` and `/api/`
    matcher: ['/((?!_next|api).*)'],
};
