cube(`user_manager_emergencycontact`, {
  sql_table: `public."userManager_emergencycontact"`,
  
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
      sql: `${CUBE}."Patient_id"`,
      type: `string`
    },
    
    phone_number: {
      sql: `phone_number`,
      type: `string`
    },
    
    relationship: {
      sql: `relationship`,
      type: `string`
    },
    
    name: {
      sql: `name`,
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
