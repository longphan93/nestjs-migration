export interface ColumnTypeStep {
  uuid(): ColumnOptionsStep & ColumnPrimaryStep;
  integer(): ColumnOptionsStep & ColumnPrimaryStep;
  boolean(): ColumnOptionsStep;
  string(length?: number): ColumnOptionsStep;
  text(): ColumnOptionsStep;
  timestamp(): ColumnOptionsStep;
  float(precision?: number, scale?: number): ColumnOptionsStep;
  double(precision?: number, scale?: number): ColumnOptionsStep;
  decimal(precision?: number, scale?: number): ColumnOptionsStep;
}

export interface ColumnPrimaryStep {
  primary(): ColumnPrimaryStep;
  default(value: any): ColumnPrimaryStep;
  autoIncrement(): ColumnPrimaryStep;
}

export interface ColumnOptionsStep {
  nullable(): ColumnOptionsStep;
  unique(): ColumnOptionsStep;
  default(value: any): ColumnOptionsStep;
  index(): ColumnOptionsStep;
  foreign(referenceTable: string, referenceColumn?: string): ColumnOptionsStep;
}
