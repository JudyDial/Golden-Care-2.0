cube(`socialaccount_socialapp`, {
  sql_table: `public.socialaccount_socialapp`,
  
  data_source: `default`,
  
  joins: {
    
  },
  
  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primary_key: true
    },
    
    secret: {
      sql: `secret`,
      type: `string`
    },
    
    provider: {
      sql: `provider`,
      type: `string`
    },
    
    provider_id: {
      sql: `provider_id`,
      type: `string`
    },
    
    name: {
      sql: `name`,
      type: `string`
    },
    
    client_id: {
      sql: `client_id`,
      type: `string`
    },
    
    key: {
      sql: `key`,
      type: `string`
    },
    
    settings: {
      sql: `settings`,
      type: `string`
    }
  },
  
  measures: {
    count: {
      type: `count`
    }
  },
  
  pre_aggregations: {
    // Pre-aggregation definitions go here.
    // Learn more in the documentation: https://cube.dev/docs/caching/pre-aggregations/getting-started
  }
});
