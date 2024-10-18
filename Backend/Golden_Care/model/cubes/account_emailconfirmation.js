cube(`account_emailconfirmation`, {
  sql_table: `public.account_emailconfirmation`,
  
  data_source: `default`,
  
  joins: {
    
  },
  
  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primary_key: true
    },
    
    key: {
      sql: `key`,
      type: `string`
    },
    
    created: {
      sql: `created`,
      type: `time`
    },
    
    sent: {
      sql: `sent`,
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
