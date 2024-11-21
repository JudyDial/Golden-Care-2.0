cube(`user_manager_provider`, {
  sql_table: `public."userManager_provider"`,
  
  data_source: `default`,
  
  joins: {
    
  },
  
  dimensions: {
    status: {
      sql: `status`,
      type: `string`
    },
    
    verified: {
      sql: `verified`,
      type: `boolean`
    },
    
    location: {
      sql: `location`,
      type: `string`
    },
    
    provider_name: {
      sql: `${CUBE}."Provider_name"`,
      type: `string`
    },
    
    customuser_ptr_id: {
      sql: `customuser_ptr_id`,
      type: `string`
    },
    
    address: {
      sql: `address`,
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
