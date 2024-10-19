cube(`sensor_data_appointment`, {
  sql_table: `public.sensor_data_appointment`,
  
  data_source: `default`,
  
  joins: {
    
  },
  
  dimensions: {
    reason_for_appointment: {
      sql: `reason_for_appointment`,
      type: `string`
    },
    
    provider_id: {
      sql: `provider_id`,
      type: `string`
    },
    
    patient_id: {
      sql: `patient_id`,
      type: `string`
    },
    
    appointment_id: {
      sql: `appointment_id`,
      type: `string`
    },
    
    status: {
      sql: `status`,
      type: `string`
    },
    
    created_at: {
      sql: `created_at`,
      type: `time`
    },
    
    updated_at: {
      sql: `updated_at`,
      type: `time`
    },
    
    appointment_date: {
      sql: `appointment_date`,
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
