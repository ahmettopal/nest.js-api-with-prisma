import configuration from '../config/configuration';

export class Result {
  constructor(init: Partial<Result>) {
    const mode = configuration().mode
    if(mode === 'development' || mode === 'test'){
      Object.assign(this, init)
    }else {
      let {exception, ...obj} = init;
      Object.assign(this, obj)
    }
  }

  data: any
  success: boolean = true
  message: string
  code: string
  exception: Error | any
}