import { inject } from '@angular/core';
import { ControlContainer } from '@angular/forms';

export const controlContainerViewProvider = {
  provide: ControlContainer,
  useFactory: () => inject(ControlContainer, { skipSelf: true }),
};
