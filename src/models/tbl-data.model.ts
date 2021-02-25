import {Entity, model, property} from '@loopback/repository';

// @model()

@model({
  settings: {
    mysql: {
      table: 'tbl_data',
    },
  },
})

export class TblData extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  data1: string;

  @property({
    type: 'string',
    required: true,
  })
  data2: string;

  @property({
    type: 'date',
  })
  createdat?: string;


  constructor(data?: Partial<TblData>) {
    super(data);
  }
}

export interface TblDataRelations {
  // describe navigational properties here
}

export type TblDataWithRelations = TblData & TblDataRelations;
