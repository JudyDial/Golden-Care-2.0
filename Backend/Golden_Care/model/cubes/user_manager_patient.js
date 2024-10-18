cube(`user_manager_patient`, {
  sql_table: `public."userManager_patient"`,
  
  data_source: `default`,
  
  joins: {
    
  },
  
  dimensions: {
    customuser_ptr_id: {
      sql: `customuser_ptr_id`,
      type: `string`
    },
    
    gender: {
      sql: `gender`,
      type: `string`
    },
    
    vitals: {
      sql: `vitals`,
      type: `string`
    },
    
    location: {
      sql: `location`,
      type: `string`
    },
    
    last_vitals_update: {
      sql: `last_vitals_update`,
      type: `time`
    },
    
    date_of_birth: {
      sql: `date_of_birth`,
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
