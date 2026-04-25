import {
  AfterViewInit,
  Component,
  effect,
  inject,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CarsStore } from './store/cars.store';
import {
  LibButton,
  LibInput,
  LibTable,
  LibSearchInput,
  TableColumn,
  ModalService,
} from '@ui-lib';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-admin-cars',
  imports: [
    LibTable,
    LibButton,
    LibInput,
    LibSearchInput,
    ReactiveFormsModule,
    TranslocoPipe,
  ],
  templateUrl: './cars.html',
  styleUrl: './cars.css',
  providers: [CarsStore],
})
export class AdminCars implements AfterViewInit {
  protected readonly store = inject(CarsStore);
  private readonly fb = inject(FormBuilder);
  private readonly modalService = inject(ModalService);

  protected readonly carFormTmpl =
    viewChild<TemplateRef<unknown>>('carFormTmpl');
  protected readonly confirmDeleteTmpl =
    viewChild<TemplateRef<unknown>>('confirmDeleteTmpl');

  private readonly tplId = viewChild.required<TemplateRef<void>>('colId');
  private readonly tplName = viewChild.required<TemplateRef<void>>('colName');
  private readonly tplBrand = viewChild.required<TemplateRef<void>>('colBrand');
  private readonly tplModel = viewChild.required<TemplateRef<void>>('colModel');
  private readonly tplPrice = viewChild.required<TemplateRef<void>>('colPrice');
  private readonly tplActions =
    viewChild.required<TemplateRef<void>>('colActions');

  protected readonly columns = signal<TableColumn[]>([]);

  ngAfterViewInit(): void {
    this.columns.set([
      { field: 'id', header: 'id', headerTemplate: this.tplId() },
      { field: 'name', header: 'name', headerTemplate: this.tplName() },
      { field: 'brand', header: 'brand', headerTemplate: this.tplBrand() },
      { field: 'model', header: 'model', headerTemplate: this.tplModel() },
      {
        field: 'price_per_day',
        header: 'price_per_day',
        headerTemplate: this.tplPrice(),
        type: 'currency',
      },
      {
        field: 'actions',
        header: 'actions',
        headerTemplate: this.tplActions(),
      },
    ]);
  }

  protected readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    brand: ['', Validators.required],
    model: ['', Validators.required],
    kilometers: [0, [Validators.required, Validators.min(0)]],
    price_per_day: [0, [Validators.required, Validators.min(1)]],
  });

  constructor() {
    // Single unified effect — confirmDelete takes priority over form modal
    effect(() => {
      const confirmId = this.store.confirmDeleteId();
      const modalOpen = this.store.modalOpen();

      if (confirmId !== null) {
        this.modalService.open({
          title: 'Delete Car',
          description:
            'Are you sure you want to delete this car? This action cannot be undone.',
          hasCloseIcon: true,
          customizeContent: this.confirmDeleteTmpl() ?? null,
          onClose: () => this.store.cancelDelete(),
        });
      } else if (modalOpen) {
        this.modalService.open({
          title: this.store.modalMode() === 'create' ? 'Add Car' : 'Edit Car',
          hasCloseIcon: true,
          customizeContent: this.carFormTmpl() ?? null,
          formGroup: this.form,
          onClose: () => this.store.closeModal(),
        });
      } else {
        this.modalService.close();
      }
    });

    // Populate form when editing
    effect(() => {
      const car = this.store.selectedCar();
      if (car) {
        this.form.reset();
        this.form.setValue({
          name: car.name,
          brand: car.brand,
          model: car.model,
          kilometers: car.kilometers,
          price_per_day: car.price_per_day,
        });
      } else {
        this.form.reset();
      }
    });
  }

  protected onSubmit(): void {
    if (this.form.invalid) return;
    const raw = this.form.getRawValue();
    this.store.submitForm({
      ...raw,
      kilometers: Number(raw.kilometers),
      price_per_day: Number(raw.price_per_day),
    });
  }
}
