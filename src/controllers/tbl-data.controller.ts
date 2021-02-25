import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {TblData} from '../models';
import {TblDataRepository} from '../repositories';

export class TblDataController {
  constructor(
    @repository(TblDataRepository)
    public tblDataRepository : TblDataRepository,
  ) {}

  @post('/tbl-data')
  @response(200, {
    description: 'TblData model instance',
    content: {'application/json': {schema: getModelSchemaRef(TblData)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TblData, {
            title: 'NewTblData',
            exclude: ['id'],
          }),
        },
      },
    })
    tblData: Omit<TblData, 'id'>,
  ): Promise<TblData> {
    return this.tblDataRepository.create(tblData);
  }

  @get('/tbl-data/count')
  @response(200, {
    description: 'TblData model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TblData) where?: Where<TblData>,
  ): Promise<Count> {
    return this.tblDataRepository.count(where);
  }

  @get('/tbl-data')
  @response(200, {
    description: 'Array of TblData model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TblData, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TblData) filter?: Filter<TblData>,
  ): Promise<TblData[]> {
    return this.tblDataRepository.find(filter);
  }

  @patch('/tbl-data')
  @response(200, {
    description: 'TblData PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TblData, {partial: true}),
        },
      },
    })
    tblData: TblData,
    @param.where(TblData) where?: Where<TblData>,
  ): Promise<Count> {
    return this.tblDataRepository.updateAll(tblData, where);
  }

  @get('/tbl-data/{id}')
  @response(200, {
    description: 'TblData model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TblData, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TblData, {exclude: 'where'}) filter?: FilterExcludingWhere<TblData>
  ): Promise<TblData> {
    return this.tblDataRepository.findById(id, filter);
  }

  @patch('/tbl-data/{id}')
  @response(204, {
    description: 'TblData PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TblData, {partial: true}),
        },
      },
    })
    tblData: TblData,
  ): Promise<void> {
    await this.tblDataRepository.updateById(id, tblData);
  }

  @put('/tbl-data/{id}')
  @response(204, {
    description: 'TblData PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tblData: TblData,
  ): Promise<void> {
    await this.tblDataRepository.replaceById(id, tblData);
  }

  @del('/tbl-data/{id}')
  @response(204, {
    description: 'TblData DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tblDataRepository.deleteById(id);
  }
}
