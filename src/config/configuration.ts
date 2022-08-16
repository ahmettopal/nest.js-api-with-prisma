export default (): IConfiguration => ({
    mode: (process.env.NODE_ENV as INodeEnvironmentType) || INodeEnvironmentType.Development,
    database: {
      url: process.env.DATABASE_URL || ''
    },
  });
  
  export interface IConfiguration {
    mode: INodeEnvironmentType
    database: {
      url: string
    }
  }
  
  export enum INodeEnvironmentType {
    Development = 'development',
    Production = 'production',
    Test = 'test'
}