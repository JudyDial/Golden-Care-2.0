cube(`user_manager_patient`, {
  sql_table: `public."userManager_patient"`,
  
  data_source: `default`,
  
  joins: {
    
  },
  
  dimensions: {
    smoking_history: {
      sql: `smoking_history`,
      type: `boolean`
    },
    
    location: {
      sql: `location`,
      type: `string`
    },
    
    customuser_ptr_id: {
      sql: `customuser_ptr_id`,
      type: `string`
    },
    
    gender: {
      sql: `gender`,
      type: `string`
    },
    
    hypertension: {
      sql: `hypertension`,
      type: `boolean`
    },
    
    heart_disease: {
      sql: `heart_disease`,
      type: `boolean`
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
