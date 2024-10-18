cube(`account_emailaddress`, {
  sql_table: `public.account_emailaddress`,
  
  data_source: `default`,
  
  joins: {
    
  },
  
  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primary_key: true
    },
    
    verified: {
      sql: `verified`,
      type: `boolean`
    },
    
    primary: {
      sql: `primary`,
      type: `boolean`
    },
    
    user_id: {
      sql: `user_id`,
      type: `string`
    },
    
    email: {
      sql: `email`,
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
