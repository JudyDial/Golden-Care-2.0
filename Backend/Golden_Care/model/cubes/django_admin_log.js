cube(`django_admin_log`, {
  sql_table: `public.django_admin_log`,
  
  data_source: `default`,
  
  joins: {
    django_content_type: {
      sql: `${CUBE}.content_type_id = ${django_content_type}.id`,
      relationship: `many_to_one`
    }
  },
  
  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primary_key: true
    },
    
    change_message: {
      sql: `change_message`,
      type: `string`
    },
    
    user_id: {
      sql: `user_id`,
      type: `string`
    },
    
    object_id: {
      sql: `object_id`,
      type: `string`
    },
    
    object_repr: {
      sql: `object_repr`,
      type: `string`
    },
    
    action_time: {
      sql: `action_time`,
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
