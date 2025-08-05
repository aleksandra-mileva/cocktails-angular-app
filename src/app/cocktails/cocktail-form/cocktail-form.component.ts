import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CocktailFormOptions} from '../../types/cocktailFormOptions';
import {BackendValidationMap} from '../../types/backendValidationMap';
import {CocktailAddOrEdit} from '../../types/cocktailAddOrEdit';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {wholeNumberBiggerThenValidator} from '../../shared/validators/whole-number-bigger-then.validator';
import {FlavourEnum} from '../../types/enums/flavour-enum';
import {TypeEnum} from '../../types/enums/type-enum';
import {SpiritNameEnum} from '../../types/enums/spirit-name-enum';
import {CocktailsService} from '../cocktails.service';
import {ErrorService} from '../../error/error.service';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-cocktail-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatError,
    MatSelect,
    MatOption,
    MatButton
  ],
  templateUrl: './cocktail-form.component.html',
  styleUrl: './cocktail-form.component.css'
})
export class CocktailFormComponent implements OnInit, OnChanges {
  @Input() mode: 'create' | 'update' = 'create';
  @Input() backendErrorsMap: BackendValidationMap = {};
  @Input() cocktailData: CocktailAddOrEdit | null = null;
  @Input() picture: File | undefined;

  @Output() submitForm = new EventEmitter<FormData>();

  options: CocktailFormOptions | null = null;
  isLoading = true;
  selectedFile: File | null = null;

  form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20)
    ]),
    ingredients: new FormControl('', [
      Validators.required
    ]),
    preparation: new FormControl('', [
      Validators.required
    ]),
    flavour: new FormControl('', [
      Validators.required
    ]),
    videoUrl: new FormControl(''),
    type: new FormControl('', [
      Validators.required
    ]),
    spirit: new FormControl('', [
      Validators.required
    ]),
    percentAlcohol: new FormControl<number | null>(null, [
      Validators.required,
      wholeNumberBiggerThenValidator(0)
    ]),
    servings: new FormControl<number | null>(null, [
      Validators.required,
      wholeNumberBiggerThenValidator(1)
    ])
  });

  constructor(
    private cocktailService: CocktailsService,
    private errorService: ErrorService
  ) {
  }

  ngOnInit(): void {
    this.cocktailService.getFormOptions().subscribe({
      next: (opts) => {
        this.options = opts;
        this.isLoading = false;
      },
      error: err => {
        this.errorService.navigateToErrorPage(err);
        this.isLoading = false;
      }
    });

    if (this.cocktailData) {
      this.patchForm(this.cocktailData);
    }

    Object.keys(this.form.controls).forEach(fieldName => {
      this.form.get(fieldName)?.valueChanges.subscribe(() => {
        if (this.backendErrorsMap[fieldName]) {
          delete this.backendErrorsMap[fieldName];
        }
      });
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cocktailData'] && changes['cocktailData'].currentValue) {
      this.patchForm(changes['cocktailData'].currentValue);
    }
  }

  protected patchForm(dto: CocktailAddOrEdit): void {
    this.form.patchValue({
      name: dto.name,
      ingredients: dto.ingredients,
      preparation: dto.preparation,
      flavour: dto.flavour as FlavourEnum,
      videoUrl: dto.videoUrl,
      type: dto.type as TypeEnum,
      spirit: dto.spirit as SpiritNameEnum,
      percentAlcohol: Number(dto.percentAlcohol),
      servings: Number(dto.servings)
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const dto = this.form.value as CocktailAddOrEdit;

    const formData = new FormData();
    const dtoBlob = new Blob([JSON.stringify(dto)], {
      type: 'application/json'
    });

    formData.append('addCocktailDto', dtoBlob);

    if (this.selectedFile) {
      formData.append('picture', this.selectedFile, this.selectedFile.name);
    }

    this.submitForm.emit(formData);
  }

  hasBackendErrors(): boolean {
    return Object.keys(this.backendErrorsMap).length > 0;
  }
}
