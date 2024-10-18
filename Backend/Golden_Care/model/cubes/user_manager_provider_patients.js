cube(`user_manager_provider_patients`, {
  sql_table: `public."userManager_provider_patients"`,
  
  data_source: `default`,
  
  joins: {
    
  },
  
  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primary_key: true
    },
    
    patient_id: {
      sql: `patient_id`,
      type: `string`
    },
    
    provider_id: {
      sql: `provider_id`,
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
