cube(`user_manager_provider`, {
  sql_table: `public."userManager_provider"`,
  
  data_source: `default`,
  
  joins: {
    
  },
  
  dimensions: {
    verified: {
      sql: `verified`,
      type: `boolean`
    },
    
    status: {
      sql: `status`,
      type: `string`
    },
    
    address: {
      sql: `address`,
      type: `string`
    },
    
    customuser_ptr_id: {
      sql: `customuser_ptr_id`,
      type: `string`
    },
    
    provider_name: {
      sql: `${CUBE}."Provider_name"`,
      type: `string`
    },
    
    location: {
      sql: `location`,
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
