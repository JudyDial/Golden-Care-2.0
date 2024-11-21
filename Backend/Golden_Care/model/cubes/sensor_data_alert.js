cube(`sensor_data_alert`, {
  sql_table: `public.sensor_data_alert`,
  
  data_source: `default`,
  
  joins: {
    
  },
  
  dimensions: {
    patient_id: {
      sql: `patient_id`,
      type: `string`
    },
    
    description: {
      sql: `description`,
      type: `string`
    },
    
    alert_id: {
      sql: `alert_id`,
      type: `string`
    },
    
    is_active: {
      sql: `is_active`,
      type: `boolean`
    },
    
    alert_type: {
      sql: `alert_type`,
      type: `string`
    },
    
    created_at: {
      sql: `created_at`,
      type: `time`
    },
    
    resolved_at: {
      sql: `resolved_at`,
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
