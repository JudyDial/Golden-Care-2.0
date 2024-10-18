cube(`socialaccount_socialaccount`, {
  sql_table: `public.socialaccount_socialaccount`,
  
  data_source: `default`,
  
  joins: {
    
  },
  
  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primary_key: true
    },
    
    provider: {
      sql: `provider`,
      type: `string`
    },
    
    uid: {
      sql: `uid`,
      type: `string`
    },
    
    user_id: {
      sql: `user_id`,
      type: `string`
    },
    
    extra_data: {
      sql: `extra_data`,
      type: `string`
    },
    
    date_joined: {
      sql: `date_joined`,
      type: `time`
    },
    
    last_login: {
      sql: `last_login`,
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
