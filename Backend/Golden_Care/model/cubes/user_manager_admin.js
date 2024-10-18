cube(`user_manager_admin`, {
  sql_table: `public."userManager_admin"`,
  
  data_source: `default`,
  
  joins: {
    
  },
  
  dimensions: {
    customuser_ptr_id: {
      sql: `customuser_ptr_id`,
      type: `string`
    },
    
    admin_code: {
      sql: `admin_code`,
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
