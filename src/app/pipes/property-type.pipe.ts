import { Pipe, PipeTransform } from '@angular/core';
import { PropertyType } from '../models/property.model';

@Pipe({
  name: 'propertyTypeLabel',
  standalone: true
})
export class PropertyTypeLabelPipe implements PipeTransform {
  transform(value: PropertyType): string {
    switch (value) {
      case PropertyType.HOUSE:
        return 'Casa';
      case PropertyType.APARTMENT:
        return 'Departamento';
      case PropertyType.TOWNHOUSE:
        return 'Casa en condominio';
      case PropertyType.COMMERCIAL:
        return 'Comercial';
      case PropertyType.LAND:
        return 'Terreno';
      default:
        return 'Propiedad';
    }
  }
} 