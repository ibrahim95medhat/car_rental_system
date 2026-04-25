import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  isDevMode,
  inject,
  Injectable,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import {
  provideHttpClient,
  withInterceptors,
  HttpClient,
} from '@angular/common/http';
import {
  provideTransloco,
  TranslocoLoader,
  TRANSLOCO_MISSING_HANDLER,
  TranslocoMissingHandler,
} from '@jsverse/transloco';
import { appRoutes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth/auth.interceptor';
import { errorInterceptor } from './core/interceptors/error/error.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  private readonly http = inject(HttpClient);

  getTranslation(lang: string) {
    return this.http.get<Record<string, unknown>>(`/assets/i18n/${lang}.json`);
  }
}

/** Silences noisy "Missing translation" warnings during async load */
class SilentMissingHandler implements TranslocoMissingHandler {
  handle(key: string): string {
    return key;
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideAnimationsAsync(),
    provideRouter(appRoutes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),
    provideTransloco({
      config: {
        availableLangs: ['en', 'ar'],
        defaultLang: 'en',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
    { provide: TRANSLOCO_MISSING_HANDLER, useClass: SilentMissingHandler },
  ],
};
