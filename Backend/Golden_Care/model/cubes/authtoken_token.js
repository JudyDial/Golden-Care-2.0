cube(`authtoken_token`, {
  sql_table: `public.authtoken_token`,
  
  data_source: `default`,
  
  joins: {
    
  },
  
  dimensions: {
    user_id: {
      sql: `user_id`,
      type: `string`
    },
    
    key: {
      sql: `key`,
      type: `string`
    },
    
    created: {
      sql: `created`,
      type: `time`
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
