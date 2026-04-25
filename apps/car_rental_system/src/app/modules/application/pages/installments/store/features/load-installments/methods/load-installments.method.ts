import { patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { pipe, tap, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { createLoadInstallmentsHandlers } from '../handlers/load-installments.handlers';

export function createLoadInstallmentsMethod(store: any) {
  return rxMethod<void>(
    pipe(
      tap(() => patchState(store, { installmentsLoading: true })),
      switchMap(() =>
        store.installmentsService
          .getAll({ page: store.page(), per_page: store.perPage(), search: store.search() || undefined })
          .pipe(
            takeUntilDestroyed(store.destroyRef),
            tapResponse(createLoadInstallmentsHandlers(store)),
          ),
      ),
    ),
  );
}
