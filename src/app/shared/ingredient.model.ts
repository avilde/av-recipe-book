export enum UnitOfMeasure {
  TEA_SPOON = 'tsp.',
  TABLE_SPOON = 'tbsp.',
  FLUID_OUNCE = 'fl oz',
  GILL = '1/2 cup',
  CUP = 'c',
  MILLILITER = 'ml',
  LITER = 'l',
  DECILITER = 'dl',
  GRAM = 'g',
  KILOGRAM = 'kg'
}

export class Ingredient {
  constructor(
    public name: string,
    public amount: number,
    public unit: UnitOfMeasure
  ) {}
}
