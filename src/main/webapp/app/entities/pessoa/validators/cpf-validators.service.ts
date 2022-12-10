import { Injectable } from '@angular/core';
import { PessoaService } from '../service/pessoa.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AsyncValidatorFn, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

/**
 * Classe para fazer validações de cpf
 *
 */
@Injectable({ providedIn: 'root' })
export class CustomCPFCNPJValidatorService {
  /**
   * Método pafa validar o cpf.
   * O cpf deve estar com máscara.
   * A funcao retira a máscara
   */
  isValidCpf(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (control.value) {
        const cpf = control.value.replace(/\D/g, ''); // retirar mascara do cpf
        let numbers, digits, sum, i, result, equalDigits;
        equalDigits = 1;
        if (cpf.length < 11) {
          return {};
        }

        for (i = 0; i < cpf.length - 1; i++) {
          if (cpf.charAt(i) !== cpf.charAt(i + 1)) {
            equalDigits = 0;
            break;
          }
        }

        if (!equalDigits) {
          numbers = cpf.substring(0, 9);
          digits = cpf.substring(9);
          sum = 0;
          for (i = 10; i > 1; i--) {
            sum += numbers.charAt(10 - i) * i;
          }

          result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

          if (result !== Number(digits.charAt(0))) {
            return { cpfNotValid: { value: control.value } };
          }
          numbers = cpf.substring(0, 10);
          sum = 0;

          for (i = 11; i > 1; i--) {
            sum += numbers.charAt(11 - i) * i;
          }
          result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

          if (result !== Number(digits.charAt(1))) {
            return { cpfNotValid: { value: control.value } };
          }
          return {};
        } else {
          return { cpfNotValid: { value: control.value } };
        }
      }
      return {};
    };
  }
  /**
   *
   * @param pessoaService
   * Test if cpf is already in use by another person
   * @param pessoaId
   * Nullable id for a specif pessoa
   */

  existingCpfValidator(pessoaService: PessoaService, pessoaId: number | null): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> =>
      pessoaService
        .findWithCpf(control.value, pessoaId)
        .pipe(map(res => (control.value && res.body && res.body > 0 ? { cpfAlreadyInUse: { value: control.value } } : null)));
  }
}
