cube(`django_session`, {
  sql_table: `public.django_session`,
  
  data_source: `default`,
  
  joins: {
    
  },
  
  dimensions: {
    session_data: {
      sql: `session_data`,
      type: `string`
    },
    
    session_key: {
      sql: `session_key`,
      type: `string`
    },
    
    expire_date: {
      sql: `expire_date`,
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
