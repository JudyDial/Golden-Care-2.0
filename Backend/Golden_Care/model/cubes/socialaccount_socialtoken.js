cube(`socialaccount_socialtoken`, {
  sql_table: `public.socialaccount_socialtoken`,
  
  data_source: `default`,
  
  joins: {
    
  },
  
  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primary_key: true
    },
    
    token_secret: {
      sql: `token_secret`,
      type: `string`
    },
    
    token: {
      sql: `token`,
      type: `string`
    },
    
    expires_at: {
      sql: `expires_at`,
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
